const canvas = document.getElementById('board');
const ctx = canvas.getContext('2d');
const canvasNext = document.getElementById('next');
const ctxNext = canvasNext.getContext('2d');

let board = new Board(ctx, ctxNext);
let requestId;

initNext();

function initNext() {
	ctxNext.canvas.width = 4 * BLOCK_SIZE;
	ctxNext.canvas.height = 4 * BLOCK_SIZE;
	ctxNext.scale(BLOCK_SIZE, BLOCK_SIZE);
}

let accountValues = {
	score: 0,
	lines: 0,
	level: 0
}

function updateAccount(key, value) {
	let element = document.getElementById(key);
	if (element) {
		element.textContent = value;
	}
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'p' || event.key === 'P') {
        pause();
    }
});

function pause() {
    if (!requestId) {
        document.getElementById('#play-btn').style.display = 'none';
        // document.getElementById('#pause-btn').style.display = 'block';
        animate();
        return;
    }

    cancelAnimationFrame(requestId);
    requestId = null;

    ctx.fillStyle = 'black';
    ctx.fillRect(1, 3, 8, 1.2);
    ctx.font = '1px Arial';
    ctx.fillStyle = 'yellow';
    ctx.fillText('PAUSED', 3, 4);
    document.getElementById('#play-btn').style.display = 'block';
    // document.getElementById('#pause-btn').style.display = 'none';
}

let account = new Proxy(accountValues, {
	set: (target, key, value) => {
		target[key] = value;
		updateAccount(key, value);
		return true;
	}
});

function resetGame() {
	account.score = 0;
	account.lines = 0;
	account.level = 0;
	board.reset();
	time = {
		start: 0,
		elapsed: 0,
		level: LEVEL[account.level]
	};
}

function play() {
	addEventListener();
	resetGame();
	time.start = performance.now();

	if (requestId) {
		cancelAnimationFrame(requestId);
	}
	animate();
}

function animate(now = 0) {

	time.elapsed = now - time.start;

	if (time.elapsed > time.level) {

		time.start = now;

		if (!board.dropPiece()) {
			gameOver();
			return;
		}
	}

	ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

	board.draw();
	requestId = requestAnimationFrame(animate);
}

function gameOver() {
	cancelAnimationFrame(requestId);
	ctx.fillStyle = 'black';
	ctx.fillRect(1, 3, 8, 1.2);
	ctx.font = '1px Arial';
	ctx.fillStyle = 'red';
	ctx.fillText('GAME OVER', 1.8, 4);
}

moves = {
	[KEY.SPACE]: p => ({
		...p,
		y: p.y + 1
	}),
	[KEY.LEFT]: p => ({
		...p,
		x: p.x - 1
	}),
	[KEY.RIGHT]: p => ({
		...p,
		x: p.x + 1
	}),
	[KEY.DOWN]: p => ({
		...p,
		y: p.y + 1
	}),
	[KEY.UP]: p => board.rotate(p)
}

function addEventListener() {
	document.addEventListener('keydown', event => {
		if (moves[event.keyCode]) {

			event.preventDefault();

			let p = moves[event.keyCode](board.piece);

			if (event.keyCode === KEY.SPACE) {

				while (board.valid((p))) {
					account.score += POINTS.HARD_DROP;
					board.piece.move(p);
					p = moves[KEY.DOWN](board.piece);
				}
			} else if (board.valid(p)) {
				if (event.keyCode === KEY.DOWN) {
					account.score += POINTS.HARD_DROP;
				}

				board.piece.move(p);
			}
		}
	});
}