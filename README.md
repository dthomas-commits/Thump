# Thumb Beat

Rhythm game controlled by thumb gestures via webcam (MediaPipe Hands).

## Run
    npm install
    npm start
Open http://localhost:8000 in Chrome, Edge or Firefox and allow the camera.
Requires Node 16+.

## Gestures
Left / Up / Down / Right = thumb direction (no other gestures).
Keyboard fallback: arrow keys.
Difficulty: Easy / Normal / Hard. Use the sensitivity slider on the menu if directions are hard to trigger.

## Notes
- Everything is served locally, including the MediaPipe model files (from node_modules).
- Use localhost, not your LAN IP: browsers only allow the camera on localhost or HTTPS.
- Thumb direction logic lives in classify() in public/index.html (smoothing and hysteresis are there).

## Music
Put your own audio files in `public/music/`, named exactly:
sky-high.mp3, fade.mp3, the-spectre.mp3, fluffing-a-duck.mp3, cradles.mp3, nekozilla.mp3, montagem-india.mp3.
The game analyses each file in the browser (tempo, beats, onsets) and builds its chart from it; the whole file plays start to finish.
A song with no file falls back to a 2-minute placeholder beat so you can still test the game.

## Maps (exact sync)
Automatic charts are guesses from the audio. For exact sync, make a map: click ● MAP next to a song, tap the arrow keys in time with the music, press Esc (or let the song finish). A <song-id>.json file downloads; put it in public/maps/ and reload. See public/maps/README.txt. The "Note timing" slider on the home screen shifts all notes if everything feels slightly early or late.
