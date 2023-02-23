# Air Quality real-time checker for Ukrainian cities

This project was created using create react app with TypeScript, three.js and Air Quality API from [Open Meteo Air Quality API](https://open-meteo.com)

## How it works

This app uses the European Air Quality Index (AQI) that ranges from 0-20 (good), 20-40 (fair), 40-60 (moderate), 60-80 (poor), 80-100 (very poor).

Each range has it's own corresponding color representing air pollution in the selected location. When in range - the background of an app changes.

The current pollution level also change the number of animated particles viewed on screen. More pollution - more particles to be expected appearing on screen.

## Build

Can be viewed [here](https://ukrainian-air-quality.vercel.app/)