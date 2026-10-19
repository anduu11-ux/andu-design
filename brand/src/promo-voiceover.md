# Promo voiceover

The script for the promo video (`brand/video/andu-promo-*.mp4`, made from `promo.html`). Each line starts at its time, while its scene is on screen, and the big words on screen land as they're said.

It's a fast cut, so read it quick and punchy: about three words a second, energy up, no long pauses (the cuts do the breathing). Stay warm, and land the jokes dry ("Or this.", "Bye-bye, weekends."). "andu" is said AHN-doo.

| Time (s) | On screen | Say |
|---:|---|---|
| 0.2 | Before they call you, they google you. | Before they call you, they google you. Every time. |
| 2.3 | A search being typed | And what comes up? |
| 3.6 | One of our sites tilts into view | Hopefully, something like this. |
| 5.2 | A second site swipes in | Or this. |
| 6.2 | A wall of our sites: Proof, not promises. | Proof, not promises. |
| 7.5 | In their language., cycling through seven languages | In their language. |
| 8.5 | Clear. | Clear. |
| 9.8 | Made to bring in clients., and two notifications | Your phone? Buzzing. |
| 10.8 | Doing it yourself? and a to-do list | You could do it yourself… |
| 12.0 | "Weekends gone" climbs, then the list falls over | Bye-bye, weekends. |
| 12.9 | Or send us one message. | Or just send us one message. |
| 14.6 | A message is typed, sent and answered | That's it. Design, build, launch: that's on us. |
| 18.3 | The mark draws itself, then andu design and Let's build your website. | andu design. Let's build yours. |
| 20.4 | The contact details | We're one message away. |

## Ready-made voice

`brand/video/andu-promo-voice-female.m4a` is this script read by Kokoro, an open-source voice model (Apache 2.0, so fine for ads), with the voice `af_heart`. Each line is placed so its key word lands on its beat, and the track is mastered to −14 LUFS, the loudness TikTok and Instagram play at.

To put it on the video, drop both into CapCut, or:

```sh
ffmpeg -i brand/video/andu-promo-9x16.mp4 -i brand/video/andu-promo-voice-female.m4a -map 0:v -map 1:a -c copy -shortest andu-promo-9x16-voice.mp4
```

Music goes under the voice at about 10–20% volume, added in the app so it's licensed.
