/**
 * JS Langton's Ant 1.0.0
 * Renders the Langton's Ant game
 * https://github.com/patopitaluga/langdonsant
 *
 * By patricio.pitaluga@gmail.com - http://twitter.com/pato_pitaluga
 *
 * Released under the MIT license
 * http://aerolab.github.io/readremaining.js/LICENSE.txt
 */
'use strict';

class langtonsAnt {
  constructor(_options) {
    this.options = {
      cols: _options.cols,
      rows: _options.rows,
      interval: _options.interval,
      randomBlackCell: _options.randomBlackCell,
      containerElemId: _options.containerElemId,
      antsNumber: _options.antsNumber,
      randomInitialPos: _options.randomInitialPos,
      dataElementId: _options.dataElementId
    }

    this.langAntField = [];
    this.ants = [];
    this.steps = 0;
  }
  // Directions: 0 is top, 1 is right, 2 is down, 3 is left
  addAnts() {
    for (let r = this.options.antsNumber; r > 0; r--) {
      let initialXpos = Math.round(this.options.cols / 2);
      let initialYpos = Math.round(this.options.rows / 2);

      if (this.options.randomInitialPos) {
        initialXpos = Math.round(Math.random() * this.options.cols);
        initialYpos = Math.round(Math.random() * this.options.rows);
      }

      this.ants.push({
        posX: initialXpos,
        posY: initialYpos,
        direction: Math.floor((Math.random() * 4))
      });
    }
  }

  populateField() {
    let rowsHtml = '';
    for (let rowIndex = 1; rowIndex <= this.options.rows; rowIndex++) {
      let colsHtml = '';
      this.langAntField[rowIndex] = [];
      for (let colIndex = 1; colIndex <= this.options.cols; colIndex++) {
        let cellStatus = 0;
        let randPercentual = Math.floor(Math.random() * 100) + 1;
        if (randPercentual < this.options.randomBlackCell)
          cellStatus = 1;
        colsHtml += '<td id="r' + rowIndex +'c' + colIndex +'" class="s' + cellStatus + '"></td>';
        this.langAntField[rowIndex][colIndex] = 0;
      }

      rowsHtml += '<tr>' + colsHtml + '</tr>';
    }
    document.getElementById(this.options.containerElemId).innerHTML = '<table>' + rowsHtml + '</table>';
  }

  cicle() {
    this.steps++;
    if (typeof this.options.dataElementId !== 'undefined') {
      document.getElementById(this.options.dataElementId).innerHTML = 'Cycle: ' + this.steps;
    }
    for (let antIndex = this.ants.length - 1; antIndex >= 0; antIndex--) {
      let currentCellId = 'r' + this.ants[antIndex].posY + 'c' + this.ants[antIndex].posX;
      if (document.getElementById(currentCellId)) {
        let currentCell = document.getElementById(currentCellId);
        // remove the ant from previous position
        currentCell.classList.remove('ant');

        // At a white square, turn 90° right, flip the color of the square, move forward one unit
        if (currentCell.classList.contains('s0')) {
          this.ants[antIndex].direction += 1;
          if (this.ants[antIndex].direction === 4) this.ants[antIndex].direction = 0;

          currentCell.classList.remove('s0');
          currentCell.classList.add('s1');
        } else {
          // At a black square, turn 90° left, flip the color of the square, move forward one unit
          // if (currentCell.classList.contains('s1')) {
            this.ants[antIndex].direction -= 1;
            if (this.ants[antIndex].direction === -1) this.ants[antIndex].direction = 3;

            currentCell.classList.remove('s1');
            currentCell.classList.add('s0');
          // }
        }

        // Move ant forward
        switch(this.ants[antIndex].direction) {
          case 0:
            this.ants[antIndex].posY -= 1;
            break;
          case 1:
            this.ants[antIndex].posX += 1;
            break;
          case 2:
            this.ants[antIndex].posY += 1;
            break;
          case 3:
            this.ants[antIndex].posX -= 1;
            break;
        }

        let nextCellId ='r' + this.ants[antIndex].posY + 'c' + this.ants[antIndex].posX;
        if (document.getElementById(nextCellId))
          document.getElementById(nextCellId).classList.add('ant');
      }
    }
  }

  init() {
    this.populateField();
    this.addAnts();

    var self = this;
    setInterval(function() {
      self.cicle();
    }, this.options.interval);
  }
};

