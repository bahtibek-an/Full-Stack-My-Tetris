# Full-Stack My Tetris
Tetris is a tile-matching puzzle video game originally designed and programmed by Soviet Russian software engineer Alexey Pajitnov. The first playable version was completed on June 6, 1984, while he was working for the Dorodnitsyn Computing Centre of the Academy of Sciences of the Soviet Union in Moscow.[3] He derived its name from combining the Greek numerical prefix tetra- (the falling pieces contain 4 segments) and tennis, Pajitnov's favorite sport. The name is also used in-game to refer to the play where four lines are cleared at once.

Tetris was the first game to be exported from the Soviet Union to the United States, where it was published by Spectrum HoloByte for the Commodore 64 and IBM PC. The game is a popular use of tetrominoes, the four-element case of polyominoes, which have been used in popular puzzles since at least 1907. (From Wikipedia, the free encyclopedia)

It's your turn to create a Tetris Implementation. This project is a demonstration of your JavaScript skills and only JavaScript. (No Library, except Math).

### Technical Part
Tetris is a game, you should Google `Game Architecture`.
A game is full of events and, JavaScript is a language very powerful with events. :-)

A player interact with the game with the arrow of his keyboard, in the game world we call it "the controller".

Game logic is very often separated from the `rendering`.

We are expecting an index.html with a `canvas` tag, multiples javascript files included with an explicit name (controller, renderer, tetris_logic, ...) and a css files.
We will follow the `Airbnb JavaScript Style Guide`. [https://github.com/airbnb/javascript](https://github.com/airbnb/javascript)

### Specifications

- Playfield is 10×40, where rows above 20 are hidden or obstructed by the field frame to trick the player into thinking it's 10×20. In 2002 Guideline, it could be at least 22 height.
  - If hardware permits it, a few pixels of row 21 will be visible.
- Tetrimino colors are as follows.
  - Cyan I
  - Yellow O
  - Purple T
  - Green S
  - Red Z
  - Blue J
  - Orange L
  - In versions that use monochrome screens, or when hardware limitations disallow all colors to be used, the Tetriminos should have distinct hues and patterns to differentiate themselves.
- Tetromino start locations
  - The I and O spawn in the middle columns
  - The rest spawn in the left-middle columns
  - The tetriminoes spawn horizontally with J, L and T spawning flat-side first.
  - Spawn above playfield, row 21 for I, and 21/22 for all other tetriminoes.
  - Immediately drop one space if no existing Block is in its path
- Initial rotation and movement
  - Super Rotation System/Standard Rotation System (SRS) specifies tetrimino rotation.
- Standard mappings for console and handheld gamepads:
  - Up, Down, Left, Right on D-pad perform locking hard drop, non-locking soft drop (except first frame locking in some games), left shift, and right shift respectively.
  - A (or its equivalent thereof) rotates 90 degrees counterclockwise, and B (or its equivalent thereof) rotates 90 degrees clockwise.
  - Shoulder buttons and X (or its equivalent thereof) use hold.
- Standard mappings for computer keyboards:
  - Up arrow and X are to rotate 90° clockwise.
  - Space to hard drop.
  - Shift and C are to hold.
  - Ctrl and Z are to rotate 90° counterclockwise.
  - Esc and F1 are to pause.
  - Left, right, and down arrows are the same as on the console.
  - Number pad controls:
  - 0 is to hold.
  - 8, 4, 6, and 2 are hard drop, left shift, right shift, and soft drop respectively.
  - 1, 5, and 9 are to rotate 90° clockwise.
  - 3 and 7 are to rotate 90° counterclockwise.
- Standard mappings for cellphones:
  - Arrow keys are the same as on the console.
  - If the cellphone does not have an OK button on the directional pad, the up arrow is to rotate clockwise.
  - OK to rotate clockwise.
  - 2, 4, 6, and 8 are the same as up, down, left, and right respectively. (2 will always hard drop.)
  - 0 is to hold.
  - 3, 5, 7, and # rotate clockwise.
  - 1, 9, and * rotate counterclockwise.
  - The left soft key is to pause. - If the cellphone does not have softkeys, the menu button (if separate from the OK button) is to pause.
- Standard mappings for remotes:
  - Number pad is the same as on a cellphone.
  - Arrow keys are the same as on the console.
  - OK is to rotate.
  - Channel + and Menu are to pause.
  - If the remote does not have certain buttons, one in the same area as the one omitted is used.
So-called 7-bag Random Generator (also called "random bag" or "7 system")
"Hold piece": The player can press a button to send the falling tetrimino to the hold box, and any tetrimino that had been in the hold box moves to the top of the screen and begins falling. Hold cannot be used again until after the piece locks down. Games on platforms with fewer than eight usable buttons (such as the version on iPod) may skip this feature. The combination of hold piece and Random Generator would appear to allow the player to play forever. It must be enabled by default.
Must have sound effects on by default, on rotation, movement, landing on surface, touching a wall, locking, line clear and game over.
Game must have ghost piece function enabled by default.
- Terms used in the "help" section:
  - "Tetriminos" (the capital T is required), as opposed to "tetrominoes", "tetrads" or "pieces".
  - Letter names, as opposed to "square", "stick", etc.
Designated soft drop speed. Details vary between guideline versions.
Player may only level up by clearing lines or performing T-Spins. Required lines depends on the game.
  - May use fixed-goal or variable-goal.
  - Fixed goal is 10 lines
  - Variable goal is 5 times the level number.
  - The line values for variable-goal levels are as follows:
    - Single = 1 line
    - Double = 3 lines
    - Triple = 5 lines
    - Tetris = 8 lines
- The game must use a variant of Roger Dean's Tetris logo, although this was true from around 2000 - before the guidelines emerged.
  - The logo may not have its t-tetrimino split into 4 minoes.
  - The logo may not be sheared or skewed.
  - The logo must be 2D.
Game must include a song called Korobeiniki. This must be the default song.
Uses half second lock delay.
- The player tops out when a piece is spawned overlapping at least one block (block out), or a piece locks completely above the visible portion of the playfield (lock out).
  - Must have 1 to 6 next pieces.
6 is the recommended number of next pieces.
Recognition and rewarding of T-spin moves. Conditions vary between guideline versions.
2005 / 2009: 3-corner T
2006: 3-corner T no kick
Multiplayer and Arcade variations must have 15 moves/rotations before lock.
Mini T-spin is when one of the minoes next to pointing side is empty, or holes were made without using the triple kick.
Rewarding of Back to Back chains. (Tetris / T-spin)Recognition method depends on the game.
Marathon mode must have 15 levels.
40 line mode (called sprint or 40 lines)
2 or 3 minute timed mode (called ultra)
Speed curve must be the same as Tetris Worlds.
Game must use a scoring system described here.
Game must count down from 3 after you press start, and after you resume a paused game.
Game must have this notice when the game starts (XXXX is the year the game was created): Tetris © 1985~XXXX Tetris Holding. Tetris logos, Tetris theme song and Tetriminos are trademarks of Tetris Holding. The Tetris trade dress is owned by Tetris Holding. Licensed to The Tetris Company. Tetris Game Design by Alexey Pajitnov. Tetris Logo Design by Roger Dean. All Rights Reserved.
Example:
![image](https://github.com/bahtibek-an/Full-Stack-My-Tetris/assets/57597976/9ce80a47-bb52-4922-8239-0d6f8c42ad74)


TIPS Server Html
In order to access your index.html:

Create a script called `html_server.js` with this content:
```
$>cat html_server.js
function start_html_server() {
    const http = require('http');
    const fs = require('fs');

    const hostname = '0.0.0.0';
    const port = 8080;

    const server = http.createServer(function(request, response) {
        response.writeHeader(200, {"Content-Type": "text/html"});
        html = fs.readFileSync('./index.html', 'utf8');
        response.write(html);
        response.end();
    }).listen(port, hostname, () => {
        console.log("Server running at http://web-XXXXXXXXX.docode.YYYY.qwasar.io");
        console.log("Replace XXXXXXXXX by your current workspace ID");
        console.log("(look at the URL of this page and XXXXXXXXX.docode.YYYY.qwasar.io, XXXXXXXXX is your workspace ID and YYYY is your zone)");
    });
}

start_html_server();
$>
```
Create an empty html file:
```
$>echo "Hello world" > index.html
```
Run the html_server and leave the script running.

```
$>node html_server.js
Server running at http://localhost:8080
```
