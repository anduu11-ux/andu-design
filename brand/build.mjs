// Builds every logo from the logo sheet (brand/logo) and the print-ready PDFs (brand/print)
// with headless Edge: node brand/build.mjs   (set BROWSER to a chrome.exe path to use Chrome)
//
// Printers want text outlined, and SVG logos can't count on Geist being installed. Edge embeds
// Geist (a variable font) in PDFs as a Type 3 font, whose glyphs are plain vector paths, so we
// print once, read each glyph's shape and position back (kerning included) and redraw the text
// as SVG paths.
import { execFileSync } from 'node:child_process'
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import { basename, dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { inflateSync } from 'node:zlib'

const here = dirname(fileURLToPath(import.meta.url))
const BROWSER = process.env.BROWSER ?? 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'
const FONT = pathToFileURL(join(here, '../node_modules/@fontsource-variable/geist/files/geist-latin-wght-normal.woff2')).href
const tmp = mkdtempSync(join(tmpdir(), 'av-brand-'))
const url = file => pathToFileURL(file).href

let launches = 0
function edge(target, output, ...args) {
  const sleep = ms => Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms)
  // a launch can hang (seen once on the 16 px icon), so each gets a minute and up to three tries
  for (let attempt = 0; attempt < 3; attempt++) {
    rmSync(output, { force: true })
    try {
      // a fresh profile each time, so the job isn't handed to an Edge that's already running
      execFileSync(BROWSER, ['--headless=new', '--disable-gpu', '--no-first-run', '--hide-scrollbars', `--user-data-dir=${join(tmp, `profile-${launches++}`)}`, ...args, target], { stdio: 'ignore', timeout: 60_000 })
    } catch {
      continue
    }
    // msedge.exe can return before the file is written (a child process does the work): wait until its size settles
    for (let i = 0, last = -1; i < 150; i++, sleep(200)) {
      const size = existsSync(output) ? statSync(output).size : -1
      if (size > 0 && size === last) return
      last = size
    }
  }
  throw new Error(`${output} was never written: is BROWSER (${BROWSER}) right?`)
}
const printPdf = (html, pdf) => edge(url(html), pdf, '--no-pdf-header-footer', `--print-to-pdf=${pdf}`)

function screenshot(svg, png, w, h) {
  const page = join(tmp, 'shot.html')
  writeFileSync(page, `<body style="margin:0"><img src="${url(svg)}" style="display:block;width:${w}px;height:${h}px">`)
  edge(url(page), png, `--window-size=${w},${h}`, '--default-background-color=00000000', `--screenshot=${png}`)
  const size = readFileSync(png).subarray(16, 24)
  if (size.readUInt32BE(0) !== w || size.readUInt32BE(4) !== h) console.warn(`warning: ${png} came out ${size.readUInt32BE(0)}×${size.readUInt32BE(4)}, not ${w}×${h}`)
}

// ---- reading text back from Edge's PDF: just what Skia writes (one xref table, Flate streams)

const TOKEN = /\/[^\s/[\]<>()]*|<<|>>|<[\da-fA-F\s]*>|\((?:\\.|[^\\)])*\)|[[\]]|[-+]?(?:\d+\.?\d*|\.\d+)|[^\s/[\]<>()]+/g
const nums = s => s.trim().split(/\s+/).map(Number)
const refs = (dict, key) => Object.fromEntries([...(dict.match(new RegExp(`/${key}\\s*<<([^>]*)>>`))?.[1] ?? '').matchAll(/\/(\S+)\s+(\d+) 0 R/g)].map(m => [m[1], +m[2]]))
const mul = (a, b) => [a[0] * b[0] + a[1] * b[2], a[0] * b[1] + a[1] * b[3], a[2] * b[0] + a[3] * b[2], a[2] * b[1] + a[3] * b[3], a[4] * b[0] + a[5] * b[2] + b[4], a[4] * b[1] + a[5] * b[3] + b[5]]
const round = v => Math.round(v * 1000) / 1000
const hex = (...rgb) => '#' + rgb.map(v => Math.round(v * 255).toString(16).padStart(2, '0')).join('')

