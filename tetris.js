import {
    PLAYFIELD_COLUMNS,
    PLAYFIELD_ROWS,
    TETROMINO_NAMES,
    TETROMINOES,
    getRandomElement,
    rotateMatrix,
  } from "./utilities.js";
let score = 0;

  export class Tetris {
    constructor() {
      this.playfield;
      this.tetromino;
      this.isGameOver = false;
      this.init();
    }
  
    init() {
      this.generatePlayfield();
      this.generateTetromino();
    }
  
    generatePlayfield() {
      this.playfield = new Array(PLAYFIELD_ROWS).fill()
        .map(() => new Array(PLAYFIELD_COLUMNS).fill(0));
    }
  
    generateTetromino() {
      const name = getRandomElement(TETROMINO_NAMES);
      const matrix = TETROMINOES[name];
  
      const column = PLAYFIELD_COLUMNS / 2 - Math.floor(matrix.length / 2);
      const row = -2;
  
      this.tetromino = {
        name,
        matrix,
        row,
        column,
        ghostColumn: column,
        ghostRow: row,
      };
  
      this.calculateGhostPosition();
    }
  
    moveTetrominoDown() {
      this.tetromino.row += 1;
      if (!this.isValid()) {
        this.tetromino.row -= 1;
        this.placeTetromino();
      }
    }
  
    moveTetrominoLeft() {
      this.tetromino.column -= 1;
      if (!this.isValid()) {
        this.tetromino.column += 1;
      } else {
        this.calculateGhostPosition();
      }
    }
  
    moveTetrominoRight() {
      this.tetromino.column += 1;
      if (!this.isValid()) {
        this.tetromino.column -= 1;
      } else {
        this.calculateGhostPosition();
      }
    }
  
    rotateTetromino() {
      const oldMatrix = this.tetromino.matrix;
      const rotatedMatrix = rotateMatrix(this.tetromino.matrix);
      this.tetromino.matrix = rotatedMatrix;
      if (!this.isValid()) {
        this.tetromino.matrix = oldMatrix;
      } else {
        this.calculateGhostPosition();
      }
    }
  
    dropTetrominoDown() {
      this.tetromino.row = this.tetromino.ghostRow;
      this.placeTetromino();
    }
  
    isValid() {
      const matrixSize = this.tetromino.matrix.length;
      for (let row = 0; row < matrixSize; row++) {
        for (let column = 0; column < matrixSize; column++) {
          if (!this.tetromino.matrix[row][column]) continue;
          if (this.isOutsideOfGameBoard(row, column)) return false;
          if (this.isCollides(row, column)) return false;
        }
      }
      return true;
    }
  
    isOutsideOfGameBoard(row, column) {
      return this.tetromino.column + column < 0 ||
        this.tetromino.column + column >= PLAYFIELD_COLUMNS ||
        this.tetromino.row + row >= this.playfield.length;
    }
  
    isCollides(row, column) {
      return this.playfield[this.tetromino.row + row]?.[this.tetromino.column + column];
    }
  
    placeTetromino() {
      const matrixSize = this.tetromino.matrix.length;
      for (let row = 0; row < matrixSize; row++) {
        for (let column = 0; column < matrixSize; column++) {
          if (!this.tetromino.matrix[row][column]) continue;
          if (this.isOutsideOfTopBoard(row)) {
            this.isGameOver = true;
            return;
          }
  
          this.playfield[this.tetromino.row + row][this.tetromino.column + column] = this.tetromino.name;
        }
      }
  
      this.processFilledRows();
      this.generateTetromino();
    }
  
    isOutsideOfTopBoard(row) {
      return this.tetromino.row + row < 0;
    }
  
    processFilledRows() {
      const filledLines = this.findFilledRows();
      this.removeFilledRows(filledLines);
    }
  
    findFilledRows() {
      const filledRows = [];
      for (let row = 0; row < PLAYFIELD_ROWS; row++) {
        if (this.playfield[row].every(cell => Boolean(cell))) {
          filledRows.push(row);
        }
      }
  
      return filledRows;
    };
  
    removeFilledRows(filledRows) {
      const scoreElement = document.querySelector("#score");
      filledRows.forEach(row => {
        score += 10;
        scoreElement.innerHTML = `Score: ${score}`;
        this.dropRowsAbove(row);
      });
    }
  
    dropRowsAbove(rowToDelete) {
      for (let row = rowToDelete; row > 0; row--) {
        this.playfield[row] = this.playfield[row - 1];
      }
      this.playfield[0] = new Array(PLAYFIELD_COLUMNS).fill(0);
    }
  
    calculateGhostPosition() {
      const tetrominoRow = this.tetromino.row;
      this.tetromino.row++;
      while (this.isValid()) {
        this.tetromino.row++;
      }
      this.tetromino.ghostRow = this.tetromino.row - 1;
      this.tetromino.ghostColumn = this.tetromino.column;
      this.tetromino.row = tetrominoRow;
    }
  }