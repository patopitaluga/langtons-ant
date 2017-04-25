## JS Langton's ant game

A javascript implementation of Langton's ant game.

## Quick start

Load the **jslangtonsant.js**

```html
<script src="js/jslangtonsant.js"></script>
```

Create an element that will contain the game matrix.

```html
  <div id="langtonsAnt"></div>
```

Create an instance of JS Langton's ant game

```html
  let myLangTonGame = new LangtonsAnt(options);
```

Initiate it.

```html
  myLangTonGame.init();
```

## Customizing it

You can customize the behavior of the game with these options:

```html
let myLangTonGame = new LangtonsAnt({
  cols - number of columns in the matrix.
  rows - number of rows in the matrix.
  timeInterval - in milliseconds. Interval of time between each cycle.
  randomBlackCell - Between 0 and 100. Percentual chance of any cell to be black.
  containerElemId - The id of the container element for the table
  antsNumber - The number of ants to be generated
  stepsPerCycle - Number of steps computed for every cycle in which the render is updated.
  randomInitialPos - If true, each ant initial position is set randomly. If false, each one starts from the middle of the matrix.
  initialDirection - Between 0 and 3. 0 is top, 1 is right, 2 is down, 3 is left. -1 let it be randomly determined
  dataElementId - The id of the container element for the text output
});
```
