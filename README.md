### Xonix

## Background and Overview

Xonix is a classic video game that was developed in 1984. The game
starts with the player in the perimeter of the screen and the balls in
the middle. The 'balls' move freely within the field of the screen while
the player attempts to take 60% of the their space by cutting the screen
into small segments. The player drags a tail with them as they cut the
screen into segments. If a ball collides with the player or the player's
tail before they reach their claimed space again, the player loses a life.
They player will start with three lives and gain one life for each level
they pass.

## Functionality & MVP

In Xonix...

- [ ] Players enter a username of their choice prior to starting play
that will be used for the Score board.
- [ ] Players will navigate the screen vertically and horizontally using
arrow keys in order to claim space on the screen.
- [ ] Players win when they claim 60% of the screen.
- [ ] Stat will be displayed on screen:
  - [ ] Score
  - [ ] Percentage of Screen Claimed
  - [ ] Current Level
  - [ ] Players Name
  - [ ] Available Lives

## Wireframes

Xonix will be a single page app, consisting of a welcome modal, the play
screen canvas, and nav links to the GitHub and my LinkedIn page.

### Welcome Modal
The welcome modal with have an input field where the player can enter a
username of their choice, which will be displayed on the score board if
they make it. The scoreboard itself will also be displayed on the welcome
modal

![welcome modal](https://github.com/bergieboy/xonix_js/blob/master/assets/xonix_welcome.png)

### Play Screen Canvas
The play screen canvas will include the game field and a stats bar below.
The percentage of screen claimed will be displayed as a percentage of a
bar.

![play screen canvas](https://github.com/bergieboy/xonix_js/blob/master/assets/xonix_canvas.png)

## Architecture and Technologies

This project will be implemented with the following technologies:
* Vanilla JavaScript for overall structure and game logic,
* HTML5 Canvas for DOM manipulation and rendering,
* keymaster.js for defining and dispatching keyboard shortcuts,
* physicsJS to model the behavior of the balls upon impact with the perimeter of the play screen,
* and Webpack to bundle and serve up the various scripts.


This project will consist of the following files:
* `game_view.js` sets the game view
* `ball.js` inherits from moving class
* `player.js` inherits from moving class
* `moving_obejct.js`
* `util.js`
* `game.js` holds all of the moving objects and the logic for iterating
through these objects and calling their corresponding move methods.

**Day 1**: Setup all necessary Node modules, including getting webpack up and running. Create webpack.config.js as well as package.json. Write a basic entry file and the bare bones of all 4 scripts outlined above. Goals for the day:

- [ ] Get webpack serving files and frame out index.html.
- [ ] Review Astroid game to familiarize myself with canvas.
- [ ] Review the documentation for PhysicsJS.

**Day 2**: Build out ball and player models and render them on canvas screen. Goals for the day:

- [ ] Render the canvas play screen.
- [ ] Build fully functioning ball and player models.
- [ ] Render ball and player on the canvas frontend.

**Day 3**: Fine tune backend logic. Goals for the day:

- [ ] Have a bare-bones no-frills functioning game.
- [ ] Add frontend display for stats bar.
- [ ] Begin styling - explore where I want to go with it (retro vs. minimalistic).

**Day 4**: Finish remaining tasks. Goals for the day:

- [ ] Implement modal welcome with username input and scoreboard.
- [ ] Finish styling all components.

Bonus Features:

- [ ] skins and avatars for player.
