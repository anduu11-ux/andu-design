# Promo voiceover

The script for the promo video (`brand/video/andu-promo-*.mp4`, made from `promo.html`). Each line starts at its time, while its scene is on screen, and the big words on screen land as they're said.

It's a fast cut, so read it quick and punchy: about three words a second, energy up, no long pauses (the cuts do the breathing). Stay warm, land the jokes dry ("Or this.", "Bye-bye, weekends."), and leave a real beat after "Proof," (about a third of a second). "andu" is said AHN-doo.

| Time (s) | On screen | Say |
|---:|---|---|
| 0.2 | Before they call you, they google you. | Before they call you, they google you. Every time. |
| 2.3 | A search for "your business" | And what comes up? |
| 3.1 | The search opens on one of our sites | Hopefully, something like this. |
| 4.6 | The camera swings to a second site | Or this. |
| 5.7 | A wall of our sites: Proof, not promises., then a slash of light cuts it in two | Proof, *(beat)* not promises. |
| 8.1 | In their language., cycling through seven languages | In their language. |
| 9.0 | A white screen: Clear., its letters stretching | Clear. |
| 10.4 | Made to bring in clients., popping in, and two notifications | Your phone? Buzzing. |
| 11.4 | Doing it yourself? whips in, with a to-do list | You could do it yourself… |
| 12.6 | "Weekends gone" climbs, then the list falls over | Bye-bye, weekends. |
| 13.5 | Or send us one message. | Or just send us one message. |
| 15.2 | A message is typed, sent and answered | That's it. Design, build, launch: that's on us. |
| 18.9 | The mark draws itself, then andu design and Let's build your website. | andu design. Let's build yours. |
| 21.0 | The contact details | We're one message away. |

## Ready-made voice

`brand/video/andu-promo-voice-female.m4a` is this script read by Kokoro, an open-source voice model (Apache 2.0, so fine for ads), with the voice `af_heart`. Each line is placed so its key word lands on its beat, the beat after "Proof," is cut in as 0.3 s of silence, and the track is mastered to about −15 LUFS with peaks under −1 dB, so TikTok and Instagram play it at full loudness without squashing it.

To put it on the video, drop both into CapCut, or:

```sh
ffmpeg -i brand/video/andu-promo-9x16.mp4 -i brand/video/andu-promo-voice-female.m4a -map 0:v -map 1:a -c copy -shortest andu-promo-9x16-voice.mp4
```

Music goes under the voice at about 10–20% volume, added in the app so it's licensed.
