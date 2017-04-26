/**
 * JS Langton's Ant 1.0.0
 * Renders the Langton's Ant game
 * https://github.com/patopitaluga/langtons-ant
 *
 * By patricio.pitaluga@gmail.com - http://twitter.com/pato_pitaluga
 *
 * Released under the MIT license
 * https://github.com/patopitaluga/langtons-ant/LICENSE.txt
 */
'use strict';

/**
 * Renders the Langton's Ant game in an element given its id
 * @param {Object}  options - function options.
 * @param {Number}  options.cols - number of columns in the matrix.
 * @param {Number}  options.rows - number of rows in the matrix.
 * @param {Number}  options.timeInterval - in milliseconds. Interval of time between each cycle.
 * @param {Number}  options.randomBlackCell - Between 0 and 100. Percentual chance of any cell to be black.
 * @param {String}  options.containerElemId - The id of the container element for the table
 * @param {Number}  options.howManyAnts - The number of ants to be generated
 * @param {Number}  options.stepsPerCycle - Number of steps computed for every cycle in which the render is updated.
 * @param {Boolean} options.randomInitialPos - If true, each ant initial position is set randomly. If false, each one starts from the middle of the matrix.
 * @param {Number}  options.initialDirection - Between 0 and 3. 0 is top, 1 is right, 2 is down, 3 is left. -1 to let it be randomly determined
 * @param {String}  options.dataElementId - The id of the container element for the text output
 */
function LangtonsAnt(options) {
  var defaults = {
    cols: 75,
    rows: 49,
    timeInterval: 66,
    randomBlackCell: 0,
    containerElemId: 'langtonsAnt',
    howManyAnts: 1,
    stepsPerCycle: 1,
    randomInitialPos: false,
    initialDirection: 0,
    dataElementId: 'langtonsAntInfo'
  };
  this.options = Object.assign({}, defaults, options);

  // initial direction -1 for random
  if (this.options.initialDirection === -1) {
    this.options.initialDirection = Math.floor((Math.random() * 4));
  }

  this.langAntField = [];
  this.ants = [];
  this.cycle = 0;
  this.steps = 0;
}

LangtonsAnt.prototype = {
  addAnts: function() {
    for (let r = this.options.howManyAnts; r > 0; r--) {
      let initialXpos = Math.round(this.options.cols / 2);
      let initialYpos = Math.round(this.options.rows / 2);

      if (this.options.randomInitialPos) {
        initialXpos = Math.round(Math.random() * this.options.cols);
        initialYpos = Math.round(Math.random() * this.options.rows);
      }

      this.ants.push({
        posX: initialXpos,
        posY: initialYpos,
        direction: this.options.initialDirection
      });
    }
  },
  populateField: function(callback) {
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
        this.langAntField[rowIndex][colIndex] = cellStatus;
      }

      rowsHtml += '<tr>' + colsHtml + '</tr>';
    }
    document.getElementById(this.options.containerElemId).innerHTML = '<table class="jslangtonsant-table">' + rowsHtml + '</table>';
    callback();
  },
  runAcycle: function() {
    this.cycle++;
    this.steps += this.options.stepsPerCycle;
    if (typeof this.options.dataElementId !== 'undefined') {
      let textData = 'Cycle: ' + this.cycle;
      if (this.cycle !== this.steps)
        textData += ' Steps: ' + this.steps;
      document.getElementById(this.options.dataElementId).innerHTML = textData;
    }

    // Calculate changes made by every ant
    for (let stepIndex = this.options.stepsPerCycle; stepIndex >= 0; stepIndex--) {
      for (let antIndex = this.ants.length - 1; antIndex >= 0; antIndex--) {
        if (typeof this.langAntField[this.ants[antIndex].posY] === 'undefined') {
          this.langAntField[this.ants[antIndex].posY] = [];
          this.langAntField[this.ants[antIndex].posY][this.ants[antIndex].posX] = 0;
        }
        if (this.langAntField[this.ants[antIndex].posY][this.ants[antIndex].posX] === 0) {
          // At a white square, turn 90° right, flip the color of the square, move forward one unit
          this.ants[antIndex].direction += 1;
          if (this.ants[antIndex].direction === 4) this.ants[antIndex].direction = 0;

          this.langAntField[this.ants[antIndex].posY][this.ants[antIndex].posX] = 1;
        } else {
          // At a black square, turn 90° left, flip the color of the square, move forward one unit
          this.ants[antIndex].direction -= 1;
          if (this.ants[antIndex].direction === -1) this.ants[antIndex].direction = 3;

          this.langAntField[this.ants[antIndex].posY][this.ants[antIndex].posX] = 0;
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
      }
    }

    // Update dom
    this.langAntField.forEach(function(entry, rowIndex) {
      entry.forEach(function(cellValue, cellIndex) {
        let currentCellInDOMId = 'r' + rowIndex + 'c' + cellIndex;
        if (document.getElementById(currentCellInDOMId)) {
          let currentCellInDOM = document.getElementById(currentCellInDOMId);
          currentCellInDOM.classList.remove('ant'); // Every ant change its position
          if (cellValue === 0 && currentCellInDOM.classList.contains('s1')) {
            currentCellInDOM.classList.remove('s1');
            currentCellInDOM.classList.add('s0');
          }

          if (cellValue === 1 && currentCellInDOM.classList.contains('s0')) {
            currentCellInDOM.classList.remove('s0');
            currentCellInDOM.classList.add('s1');
          }
        }
      });
    });
    this.ants.forEach(function(ant) {
      let cellWithAntId = 'r' + ant.posY + 'c' + ant.posX;
      if (document.getElementById(cellWithAntId))
        document.getElementById(cellWithAntId).classList.add('ant');
    });
  },
  setCellWidth: function() {
    let cellWidth = document.getElementById(this.options.containerElemId).getElementsByTagName('td')[0].offsetWidth;
    let style = document.createElement('style');
    style.id = 'jslangtonsant-style';
    style.type = 'text/css';
    style.innerHTML = '.jslangtonsant-table td { height: ' + cellWidth + 'px; }';
    document.getElementsByTagName('head')[0].appendChild(style);
  },
  init: function() {
    let self = this;
    this.paused = false;

    this.populateField(function() {
      self.setCellWidth();
    });
    this.addAnts();

    setInterval(function() {
      if (!self.paused)
        self.runAcycle();
    }, this.options.timeInterval);

    window.onresize = function(event) {
    };
  },
  pause: function() {
    this.paused = !this.paused;
  }
};
