# wata: a thirst alert app 🧚🏼‍♀️💧
Art, design, and code by me (@amicorn)

<img src="screenshots/wata app cover screen.png" alt="App Cover Screen" width="500">
<img src="screenshots/Menu Screen.png" alt="App Cover Screen" width="500">


## Overview
🎶 wata wata eh eh 🎶

Stay hydrated with this fantasy-themed drink water reminder app. 💦

Pixies, potions, and pixels will motivate you to get that H2O fueling your life force.

## Inspiration
App idea came to me because I'm always thirsty and dehydrated and so are all my female friends. Theme is fantasy pastel pixel art because I love fantasy and decided to try my hand at pixel art for the first time.

## Tech stack
- Framework == Electron: framework to make desktop apps. Embeds Chromium rendering engine and Node.js runtime.
    - Needed to install NPM and NodeJs as prereqs
- Languages == Javascript, HTML, CSS

## Design
Design by me
- <a href="https://www.figma.com/proto/tKL5Rx1BYedixCro0N6j8R/Wata-app?node-id=49-5&t=p1OWdJ0uXzS725B6-1">Figma prototype</a>

## Workflow
1. I first coded a basic POC of the app with only the functionality and no styling. Screen flow: start > menu > countdown timer > times up > countdown > times up (repeat N drinks) > cast spell > reward
2. I hand-drew all the assets on Procreate from scratch and made a Figma design and wireframe with my artwork
3. Hand-animated each frame of the bubbling sparkling potion animation. 50 frames total set at a rate of 8 frames/second.
5. I resized all my assets/artwork and redrew some in Procreate to match my Figma design dimensions for each individual element across all screens. Also drew some buttons
6. Added css styling and made the app visuals match the figma design. A very time-consuming step. 
7. Added custom animations (flying fairy, floating potion, chugging potion, water rain drop)
8. Added audio including background music and sound effects
9. Refactored code to be more generic and configurable
- Debugging: `npm start` then <Cmd + Option + i> to open devtools while running the app

## Resources
- Sound Effects
    - Potion bubbling magic sfx from https://mixkit.co/free-sound-effects/magic/
    - Other magic sfx from Sound Effect by <a href="https://pixabay.com/users/universfield-28281460/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=278824">Universfield</a> from <a href="https://pixabay.com//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=278824">Pixabay</a>
    - Timer up sfx: Sound Effect by <a href="https://pixabay.com/users/joo_yy-24508386/?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=11238">Jooeun Yeo</a> from <a href="https://pixabay.com/sound-effects//?utm_source=link-attribution&utm_medium=referral&utm_campaign=music&utm_content=11238">Pixabay</a>
- Background music: <a href="https://www.youtube.com/watch?v=gI9IRxjT75Q">Under This Luminous Sky | Official Soundtrack - 3. Weaved Theme</a>
- How I made my custom figma desktop icon: https://icons8.com/icon/uhcBDl2aashO/figma
- How I recoloured my mute icon SVG file: https://svgcolor.com/
