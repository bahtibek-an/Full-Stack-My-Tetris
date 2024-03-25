const cvs = document.getElementById("tetris");
const ctx = cvs.getContext("2d");
const scoreElements = document.getElementsByClassName('Score');
const dead_menu = document.getElementById('dead_menu');
const pause_menu = document.getElementById('pause_menu');
const sound = document.getElementById('mp3');

var isPlaying = false;

function toggle_play() {
  isPlaying ? sound.pause() : sound.play();
};

sound.onplaying = function() {
  isPlaying = true;
};
sound.onpause = function() {
  isPlaying = false;
};

const ROW = 20;
const COL = COLUMN = 10;
const SQ = squareSize = 27;
const VACANT = "#020121";

dead_menu.classList.add("hidden");
pause_menu.classList.add("hidden");

function draw_square(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * SQ, y * SQ, SQ, SQ);

    ctx.strokeStyle = "#b4ddf5";
    ctx.strokeRect(x * SQ, y * SQ, SQ, SQ);
}

let board = [];
for (let i = 0; i < ROW; i++) {
    board[i] = [];
    for (let k = 0; k < COL; k++) {
        board[i][k] = VACANT;
    }
}

function draw_board() {
    for (let i = 0; i < ROW; i++) {
        for (let k = 0; k < COL; k++) {
            draw_square(k, i, board[i][k]);
        }
    }
}

draw_board();

const I = [
    [[0, 0, 0, 0],[1, 1, 1, 1],[0, 0, 0, 0],[0, 0, 0, 0],],
    [[0, 0, 1, 0],[0, 0, 1, 0],[0, 0, 1, 0],[0, 0, 1, 0],],
    [[0, 0, 0, 0],[0, 0, 0, 0],[1, 1, 1, 1],[0, 0, 0, 0],],
    [[0, 1, 0, 0],[0, 1, 0, 0],[0, 1, 0, 0],[0, 1, 0, 0],]
];

const J = [
    [[1, 0, 0],[1, 1, 1],[0, 0, 0]],
    [[0, 1, 1],[0, 1, 0],[0, 1, 0]],
    [[0, 0, 0],[1, 1, 1],[0, 0, 1]],
    [[0, 1, 0],[0, 1, 0],[1, 1, 0]]
];

const L = [
    [[0, 0, 1],[1, 1, 1],[0, 0, 0]],
    [[0, 1, 0],[0, 1, 0],[0, 1, 1]],
    [[0, 0, 0],[1, 1, 1],[1, 0, 0]],
    [[1, 1, 0],[0, 1, 0],[0, 1, 0]]
];

const O = [
    [[0, 0, 0, 0],[0, 1, 1, 0],[0, 1, 1, 0],[0, 0, 0, 0],]
];

const S = [
    [[0, 1, 1],[1, 1, 0],[0, 0, 0]],
    [[0, 1, 0],[0, 1, 1],[0, 0, 1]],
    [[0, 0, 0],[0, 1, 1],[1, 1, 0]],
    [[1, 0, 0],[1, 1, 0],[0, 1, 0]]
];

const T = [
    [[0, 1, 0],[1, 1, 1],[0, 0, 0]],
    [[0, 1, 0],[0, 1, 1],[0, 1, 0]],
    [[0, 0, 0],[1, 1, 1],[0, 1, 0]],
    [[0, 1, 0],[1, 1, 0],[0, 1, 0]]
];

const Z = [
    [[1, 1, 0],[0, 1, 1],[0, 0, 0]],
    [[0, 0, 1],[0, 1, 1],[0, 1, 0]],
    [[0, 0, 0],[1, 1, 0],[0, 1, 1]],
    [[0, 1, 0],[1, 1, 0],[1, 0, 0]]
];

const PIECES = [
    [Z, "red"],
    [S, "green"],
    [T, "yellow"],
    [O, "blue"],
    [L, "purple"],
    [I, "cyan"],
    [J, "orange"]
];

function random_piece() {
    let r = randomN = Math.floor(Math.random() * PIECES.length)
    return new piece(PIECES[r][0], PIECES[r][1]);
}

let p = random_piece();

function piece(tetromino, color) {
    this.tetromino = tetromino;
    this.color = color;
    this.tetrominoN = 0;
    this.activeTetromino = this.tetromino[this.tetrominoN];
    this.x = 3;
    this.y = -2;
}

piece.prototype.fill = function (color) {
    for (let i = 0; i < this.activeTetromino.length; i++) {
        for (let k = 0; k < this.activeTetromino.length; k++) {
            if (this.activeTetromino[i][k]) {
                draw_square(this.x + k, this.y + i, color);
            }
        }
    }
}

piece.prototype.draw = function () {
    this.fill(this.color);
}

piece.prototype.un_draw = function () {
    this.fill(VACANT);
}

piece.prototype.move_down = function () {
    if (!this.collision(0, 1, this.activeTetromino)) {
        this.un_draw();
        this.y++;
        this.draw();
    } else {
        this.lock();
        p = random_piece();
    }

}

