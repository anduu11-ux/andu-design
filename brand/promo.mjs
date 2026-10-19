// Renders the promo video from brand/src/promo.html with headless Edge and ffmpeg: node brand/promo.mjs [9x16] [16x9]
// (set BROWSER to a chrome.exe path to use Chrome, and FFMPEG if ffmpeg isn't on PATH).
//
// The page draws every frame itself from a time (promo.seek), so we step through the timeline, screenshot each frame
// and pipe it into ffmpeg: the video is frame-exact however slow the machine is, and nothing plays in real time.
import { execFileSync, spawn } from 'node:child_process'
import { mkdirSync, mkdtempSync, rmSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const BROWSER = process.env.BROWSER ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const FFMPEG = process.env.FFMPEG ?? 'ffmpeg'
const FPS = 30
// 9x16 is for TikTok, Reels and Shorts; 16x9 is for playing full screen on a laptop (or YouTube)
const SIZES = { '9x16': [1080, 1920], '16x9': [1920, 1080] }
const formats = process.argv.length > 2 ? process.argv.slice(2) : Object.keys(SIZES)

// The client screenshots with people's details painted out: staff names and emails, phone numbers, the office address.
// The clients' branding stays. Boxes are [x, y, w, h] in the 1280 × 800 screenshot, and delogo fills each one from the
// pixels around it. The site itself keeps the originals.
const REDACT = {
  'mcf-team': ['mc-fiduciaire/team.webp', [126, 552, 250, 60], [515, 552, 250, 60], [904, 552, 250, 60]],
  'mcf-contact': ['mc-fiduciaire/contact.webp', [74, 372, 220, 244]],
  'egma-home': ['egma-construction/home.webp', [94, 689, 146, 26]],
}
function redact() {
  const out = join(here, 'src', 'promo-shots')
  mkdirSync(out, { recursive: true })
  for (const [name, [shot, ...boxes]] of Object.entries(REDACT)) {
    const filter = boxes.map(([x, y, w, h]) => `delogo=x=${x}:y=${y}:w=${w}:h=${h}`).join(',')
    execFileSync(FFMPEG, ['-y', '-loglevel', 'error', '-i', join(here, '..', 'src', 'assets', shot), '-vf', filter, '-c:v', 'libwebp', '-quality', '92', join(out, `${name}.webp`)])
  }
}

// the DevTools protocol over a pipe (we write to the browser's fd 3, it answers on fd 4): no port, no dependencies
function launch() {
  const profile = mkdtempSync(join(tmpdir(), 'av-promo-'))
  const args = ['--headless=new', '--remote-debugging-pipe', '--no-first-run', '--hide-scrollbars', '--mute-audio', '--enable-unsafe-swiftshader', `--user-data-dir=${profile}`]
  // Chrome won't start as root (a Linux container) with its sandbox on
  if (process.getuid?.() === 0) args.push('--no-sandbox')
  const proc = spawn(BROWSER, [...args, 'about:blank'], { stdio: ['ignore', 'ignore', 'ignore', 'pipe', 'pipe'] })
  const pending = new Map()
  const listeners = new Set()
  const receive = msg => {
    const call = pending.get(msg.id)
    if (!call) return listeners.forEach(listen => listen(msg))
    pending.delete(msg.id)
    if (msg.error) call.reject(new Error(`${call.method}: ${msg.error.message}`))
    else call.resolve(msg.result)
  }
  // messages end in a NUL; a screenshot arrives in many chunks, so only each new chunk is searched
  let next = 1, parts = []
  proc.stdio[4].setEncoding('utf8')
  proc.stdio[4].on('data', chunk => {
    let start = 0
    for (let end; (end = chunk.indexOf('\0', start)) >= 0; start = end + 1) {
      parts.push(chunk.slice(start, end))
      receive(JSON.parse(parts.join('')))
      parts = []
    }
    parts.push(chunk.slice(start))
  })
  const exited = new Promise(resolve => proc.on('exit', resolve))
  exited.then(() => pending.forEach(call => call.reject(new Error('the browser quit'))))
  const send = (method, params = {}, sessionId) =>
    new Promise((resolve, reject) => {
      const id = next++
      pending.set(id, { method, resolve, reject })
      proc.stdio[3].write(JSON.stringify({ id, method, params, sessionId }) + '\0')
    })
  const close = async () => {
    proc.kill()
    await exited
    try { rmSync(profile, { recursive: true, force: true }) } catch {} // an Edge still shutting down can hold its profile; the OS clears temp
  }
  return { send, listeners, close }
}

async function render(browser, format) {
  const [width, height] = SIZES[format]
  if (!width) throw new Error(`unknown format ${format}: use ${Object.keys(SIZES).join(' or ')}`)
  const { targetId } = await browser.send('Target.createTarget', { url: 'about:blank' })
  const { sessionId } = await browser.send('Target.attachToTarget', { targetId, flatten: true })
  const page = (method, params) => browser.send(method, params, sessionId)
  const evaluate = async expression => {
    const { result, exceptionDetails } = await page('Runtime.evaluate', { expression, awaitPromise: true, returnByValue: true })
    if (exceptionDetails) throw new Error(`${expression}: ${exceptionDetails.exception?.description ?? exceptionDetails.text}`)
    return result.value
  }

  await page('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: false })
  const loaded = new Promise(resolve => {
    const onLoad = msg => msg.sessionId === sessionId && msg.method === 'Page.loadEventFired' && (browser.listeners.delete(onLoad), resolve())
    browser.listeners.add(onLoad)
  })
  await page('Page.enable')
  await page('Page.navigate', { url: `${pathToFileURL(join(here, 'src', 'promo.html')).href}?render&format=${format}` })
  await loaded
  // fonts and screenshots decoded, layout measured
  const duration = await evaluate('promo.ready.then(() => promo.duration)')

  const out = join(here, 'video', `andu-promo-${format}.mp4`)
  mkdirSync(dirname(out), { recursive: true })
  // RGB frames become BT.709 4:2:0, tagged as such, so phones and editors show the colours the page had
  const ffmpeg = spawn(FFMPEG, ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'png', '-i', '-', '-vf', 'scale=out_color_matrix=bt709:out_range=tv,format=yuv420p', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-profile:v', 'high', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] })
  const finished = new Promise((resolve, reject) => ffmpeg.on('exit', code => (code === 0 ? resolve() : reject(new Error(`ffmpeg exited with ${code}`)))))
  const write = buf => new Promise(resolve => (ffmpeg.stdin.write(buf) ? resolve() : ffmpeg.stdin.once('drain', resolve)))

  const frames = Math.round(duration * FPS)
  for (let f = 0; f < frames; f++) {
    await evaluate(`promo.seek(${f / FPS})`)
    const { data } = await page('Page.captureScreenshot', { format: 'png', optimizeForSpeed: true })
    await write(Buffer.from(data, 'base64'))
    if (f % FPS === 0) process.stdout.write(`\r${format}: ${f / FPS} of ${duration} s`)
  }
  ffmpeg.stdin.end()
  await finished
  await browser.send('Target.closeTarget', { targetId })
  console.log(`\r${format}: ${frames} frames written to ${out}`)
}

redact()
const browser = launch()
try {
  for (const format of formats) await render(browser, format)
} finally {
  await browser.close()
}
