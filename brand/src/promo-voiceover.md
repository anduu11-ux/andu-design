# Promo voiceover

The script for the promo video (`brand/video/andu-promo-*.mp4`, made from `promo.html`). Each line starts at its time, while its scene is on screen, and the big words on screen land as they're said.

Say it like you're talking to one business owner across a table: relaxed and warm, a little dry on the jokes ("Literally.", "Hope you didn't need your weekends."). Leave a beat of silence after "Or this." and around "Proof, not promises." About two and a half words a second. "andu" is said AHN-doo.

| Time (s) | On screen | Say |
|---:|---|---|
| 0.2 | Before they call you, they google you. | Before they call you, they google you. Every time. |
| 3.3 | A search being typed | And what comes up? |
| 5.0 | One of our sites tilts into view | Hopefully, something like this. |
| 7.8 | A second site swipes in | Or this. |
| 9.4 | A wall of our sites: Proof, not promises. | Proof, not promises. |
| 10.8 | In their language., cycling through seven languages | In your clients' language. Literally. |
| 12.6 | Clear. | Clear. No guessing. |
| 13.9 | Made to bring in clients., and two notifications | Built to make your phone buzz. |
| 15.4 | Doing it yourself? and a to-do list | You could do it yourself… |
| 17.1 | "Weekends gone" climbs, then the list falls over | Hope you didn't need your weekends. |
| 18.6 | Or send us one message. | Or just send us one message. |
| 21.0 | A message is typed, sent and answered | That's it. Design, build, launch: that's on us. |
| 26.8 | The mark draws itself, then andu design and Let's build your website. | andu design. Let's build yours. |
| 29.5 | The contact details | We're one message away. |

## Ready-made voices

`brand/video/andu-promo-voice-female.m4a` and `andu-promo-voice-male.m4a` are this script read by Kokoro, an open-source voice model (Apache 2.0, so fine for ads), with the voices `af_heart` and `am_michael`. Each line is placed so its key word lands on its beat, and the track is mastered to −14 LUFS, the loudness TikTok and Instagram play at.

To put one on the video, drop both into CapCut, or:

```sh
ffmpeg -i brand/video/andu-promo-9x16.mp4 -i brand/video/andu-promo-voice-female.m4a -map 0:v -map 1:a -c copy -shortest andu-promo-9x16-voice.mp4
```

Music goes under the voice at about 10–20% volume, added in the app so it's licensed.
