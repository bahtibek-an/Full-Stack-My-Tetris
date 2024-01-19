# Description

Tetris is a tile-matching puzzle video game originally designed and programmed by Soviet Russian software engineer Alexey Pajitnov. The first playable version was completed on June 6, 1984, while he was working for the Dorodnitsyn Computing Centre of the Academy of Sciences of the Soviet Union in Moscow.[3] He derived its name from combining the Greek numerical prefix tetra- (the falling pieces contain 4 segments) and tennis, Pajitnov's favorite sport. The name is also used in-game to refer to the play where four lines are cleared at once.

Tetris was the first game to be exported from the Soviet Union to the United States, where it was published by Spectrum HoloByte for the Commodore 64 and IBM PC. The game is a popular use of tetrominoes, the four-element case of polyominoes, which have been used in popular puzzles since at least 1907. (From Wikipedia, the free encyclopedia)

It's your turn to create a Tetris Implementation. This project is a demonstration of your JavaScript skills and only JavaScript. (No Library, except Math).

# Task

Tetris is a game, you should Google Game Architecture. A game is full of events and, JavaScript is a language very powerful with events. :-)

A player interact with the game with the arrow of his keyboard, in the game world we call it "the controller".

Game logic is very often separated from the rendering.

We are expecting an index.html with a canvas tag, multiples javascript files included with an explicit name (controller, renderer, tetris_logic, ...) and a css files. We will follow the Airbnb JavaScript Style Guide.

Playfield is 10×40, where rows above 20 are hidden or obstructed by the field frame to trick the player into thinking it's 10×20. In 2002 Guideline, it could be at least 22 height.
If hardware permits it, a few pixels of row 21 will be visible.
Tetrimino colors are as follows.
Cyan I
Yellow O
Purple T
Green S
Red Z
Blue J
Orange L
In versions that use monochrome screens, or when hardware limitations disallow all colors to be used, the Tetriminos should have distinct hues and patterns to differentiate themselves.
Tetromino start locations
The I and O spawn in the middle columns
The rest spawn in the left-middle columns
The tetriminoes spawn horizontally with J, L and T spawning flat-side first.
Spawn above playfield, row 21 for I, and 21/22 for all other tetriminoes.
Immediately drop one space if no existing Block is in its path
Initial rotation and movement
Super Rotation System/Standard Rotation System (SRS) specifies tetrimino rotation.
Standard mappings for console and handheld gamepads:
Up, Down, Left, Right on D-pad perform locking hard drop, non-locking soft drop (except first frame locking in some games), left shift, and right shift respectively.
A (or its equivalent thereof) rotates 90 degrees counterclockwise, and B (or its equivalent thereof) rotates 90 degrees clockwise.
Shoulder buttons and X (or its equivalent thereof) use hold.
Standard mappings for computer keyboards:
Up arrow and X are to rotate 90° clockwise.
Space to hard drop.
Shift and C are to hold.
Ctrl and Z are to rotate 90° counterclockwise.
Esc and F1 are to pause.
Left, right, and down arrows are the same as on the console.
Number pad controls:
0 is to hold.
8, 4, 6, and 2 are hard drop, left shift, right shift, and soft drop respectively.
1, 5, and 9 are to rotate 90° clockwise.
3 and 7 are to rotate 90° counterclockwise.
Standard mappings for cellphones:
Arrow keys are the same as on the console.
If the cellphone does not have an OK button on the directional pad, the up arrow is to rotate clockwise.
OK to rotate clockwise.
2, 4, 6, and 8 are the same as up, down, left, and right respectively. (2 will always hard drop.)
0 is to hold.
3, 5, 7, and # rotate clockwise.
1, 9, and * rotate counterclockwise.
The left soft key is to pause. - If the cellphone does not have softkeys, the menu button (if separate from the OK button) is to pause.

# Installation

Standard mappings for remotes:
Number pad is the same as on a cellphone.
Arrow keys are the same as on the console.
OK is to rotate.
Channel + and Menu are to pause.
If the remote does not have certain buttons, one in the same area as the one omitted is used. So-called 7-bag Random Generator (also called "random bag" or "7 system") "Hold piece": The player can press a button to send the falling tetrimino to the hold box, and any tetrimino that had been in the hold box moves to the top of the screen and begins falling. Hold cannot be used again until after the piece locks down. Games on platforms with fewer than eight usable buttons (such as the version on iPod) may skip this feature. The combination of hold piece and Random Generator would appear to allow the player to play forever. It must be enabled by default. Must have sound effects on by default, on rotation, movement, landing on surface, touching a wall, locking, line clear and game over. Game must have ghost piece function enabled by default.
Terms used in the "help" section:
"Tetriminos" (the capital T is required), as opposed to "tetrominoes", "tetrads" or "pieces".
Letter names, as opposed to "square", "stick", etc. Designated soft drop speed. Details vary between guideline versions. Player may only level up by clearing lines or performing T-Spins. Required lines depends on the game.
May use fixed-goal or variable-goal.
Fixed goal is 10 lines
Variable goal is 5 times the level number.
The line values for variable-goal levels are as follows:
Single = 1 line
Double = 3 lines
Triple = 5 lines
Tetris = 8 lines
The game must use a variant of Roger Dean's Tetris logo, although this was true from around 2000 - before the guidelines emerged.

# Usage

Server running at http://localhost:8080