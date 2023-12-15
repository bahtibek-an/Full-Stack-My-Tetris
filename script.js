const tetris = document.getElementById('tetris');
const contentText = tetris.getContext('2d');
const grids = 40;
const tetrisSequence = [];
const playfield = [];
for (let row = -2; row < 20; row++) {
    playfield[row] = [];
    for (let col = 0; col < 10; col++) {
        playfield[row][col] = 0;
    }
}
const shape = {
    'I': [
        [0, 0, 0, 0],
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ],
    'J': [
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 0],
    ],
    'L': [
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 0],
    ],
    'O': [
        [1, 1],
        [1, 1],
    ],
    'S': [
        [0, 1, 1],
        [1, 1, 0],
        [0, 0, 0],
    ],
    'Z': [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0],
    ],
    'T': [
        [0, 1, 0],
        [1, 1, 1],
        [0, 0, 0],
    ]
};
const colors = {
    'I': 'cyan',
    'O': 'yellow',
    'T': 'purple',
    'S': 'green',
    'Z': 'red',
    'J': 'blue',
    'L': 'orange'
};
let count = 0;
let tetromino = getNextTetromino();
let rAF = null;
let gameOver = false;
let score = 0;

function increaseScore(points) {
    score += points;
    document.getElementById('currentScore').innerText = score;
}

function loop() {
    rAF = requestAnimationFrame(loop);
    contentText.clearRect(0, 0, tetris.width, tetris.height);
    for (let row = 0; row < 20; row++) {
        for (let col = 0; col < 10; col++) {
            if (playfield[row][col]) {
                const name = playfield[row][col];
                contentText.fillStyle = colors[name];
                contentText.fillRect(col * grids, row * grids, grids - 1, grids - 1);
            }
        }
    }

    if (tetromino) {


        if (++count > 35) {
            tetromino.row++;
            count = 0;


            if (!isValidMove(tetromino.matrix, tetromino.row, tetromino.col)) {
                tetromino.row--;
                placeTetromino();
            }
        }

        contentText.fillStyle = colors[tetromino.name];

        for (let row = 0; row < tetromino.matrix.length; row++) {
            for (let col = 0; col < tetromino.matrix[row].length; col++) {
                if (tetromino.matrix[row][col]) {


                    contentText.fillRect((tetromino.col + col) * grids, (tetromino.row + row) * grids, grids - 1, grids - 1);
                }
            }
        }
    }
}



function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

document.addEventListener('keydown', function(e) {
    if (gameOver) return;

    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        const col = e.key === 'ArrowLeft' ? tetromino.col - 1 : tetromino.col + 1;

        if (isValidMove(tetromino.matrix, tetromino.row, col)) {
            tetromino.col = col;
        }
    }

    if (e.key === 'ArrowUp') {
        const matrix = rotate(tetromino.matrix);
        if (isValidMove(matrix, tetromino.row, tetromino.col)) {
            tetromino.matrix = matrix;
        }
    }

    if (e.key === 'ArrowDown') {
        const row = tetromino.row + 1;

        if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
            tetromino.row = row - 1;
            placeTetromino();
            return;
        }

        tetromino.row = row;
    }
});

document.getElementById('left').addEventListener('click', function() {
    if (!gameOver) {
        const col = tetromino.col - 1;
        if (isValidMove(tetromino.matrix, tetromino.row, col)) {
            tetromino.col = col;
        }
    }
});

document.getElementById('right').addEventListener('click', function() {
    if (!gameOver) {
        const col = tetromino.col + 1;
        if (isValidMove(tetromino.matrix, tetromino.row, col)) {
            tetromino.col = col;
        }
    }
});

document.getElementById('rotate').addEventListener('click', function() {
    if (!gameOver) {
        const matrix = rotate(tetromino.matrix);
        if (isValidMove(matrix, tetromino.row, tetromino.col)) {
            tetromino.matrix = matrix;
        }
    }
});

document.getElementById('down').addEventListener('click', function() {
    if (!gameOver) {
        const row = tetromino.row + 1;
        if (!isValidMove(tetromino.matrix, row, tetromino.col)) {
            tetromino.row = row - 1;
            placeTetromino();
            return;
        }
        tetromino.row = row;
    }
});


document.getElementById('play').addEventListener('click', function() {
    if (gameOver) {
        playfield.forEach(row => row.fill(0));
        tetrisSequence.length = 0;
        generateSequence();
        tetromino = getNextTetromino();
        count = 0;
        gameOver = false;
        score = 0;
        document.getElementById('currentScore').innerText = score;
        requestAnimationFrame(loop);
        tetris.classList.remove('gameOver')
    }
});

function generateSequence() {
    const sequence = ['I', 'J', 'L', 'O', 'S', 'T', 'Z'];

    while (sequence.length) {
        const rand = getRandomInt(0, sequence.length - 1);
        const name = sequence.splice(rand, 1)[0];
        tetrisSequence.push(name);
    }
}


function getNextTetromino() {
    if (tetrisSequence.length === 0) {
        generateSequence();
    }
    const name = tetrisSequence.pop();
    const matrix = shape[name];
    const col = playfield[0].length / 2 - Math.ceil(matrix[0].length / 2);
    const row = name === 'I' ? -1 : -2;
    return {
        name: name,
        matrix: matrix,
        row: row,
        col: col
    };
}

function rotate(matrix) {
    const N = matrix.length - 1;
    const result = matrix.map((row, i) =>
        row.map((val, j) => matrix[N - j][i])
    );
    return result;
}


function isValidMove(matrix, cellRow, cellCol) {
    for (let row = 0; row < matrix.length; row++) {
        for (let col = 0; col < matrix[row].length; col++) {
            if (matrix[row][col] && (
                    cellCol + col < 0 ||
                    cellCol + col >= playfield[0].length ||
                    cellRow + row >= playfield.length ||
                    playfield[cellRow + row][cellCol + col])) {
                return false;
            }
        }
    }

    return true;
}

function placeTetromino() {
    for (let row = 0; row < tetromino.matrix.length; row++) {
        for (let col = 0; col < tetromino.matrix[row].length; col++) {
            if (tetromino.matrix[row][col]) {
                if (tetromino.row + row < 0) {
                    return showGameOver();
                }
                playfield[tetromino.row + row][tetromino.col + col] = tetromino.name;
            }
        }
    }

    for (let row = playfield.length - 1; row >= 0;) {
        if (playfield[row].every(cell => !!cell)) {
            for (let r = row; r >= 0; r--) {
                for (let c = 0; c < playfield[r].length; c++) {
                    playfield[r][c] = playfield[r - 1][c];
                }
            }
            increaseScore(10);
        } else {
            row--;
        }
    }

    tetromino = getNextTetromino();
}


function showGameOver() {
    cancelAnimationFrame(rAF);
    gameOver = true;
    contentText.fillStyle = 'black';
    contentText.globalAlpha = 0.75;
    contentText.fillRect(0, tetris.height / 2 - 30, tetris.width, 60);
    contentText.globalAlpha = 1;
    contentText.fillStyle = 'white';
    contentText.font = '36px fantasy';
    contentText.textAlign = 'center';
    contentText.textBaseline = 'middle';
    contentText.fillText('GAME OVER!', tetris.width / 2, tetris.height / 2);
    tetris.classList.add('gameOver')

}
rAF = requestAnimationFrame(loop)