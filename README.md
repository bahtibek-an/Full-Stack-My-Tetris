# Description

Tetris is a tile-matching puzzle video game originally designed and programmed by Soviet Russian software engineer Alexey Pajitnov. The first playable version was completed on June 6, 1984, while he was working for the Dorodnitsyn Computing Centre of the Academy of Sciences of the Soviet Union in Moscow.[3] He derived its name from combining the Greek numerical prefix tetra- (the falling pieces contain 4 segments) and tennis, Pajitnov's favorite sport. The name is also used in-game to refer to the play where four lines are cleared at once.

Tetris was the first game to be exported from the Soviet Union to the United States, where it was published by Spectrum HoloByte for the Commodore 64 and IBM PC. The game is a popular use of tetrominoes, the four-element case of polyominoes, which have been used in popular puzzles since at least 1907. (From Wikipedia, the free encyclopedia)

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

# Installation

The player tops out when a piece is spawned overlapping at least one block (block out), or a piece locks completely above the visible portion of the playfield (lock out).
Must have 1 to 6 next pieces. 6 is the recommended number of next pieces. Recognition and rewarding of T-spin moves. Conditions vary between guideline versions. 2005 / 2009: 3-corner T 2006: 3-corner T no kick Multiplayer and Arcade variations must have 15 moves/rotations before lock. Mini T-spin is when one of the minoes next to pointing side is empty, or holes were made without using the triple kick. Rewarding of Back to Back chains. (Tetris / T-spin)Recognition method depends on the game. Marathon mode must have 15 levels. 40 line mode (called sprint or 40 lines) 2 or 3 minute timed mode (called ultra) Speed curve must be the same as Tetris Worlds. Game must use a scoring system described here. Game must count down from 3 after you press start, and after you resume a paused game. Game must have this notice when the game starts (XXXX is the year the game was created): Tetris © 1985~XXXX Tetris Holding. Tetris logos, Tetris theme song and Tetriminos are trademarks of Tetris Holding. The Tetris trade dress is owned by Tetris Holding. Licensed to The Tetris Company. Tetris Game Design by Alexey Pajitnov. Tetris Logo Design by Roger Dean.

# Usage

Server running at http://localhost:8080