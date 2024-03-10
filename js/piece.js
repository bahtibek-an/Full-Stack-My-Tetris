class tetrisPiece {

	x;
	y;
	color;
	shape;
	ctx;
	typeId;


	constructor(ctx) {
		this.ctx = ctx;
		this.spawn();
	}

	spawn() {
		this.typeId = this.randomize_tetromino_type(COLORS.length - 1)
		this.shape = SHAPES[this.typeId];
		this.color = COLORS[this.typeId];
		this.x = 0
		this.y = 0
	}

	draw() {
		this.ctx.fillStyle = this.color;
		this.shape.forEach((row, y) => {
			row.forEach((value, x) => {
				if (value > 0) {
					this.ctx.fillRect(this.x + x, this.y + y, 1, 1)
				}
			})
		})
	}

	move(p) {
		this.x = p.x;
		this.y = p.y;
		this.shape = p.shape
	}

	randomize_tetromino_type(noOfTypes) {
		return Math.floor(Math.random() * noOfTypes + 1)
	}

	set_starting_position() {
		if (this.typeId === 4) {
			this.x = 4;
		}
		else {
			this.x = 3;
		}
	}
}