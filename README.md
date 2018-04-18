### Painter

## Background and Overview

Paper is a video game that is lightly based on Xonix, a classic video
game that was developed in 1984. The game starts with the player at the
center and enemies randomly placed throughout the screen. The objective
of the game is for the player to paint as much of the screen as possible.
The Player starts in a pre-sized, already painted zone which serves as
their safe zone. The player can exit their safe zone, leaving a trail
behind them until they return to their safe zone. The space encapsulated
in the players trail will become 'painted' and will extend their safe
space. If a enemy runs into their trail while painting a new portion,
they game ends, and the players score is quantified as the percentage of
the screen that hey covered.

## Functionality & MVP

In Painter...

- [ ] Players enter a username of their choice prior to starting.
- [ ] Players will navigate the screen vertically and horizontally using
arrow keys in order to claim space on the screen.
- [ ] Players win when they capture 100% of the screen.
- [ ] Players lose when an enemy collides with their tail.
- [ ] Stat will be displayed on screen:
  - [ ] Percentage of Screen Claimed
  - [ ] Players Name

## Wireframes

Painter will be a single page app, consisting of a welcome modal, the play
screen canvas, and nav links to the GitHub and my LinkedIn page.

### Welcome Modal
The welcome modal with have an input field where the player can enter a
username of their choice.

![welcome modal](https://github.com/bergieboy/xonix_js/blob/master/assets/xonix_welcome.png)

### Play Screen Canvas
The play screen canvas will include the game field and the username and
percentage of the screen painted.

![play screen canvas](https://github.com/bergieboy/xonix_js/blob/master/assets/xonix_canvas.png)

## Architecture and Technologies

This project will be implemented with the following technologies:
* Vanilla JavaScript for overall structure and game logic,
* HTML5 Canvas for DOM manipulation and rendering,
* and Webpack to bundle and serve up the various scripts.


This project will consist of the following files:
* `ball.js`
* `painter.js`
* `enemies.js`
* `paper.js` where the content is rendered
* `game.js` holds all of the moving objects and the logic for iterating
through these objects and calling their corresponding move methods.

**Day 1**: Setup all necessary Node modules, including getting webpack up and running. Create webpack.config.js as well as package.json. Write a basic entry file and the bare bones of all 4 scripts outlined above. Goals for the day:

- [ ] Get webpack serving files and frame out index.html.
- [ ] Review Astroid game to familiarize myself with canvas.

**Day 2**: Build out enemy and player models and render them on canvas screen. Goals for the day:

- [ ] Render the canvas play screen.
- [ ] Build fully functioning enemies and player models.
- [ ] Render player and enemies on the canvas frontend.

**Day 3**: Fine tune backend logic. Goals for the day:

- [ ] Have a bare-bones no-frills functioning game.
- [ ] Add frontend display for username and coverage percentage.
- [ ] Begin styling - explore where I want to go with it (retro vs. minimalistic).

**Day 4**: Finish remaining tasks. Goals for the day:

- [ ] Implement modal welcome with username input.
- [ ] Finish styling all components.

Bonus Features:

- [ ] Skins and avatars for player.
- [ ] Multiple Levels
