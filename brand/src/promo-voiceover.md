# Promo voiceover

The script for the promo video (`brand/video/andu-promo-*.mp4`, made from `promo.html`). Each line is said while its words are on screen, the way the type and the voice move together in kinetic-type videos. The time is when the line starts.

Read it calm and warm, not hyped: about two and a half words a second, with a short breath where the lines break. "andu" is said AHN-doo.

| Time (s) | On screen | Say |
|---:|---|---|
| 0.1 | Before they call you, they google you. | Before they call you, they google you. |
| 3.3 | A search for "mc fiduciaire" | So what do they find? |
| 5.0 | MC Fiduciaire's site | An accounting firm with over five hundred clients. |
| 7.8 | EGMA Construction's site | A renovation contractor. |
| 9.4 | Proof, not promises. | Proof, not promises. |
| 11.2 | In their language. | In their own language. |
| 12.4 | Clear. | Clear, nothing to figure out. |
| 14.0 | Made to bring in clients. | Made to bring in clients. |
| 15.7 | Doing it yourself? | Doing it yourself? |
| 17.4 | The list and "weekends gone" | There go your weekends. |
| 18.6 | Or send us one message. | Or send us one message. |
| 21.0 | The message being typed | Tell us about your business. We'll handle the rest. |
| 26.8 | The mark, then "andu design" | andu design. Let's build your website. |
| 29.6 | The contact details | Send us that one message. |

## Ready-made voices

`brand/video/andu-promo-voice-female.m4a` and `andu-promo-voice-male.m4a` are this script read by Kokoro, an open-source voice model (Apache 2.0, so fine for ads), with the voices `af_heart` and `am_michael`. Each line is placed so its key word lands on its beat, and the track is mastered to −14 LUFS, the loudness TikTok and Instagram play at.

To put one on the video, drop both into CapCut, or:

```sh
ffmpeg -i brand/video/andu-promo-9x16.mp4 -i brand/video/andu-promo-voice-female.m4a -map 0:v -map 1:a -c copy -shortest andu-promo-9x16-voice.mp4
```

Music goes under the voice at about 10–20% volume, added in the app so it's licensed.
