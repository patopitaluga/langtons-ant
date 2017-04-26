## JS Langton's ant game

A javascript implementation of Langton's ant game.

**Check out the live demo:** https://patopitaluga.github.io/langtons-ant

## Quick start

Copy the files jslangtonsant.js and jslangtonsant.css to your project folder.

Load **jslangtonsant.js** in your html file.

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

You can customize its behavior with these options:

```html
let myLangTonGame = new LangtonsAnt({
  cols                 : 75,                // number of columns in the matrix.
  rows                 : 49,                // number of rows in the matrix.
  timeInterval         : 66,                // in milliseconds. Interval of time between each cycle.
  randomBlackCell      : 0,                 // Between 0 and 100. Percentual chance of any cell to be black.
  containerElemId      : 'langtonsAnt',     // The id of the container element for the table
  howManyAntsInitially : 1,                 // The number of ants to be generated
  stepsPerCycle        : 1,                 // Number of steps computed for every cycle in which the render is updated.
  randomInitialPos     : false,             // If true, each ant initial position is set randomly. If false, each one starts from the middle of the matrix.
  initialDirection     : 0,                 // Between 0 and 3. 0 is top, 1 is right, 2 is down, 3 is left. -1 to let it be randomly determined
  dataElementId        : 'langtonsAntInfo', // The id of the container element for the text output
  customStyle          : false              // Turn this true if you're using a custom css for the style.
});
```