piece.prototype.move_right = function () {
    if (!this.collision(1, 0, this.activeTetromino)) {
        this.un_draw();
        this.x++;
        this.draw();
    }
}

piece.prototype.move_left = function () {
    if (!this.collision(-1, 0, this.activeTetromino)) {
        this.un_draw();
        this.x--;
        this.draw();
    }
}

piece.prototype.rotate = function () {
    let nextPattern = this.tetromino[(this.tetrominoN + 1) % this.tetromino.length];
    let kick = 0;
    if (this.collision(0, 0, nextPattern)) {
        if (this.x > COL / 2) {
        } else {
            kick = 1;
        }
    }
    if (!this.collision(kick, 0, nextPattern)) {
        this.un_draw();
        this.x += kick;
        this.tetrominoN = (this.tetrominoN + 1) % this.tetromino.length;
        this.activeTetromino = this.tetromino[this.tetrominoN];
        this.draw();
    }
}

let score = 0;

piece.prototype.lock = function () {
    for (let i = 0; i < this.activeTetromino.length; i++) {
        for (let k = 0; k < this.activeTetromino.length; k++) {
            if (!this.activeTetromino[i][k]) {
                continue;
            }
            if (this.y + i < 0) {
                dead_menu.classList.add("visible");
                game_over = true;
                break;
            }
            board[this.y + i][this.x + k] = this.color;
        }
    }
    for (let i = 0; i < ROW; i++) {
        let isRowFull = true;
        for (let k = 0; k < COL; k++) {
            isRowFull = isRowFull && (board[i][k] != VACANT);
        }
        if (isRowFull) {
            for (let y = i; y > 1; y--) {
                for (let k = 0; k < COL; k++) {
                    board[y][k] = board[y - 1][k];
                }
            }
            for (let k = 0; k < COL; k++) {
                board[0][k] = VACANT;
            }
            score += 10;
        }
    }
    draw_board();
    for (let i = 0; i < scoreElements.length; i++) {
        scoreElements[i].innerHTML = score;
    }
}

piece.prototype.collision = function (x, y, piece) {
    for (let i = 0; i < piece.length; i++) {
        for (let k = 0; k < piece.length; k++) {
            if (!piece[i][k]) {
                continue;
            }
            let newX = this.x + k + x;
            let newY = this.y + i + y;
            if (newX < 0 || newX >= COL || newY >= ROW) {
                return true;
            }
            if (newY < 0) {
                continue;
            }
            if (board[newY][newX] != VACANT) {
                return true;
            }
        }
    }
    return false;
}


let pause = false;

function hide_pause_menu() {
    pause_menu.classList.remove("visible");
    pause_menu.classList.add("hidden");
}

function show_pause_menu(argument) {
    pause_menu.classList.remove("hidden");
    pause_menu.classList.add("visible");
}

function pause_the_game() {
    pause = true;
}

function continue_the_game() {
    pause = false;
}

function toggle_the_pause() {
    if (pause) {
        continue_the_game();
        hide_pause_menu();
        drop();
    } else {
        pause_the_game();
        show_pause_menu();
    }
}

document.addEventListener("keydown", controler);

function controler(event) {
    if (event.keyCode == 27 || event.keyCode == 112) { 
        toggle_the_pause();
    }
    if (!pause) {
        if (event.keyCode == 13 || event.keyCode == 32) {
            drop();
        }
        if (game_over == true && (event.keyCode == 13 || event.keyCode == 32)) {
            restart_the_game();
        }
        if (event.keyCode == 37 || event.keyCode == 65) {
            p.move_left();
            starter_droping = Date.now();
        } else if (event.keyCode == 38 || event.keyCode == 87) {
            p.rotate();
            starter_droping = Date.now();
        } else if (event.keyCode == 39 || event.keyCode == 68) {
            p.move_right();
            starter_droping = Date.now();
        } else if (event.keyCode == 40 || event.keyCode == 83) {
            p.move_down();
        }
    }
}

let starter_droping = Date.now();
let game_over = false;

function drop() {
    let now = Date.now();
    let delta = now - starter_droping;
    if (delta > 1000) {
        p.move_down();
        starter_droping = Date.now();
    }
    if (!game_over && !pause) {
        requestAnimationFrame(drop);
    }
}

function run_the_game() {
    drop();
}

function restart_the_game() {
    score = 0;
    for (let i = 0; i < scoreElements.length; i++) {
        scoreElements[i].innerHTML = score;
    }
    for (let r = 0; r < ROW; r++) {
        for (let c = 0; c < COL; c++) {
            board[r][c] = VACANT;
        }
    }
    draw_board();
    p = random_piece();
    dead_menu.classList.remove("visible");
    dead_menu.classList.add("hidden");
    if(pause) toggle_the_pause();
    game_over = false;
    starter_droping = Date.now();
    drop();
}