function readPdf(file) {
  const buf = readFileSync(file), s = buf.toString('latin1')
  const offsets = [...s.slice(s.lastIndexOf('\nxref')).matchAll(/(\d{10}) \d{5} [nf]/g)].map(m => +m[1])
  const cache = {}
  const get = n => (cache[n] ??= (() => {
    const head = s.indexOf('obj', offsets[n]) + 3, si = s.indexOf('stream', head), ei = s.indexOf('endobj', head)
    if (si < 0 || ei < si) return { dict: s.slice(head, ei) }
    const dict = s.slice(head, si)
    let start = si + 6
    if (s[start] === '\r') start++
    if (s[start] === '\n') start++
    const raw = buf.subarray(start, start + +dict.match(/\/Length (\d+)/)[1])
    return { dict, data: (/FlateDecode/.test(dict) ? inflateSync(raw) : raw).toString('latin1') }
  })())
  const pages = []
  const walk = n => {
    const d = get(n).dict
    if (!/\/Type\s*\/Pages\b/.test(d)) return pages.push(n)
    for (const kid of d.match(/\/Kids\s*\[([^\]]*)\]/)[1].matchAll(/(\d+) 0 R/g)) walk(+kid[1])
  }
  walk(+get(+s.match(/\/Root (\d+) 0 R/)[1]).dict.match(/\/Pages (\d+) 0 R/)[1])
  return { get, pages }
}

// a Type 3 glyph procedure: d0/d1, then path operators and a fill
function glyphPath(data) {
  const cmds = []
  let st = [], cur = [0, 0], rule = 'nonzero'
  for (const t of data.match(TOKEN) ?? []) {
    if (!/^[A-Za-z'"]/.test(t)) { st.push(+t); continue }
    const a = st
    if (t === 'm' || t === 'l') cmds.push([t === 'm' ? 'M' : 'L', ...(cur = a.slice(-2))])
    else if (t === 'c') cmds.push(['C', ...a.slice(-6)]), (cur = a.slice(-2))
    else if (t === 'v') cmds.push(['C', ...cur, ...a.slice(-4)]), (cur = a.slice(-2))
    else if (t === 'y') cmds.push(['C', ...a.slice(-4), ...a.slice(-2)]), (cur = a.slice(-2))
    else if (t === 'h') cmds.push(['Z'])
    else if (t === 're') { const [x, y, w, h] = a.slice(-4); cmds.push(['M', x, y], ['L', x + w, y], ['L', x + w, y + h], ['L', x, y + h], ['Z']) }
    else if (t === 'f*' || t === 'B*') rule = 'evenodd'
    st = []
  }
  return { cmds, rule }
}

function type3(pdf, n) {
  const d = pdf.get(n).dict
  if (!/\/Subtype\s*\/Type3/.test(d)) throw new Error('found a font that is not Type 3: did Geist fail to load?')
  const names = []
  let code = 0
  for (const t of d.match(/\/Differences\s*\[([^\]]*)\]/)[1].match(/\d+|\/[^\s/\]]+/g)) t[0] === '/' ? (names[code++] = t.slice(1)) : (code = +t)
  const procs = refs(d, 'CharProcs'), glyphs = {}
  return {
    matrix: nums(d.match(/\/FontMatrix\s*\[([^\]]*)\]/)[1]),
    first: +d.match(/\/FirstChar (\d+)/)[1],
    widths: nums(d.match(/\/Widths\s*\[([^\]]*)\]/)[1]),
    glyph: c => (glyphs[c] ??= procs[names[c]] ? glyphPath(pdf.get(procs[names[c]]).data) : { cmds: [], rule: 'nonzero' }),
  }
}

