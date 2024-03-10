class TetrisDashboard {
    ctx;
    ctxNext;
    grid;
    piece;
    next;
    requestId;
    time;

    constructor(ctx, ctxNext) {
        this.ctx = ctx
        this.ctxNext = ctxNext
        this.init()
    }

    init() {
        ctx.canvas.width = COLS * BLOCK_SIZE;
        ctx.canvas.height = ROWS * BLOCK_SIZE;

        ctx.scale(BLOCK_SIZE,BLOCK_SIZE)
    }

    reset() {
        this.grid = this.get_empty_grid()
        this.piece = new tetrisPiece(this.ctx)
        this.piece.set_starting_position()
        this.get_new_piece()
    }

    get_new_piece() {
        this.next = new tetrisPiece(this.ctxNext)
        this.ctxNext.clearRect(0,0,
            this.ctxNext.canvas.width,
            this.ctxNext.canvas.height);
        this.next.draw()
    }

    draw() {
        this.piece.draw()
        this.draw_board()
    }

    drop() {
        let p = moves[KEY.DOWN](this.piece)
        if (this.true(p)) {
            this.piece.move(p)
        } else {
            this.freeze()
            this.clear_lines()
            if(this.piece.y === 0) {
                return false
            }
            this.piece = this.next
            this.piece.ctx = this.ctx
            this.piece.set_starting_position()
            this.get_new_piece()
        }
        return true
    }

    clear_lines () {
        let lines = 0
        this.grid.forEach((row,y) => {
            if(row.every(value => value >0)) {
                lines++
                this.grid.splice(y,1)
                this.grid.unshift(Array(COLS).fill(0))
            }
        })

        if (lines>0) {
            account.score += this.get_lines_cleared_points(lines)
            account.lines += lines

            if(account.lines >= LINES_PER_LEVEL) {
                account.level++
                account.lines -= LINES_PER_LEVEL
                time.level = LEVEL[account.level]
            }
        }
    }

    freeze() {
        this.piece.shape.forEach((row,y) => {
            row.forEach((value,x)  => {
                if(value > 0) {
                    this.grid[y + this.piece.y][x + this.piece.x] = value
                }
            })
        }
        )
    }

    draw_board() {
        this.grid.forEach((row,y) => {
            row.forEach((value, x) => {
                if(value > 0) {
                    this.ctx.fillStyle = COLORS[value]
                    this.ctx.fillRect(x,y,1,1)
                }
            })
        })
    }

    get_empty_grid() {
        return Array.from(
            {length: ROWS}, () => Array(COLS).fill(0)
        )
    }

    true(p) {
        return p.shape.every((row,dy)=> {
            return row.every((value,dx) => {
                let x = p.x + dx
                let y = p.y + dy
                return (
                    value === 0 ||
                    (this.inside_walls(x) && this.above_floor(y) && this.not_occupied(x,y))
                )
            })
        })
    }

    inside_walls(x) {
        return x >= 0 && x< COLS
    }

    above_floor(y) {
        return y <= ROWS
    }

    not_occupied(x,y) {
        return this.grid[y] && this.grid[y][x] ===0
    }

    rotate(p) {
        let clone = JSON.parse(JSON.stringify(p));
        for (let y = 0; y < p.shape.length; ++y) {
            for (let x = 0; x < y; ++x) {
              [p.shape[x][y], p.shape[y][x]] = 
              [p.shape[y][x], p.shape[x][y]];
            }
          }
          p.shape.forEach(row => row.reverse());
          return p;
    }

    get_lines_cleared_points(lines,level) {
        const line_clear_points = 
            lines ===1
                ? POINTS.SINGLE
                : lines === 2
                ? POINTS.DOUBLE
                : lines === 3
                ? POINTS.TRIPLE
                : lines === 4
                ? POINTS.TETRIS
                : 0

        return (account.level + 1) * line_clear_points
    }
}