function literal(str) {
  const body = str.slice(1, -1).replace(/\\([nrtbf()\\]|[0-7]{1,3})/g, (_, e) => ({ n: '\n', r: '\r', t: '\t', b: '\b', f: '\f' })[e] ?? (/\d/.test(e) ? String.fromCharCode(parseInt(e, 8)) : e))
  return [...body].map(ch => ch.charCodeAt(0))
}

// every glyph on a page as filled SVG paths, in PDF points with y pointing down
function pageText(pdf, n) {
  const d = pdf.get(n).dict
  const [, , w, h] = nums(d.match(/\/MediaBox\s*\[([^\]]*)\]/)[1])
  const fonts = Object.fromEntries(Object.entries(refs(d, 'Font')).map(([k, v]) => [k, type3(pdf, v)]))
  const alphas = Object.fromEntries(Object.entries(refs(d, 'ExtGState')).map(([k, v]) => [k, +(pdf.get(v).dict.match(/\/ca\s+([\d.]+)/)?.[1] ?? 1)]))
  const content = [...d.match(/\/Contents\s*(\[[^\]]*\]|\d+ 0 R)/)[1].matchAll(/(\d+) 0 R/g)].map(m => pdf.get(+m[1]).data).join('\n')

  const runs = [], stack = []
  let gs = { ctm: [1, 0, 0, 1, 0, 0], fill: '#000000', alpha: 1 }
  let tm = [1, 0, 0, 1, 0, 0], tlm = tm, font, size = 0, tc = 0, tw = 0, th = 1, rise = 0, lead = 0, origin
  const move = (tx, ty) => (tm = tlm = mul([1, 0, 0, 1, tx, ty], tlm))
  const show = str => {
    const codes = str[0] === '<' ? (str.slice(1, -1).replace(/\s/g, '').match(/../g) ?? []).map(x => parseInt(x, 16)) : literal(str)
    for (const code of codes) {
      const m = mul(font.matrix, mul([size * th, 0, 0, size, 0, rise], mul(tm, gs.ctm)))
      const pt = (x, y) => `${round(x * m[0] + y * m[2] + m[4])} ${round(h - (x * m[1] + y * m[3] + m[5]))}`
      origin ??= { x: round(m[4]), y: round(h - m[5]) }
      const g = font.glyph(code)
      const path = g.cmds.map(([c, ...a]) => c + a.flatMap((v, i) => (i % 2 ? [] : [pt(v, a[i + 1])])).join(' ')).join('')
      const last = runs.at(-1)
      if (path && last?.fill === gs.fill && last.alpha === gs.alpha && last.rule === g.rule) last.d += path
      else if (path) runs.push({ fill: gs.fill, alpha: gs.alpha, rule: g.rule, d: path })
      tm = mul([1, 0, 0, 1, ((font.widths[code - font.first] ?? 0) * font.matrix[0] * size + tc + (code === 32 ? tw : 0)) * th, 0], tm)
    }
  }

  let st = []
  for (const t of content.match(TOKEN) ?? []) {
    if (!/^[A-Za-z'"]/.test(t)) { st.push(t); continue }
    const a = st, num = i => +a[a.length + i]
    switch (t) {
      case 'q': stack.push(gs); gs = { ...gs }; break
      case 'Q': gs = stack.pop(); break
      case 'cm': gs.ctm = mul(a.slice(-6).map(Number), gs.ctm); break
      case 'rg': gs.fill = hex(num(-3), num(-2), num(-1)); break
      case 'g': gs.fill = hex(num(-1), num(-1), num(-1)); break
      case 'k': gs.fill = hex(...[-4, -3, -2].map(i => (1 - num(i)) * (1 - num(-1)))); break
      case 'gs': gs.alpha = alphas[a.at(-1).slice(1)] ?? 1; break
      case 'BT': tm = tlm = [1, 0, 0, 1, 0, 0]; break
      case 'Tf': font = fonts[a.at(-2).slice(1)]; size = num(-1); break
      case 'Tm': tm = tlm = a.slice(-6).map(Number); break
      case 'Td': move(num(-2), num(-1)); break
      case 'TD': lead = -num(-1); move(num(-2), num(-1)); break
      case 'T*': move(0, -lead); break
      case 'TL': lead = num(-1); break
      case 'Tc': tc = num(-1); break
      case 'Tw': tw = num(-1); break
      case 'Tz': th = num(-1) / 100; break
      case 'Ts': rise = num(-1); break
      case 'Tj': show(a.at(-1)); break
      case "'": move(0, -lead); show(a.at(-1)); break
      case '"': tw = num(-3); tc = num(-2); move(0, -lead); show(a.at(-1)); break
      case 'TJ':
        for (const x of a.slice(a.lastIndexOf('[') + 1, a.lastIndexOf(']'))) {
          if (x[0] === '<' || x[0] === '(') show(x)
          else tm = mul([1, 0, 0, 1, (-x / 1000) * size * th, 0], tm)
        }
        break
    }
    st = []
  }
  return { w, h, runs, origin }
}

const pathOf = r => `<path fill="${r.fill}"${r.alpha < 1 ? ` fill-opacity="${r.alpha}"` : ''}${r.rule === 'evenodd' ? ' fill-rule="evenodd"' : ''} d="${r.d}"/>`

// print a page, read its text back, then print it again with the text drawn as paths
function outlinedPdf(src, pdf) {
  const first = join(tmp, 'first.pdf')
  printPdf(src, first)
  const doc = readPdf(first)
  const overlays = doc.pages.map(n => {
    const { w, h, runs } = pageText(doc, n)
    return `<svg viewBox="0 0 ${w} ${h}" style="position:absolute;inset:0;width:100%;height:100%;z-index:9">${runs.map(pathOf).join('')}</svg>`
  })
  const second = join(tmp, `outlined-${basename(src)}`)
  writeFileSync(second, readFileSync(src, 'utf8')
    .replace('<head>', `<head><base href="${url(dirname(src))}/">`)
    .replace('</body>', `<style>.t{visibility:hidden}</style><script>const o=${JSON.stringify(overlays)};document.querySelectorAll('.page').forEach((p,i)=>p.insertAdjacentHTML('beforeend',o[i]))</script></body>`))
  printPdf(second, pdf)
  const s = readFileSync(pdf, 'latin1')
  if (/\/Type\s*\/Font\b/.test(s)) throw new Error(`${pdf} still has live text: give every text element class="t"`)
  if (/\/Subtype\s*\/Image/.test(s)) console.warn(`warning: ${pdf} contains a bitmap`)
  console.log(`${pdf}: ${doc.pages.length} page(s), text outlined`)
}

// ---- the logos, as on the logo sheet

// the andu mark: the A as a summit ringed by contour lines, in a 48 box
const MARK = main => `<defs><linearGradient id="adg" x1="12" y1="0" x2="36" y2="0" gradientUnits="userSpaceOnUse"><stop offset="0" stop-color="#7C3AED"/><stop offset="1" stop-color="#22D3EE"/></linearGradient></defs><path d="M15.4 41L24 19.5L32.6 41M20.8 41L24 33L27.2 41" stroke="url(#adg)" stroke-width="2"/><path d="M10 41L24 6L38 41" stroke="${main}" stroke-width="3"/>`
const svgFile = (name, viewBox, body) => {
  const file = join(here, 'logo', `${name}.svg`)
  writeFileSync(file, `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="none" stroke-linecap="round" stroke-linejoin="round">${body}</svg>\n`)
  return file
}
const png = (svg, name, w, h = w) => screenshot(svg, join(here, 'logo', `${name}.png`), w, h)

mkdirSync(join(here, 'logo'), { recursive: true })
mkdirSync(join(here, 'print'), { recursive: true })

// the wordmark, always lowercase: Geist 600 at -0.02em, "design" 0.28em after "andu"
const word = join(tmp, 'word.html')
writeFileSync(word, `<!doctype html><html><head><meta charset="utf-8"><style>@font-face{font-family:Geist;src:url("${FONT}") format("woff2");font-weight:100 900}@page{size:1200px 300px;margin:0}body{margin:0}div{position:absolute;left:100px;top:100px;font:600 100px/1 Geist;letter-spacing:-.02em;white-space:nowrap}</style></head><body><div><span style="color:#f4f7fc">andu</span><span style="color:#8a8d93;margin-left:.28em">design</span></div></body></html>`)
printPdf(word, join(tmp, 'word.pdf'))
const wordDoc = readPdf(join(tmp, 'word.pdf'))
const text = pageText(wordDoc, wordDoc.pages[0])

// lockup geometry in the PDF's points. The mark's lines span x 8.5–39.5 and y 4.5–42.5 of its 48 box, so the lockup
// crops it to 8 4 32 40 and sets it 1.1× the type size tall, 0.3× away, centred on the lowercase letters (x-height 0.53 em)
const size = 75, k = (1.1 * size) / 40, dx = 32 * k + 0.3 * size - text.origin.x
const markTop = text.origin.y - 0.265 * size - 19.5 * k
const points = text.runs.flatMap(r => r.d.match(/-?[\d.]+/g).map(Number))
const xs = points.filter((_, i) => i % 2 === 0), ys = points.filter((_, i) => i % 2)
const box = [0.5 * k, Math.min(markTop + 0.5 * k, ...ys), Math.max(...xs) + dx, Math.max(markTop + 38.5 * k, ...ys)]
const lockupBox = [box[0], box[1], box[2] - box[0], box[3] - box[1]].map(round)
const recolor = map => text.runs.map(r => pathOf({ ...r, fill: map[r.fill] ?? r.fill })).join('')
const lockup = (name, main, colors) =>
  svgFile(name, lockupBox.join(' '), `<g transform="translate(0 ${round(markTop)}) scale(${round(k)}) translate(-8 -4)">${MARK(main)}</g><g transform="translate(${round(dx)} 0)">${recolor(colors)}</g>`)

const lockupPng = (svg, name) => png(svg, name, 2400, Math.round((2400 * lockupBox[3]) / lockupBox[2]))
lockupPng(lockup('andu-lockup-on-dark', '#F4F7FC', {}), 'andu-lockup-on-dark')
lockupPng(lockup('andu-lockup-on-light', '#080B12', { '#f4f7fc': '#080b12', '#8a8d93': '#666970' }), 'andu-lockup-on-light')
png(svgFile('andu-mark-on-dark', '0 0 48 48', MARK('#F4F7FC')), 'andu-mark-on-dark', 1024)
png(svgFile('andu-mark-on-light', '0 0 48 48', MARK('#080B12')), 'andu-mark-on-light', 1024)
const icon = svgFile('andu-icon', '0 0 48 48', `<rect width="48" height="48" rx="10" fill="#080B12"/>${MARK('#F4F7FC')}`)
for (const s of [512, 96, 48, 32, 16]) png(icon, `andu-icon-${s}`, s)
// profile picture (Instagram and other round avatars crop to a circle): centred at y 26.3, the peak and both feet sit
// the same distance from the middle, and at 0.7 that's 64% of the circle's radius
const avatar = svgFile('andu-profile-picture', '0 0 48 48', `<rect width="48" height="48" fill="#080B12"/><g transform="translate(24 24) scale(0.7) translate(-24 -26.3)">${MARK('#F4F7FC')}</g>`)
png(avatar, 'andu-profile-picture', 1080)
console.log('brand/logo: lockups, marks and icon written')

outlinedPdf(join(here, 'src', 'business-card.html'), join(here, 'print', 'business-card.pdf'))
outlinedPdf(join(here, 'src', 'poster-a2.html'), join(here, 'print', 'poster-a2.pdf'))
// KEEP=1 keeps the outlined pages Edge printed from, to check them in a browser
if (process.env.KEEP) console.log(`kept ${tmp}`)
else try { rmSync(tmp, { recursive: true, force: true }) } catch {} // an Edge still shutting down can hold its profile; the OS clears temp
