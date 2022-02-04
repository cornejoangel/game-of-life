import { React, useState, useRef } from 'react';
import SetupTiles from './modules/SetupTIles';
import Grid from './components/Grid';
import StepButton from './components/StepButton';
import ResetButton from './components/ResetButton';
import PlayPauseButton from './components/PlayPauseButton';
import './styles/normalize.css';
import './styles/App.scss';

const App = () => {
  const xLimit = 20;
  const yLimit = 20;
  const [tiles, setTiles] = useState(SetupTiles(xLimit, yLimit));
  const [drawing, setDrawing] = useState(false);
  const [erasing, setErasing] = useState(false);
  const [timeOutID, setTimeOutID] = useState('');
  const [generation, setGeneration] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);
  const speedRef = useRef();
  speedRef.current = speed;

  /*
    Parameters: 
      a coordinate pair as two values 
      an on status
    Finds the associated tile and changes its on status to the provided one
    Updates state of the tile array
  */
  const toggleTile = (x, y, on) => {
    const tempTiles = tiles.map((t) => {
      if (t.x === x && t.y === y) {
        t.on = on;
      }
      return t;
    });
    setTiles(tempTiles);
  };

  /*
    Parameters:
      the on status of the tile being targeted
      boolean representing whether we are turning on or off
    Turns off drawing and erasing, unless second parameter is true, 
    in which case it turns on the appropriate state
    Also toggles the specific tile
  */
  const toggleDrawing = (status, startDrawing, x, y) => {
    let nowDrawing = false;
    let nowErasing = false;
    let tileX = null;
    let tileY = null;
    if (x && y) {
      tileX = x;
      tileY = y;
    }
    if (!status && startDrawing) {
      // the tile was off so now we are turning tiles on
      nowDrawing = true;
    } else if (status && startDrawing) {
      // the tile was on so now we are turning tiles off
      nowErasing = true;
    }
    toggleTile(tileX, tileY, !status);
    setDrawing(nowDrawing);
    setErasing(nowErasing);
  };

  /*
    Parameter:
      a coordinate pair as two values
    Requests that the associated tile be toggled on or off depending on whether we are drawing or erasing

    Used as handler for mouseOver events to only toggle when mouse has also been pressed and we are drawing or erasing depending on context
  */
  const toggleCheck = (x, y) => {
    if (drawing) {
      toggleTile(x, y, true);
    } else if (erasing) {
      toggleTile(x, y, false);
    }
  };

  /*
    Parameters: 
      a coordinate pair as two values
      the dimensions of the grid as two values
    Finds every adjacent tile to the one that matches the coordinates
    Returns an array containing all of the neighbor tiles.
  */
  const getNeighbors = (x, y, maxX, maxY) => {
    const neighbors = [];
    const neighborRefs = [];

    // this loop finds the valid neighbor coordinates
    for (let dx = -1; dx < 2; dx += 1) {
      for (let dy = -1; dy < 2; dy += 1) {
        // eslint-disable-next-line no-continue
        if (dx === dy && dx === 0) continue;
        const newX = x + dx;
        const newY = y + dy;
        if (newX >= 0 && newX < maxX && newY >= 0 && newY < maxY) {
          neighborRefs.push({ x: newX, y: newY });
        }
      }
    }

    // this loop retrieves the actual tile objects for each neighbor
    for (let i = 0; i < neighborRefs.length; i += 1) {
      for (let j = 0; j < tiles.length; j += 1) {
        if (
          tiles[j].x === neighborRefs[i].x &&
          tiles[j].y === neighborRefs[i].y
        ) {
          neighbors.push(tiles[j]);
        }
      }
    }
    return neighbors;
  };

  /*
    Parameters:
      The dimensions of the grid as two values
      Whether we will run for a single step or indefinitely
    Iterates through every tile
      For each tile, we look at all of its neighbors and see how many are on
      If a tile is on and has less than 2 or more than 3 on neighbors we add it to an array of tiles to change
      if a tile is off and it has exactly 3 on neighbors we add it to the array of tiles to change
    Iterates through list of tiles to change
      toggles each one
    Updates state of tile array
    Increments the generation state
    If this is being run as a single step, returns here
    Calls itself recursively with a setTimeout delay
    Updates the TimeOutID state so this can be stopped later
  */
  const gameOfLife = (maxX, maxY, singleStep) => {
    let stillPlaying = true;
    const newTiles = [];
    const tilesToChange = [];
    let neighbors = [];
    let current = '';
    let onNeighbors = 0;

    for (let i = 0; i < tiles.length; i += 1) {
      current = tiles[i];
      neighbors = getNeighbors(current.x, current.y, maxX, maxY);
      onNeighbors = neighbors.reduce((total, neighbor) => {
        if (neighbor.on) {
          return total + 1;
        }
        return total;
      }, 0);

      if (current.on && (onNeighbors < 2 || onNeighbors > 3)) {
        tilesToChange.push(current);
      } else if (onNeighbors === 3) {
        tilesToChange.push(current);
      }
    }
    while (tilesToChange.length > 0) {
      current = tilesToChange.pop();
      toggleTile(current.x, current.y, !current.on);
    }

    for (let i = 0; i < tiles.length; i += 1) {
      newTiles.push(tiles[i]);
    }
    setTiles(newTiles);
    setGeneration((prevGen) => prevGen + 1);

    if (singleStep) {
      stillPlaying = false;
      console.log('now false!');
      return;
    }
    setPlaying(stillPlaying);

    const newTimeOut = setTimeout(() => {
      gameOfLife(maxX, maxY, false);
    }, speedRef.current);
    setTimeOutID(newTimeOut);
  };

  const pauseGame = () => {
    setPlaying(false);
    clearTimeout(timeOutID);
  };

  /*
    Stops the game and resets all state
  */
  const resetGame = () => {
    pauseGame();
    setDrawing(false);
    setErasing(false);
    setTimeOutID('');
    setGeneration(0);
    setSpeed(500);
    setTiles(SetupTiles(xLimit, yLimit));
  };

  const updateSpeed = (value) => {
    setSpeed(value);
  };

  const grid = (
    <Grid
      tileSet={tiles}
      toggleDrawing={toggleDrawing}
      toggleCheck={toggleCheck}
    />
  );

  const step = (
    <StepButton
      gameOfLife={gameOfLife}
      maxX={xLimit}
      maxY={yLimit}
      playing={playing}
      singleStep
    />
  );

  const reset = <ResetButton resetGame={resetGame} />;

  const speedInput = (
    <input
      type="range"
      id="speed"
      name="speed"
      min="100"
      max="1000"
      value={speed}
      step="100"
      onChange={(e) => updateSpeed(e.target.valueAsNumber)}
    />
  );

  const playPause = (
    <PlayPauseButton
      playing={playing}
      pauseGame={pauseGame}
      gameOfLife={gameOfLife}
      maxX={xLimit}
      maxY={yLimit}
      singleStep={false}
    />
  );

  let page = '';
  page = (
    <main>
      <menu>
        <li>{step}</li>
        <li>{playPause}</li>
        <li>{reset}</li>
        <li>{speedInput}</li>
        <li>{speed / 1000}s / generation</li>
        <li>{generation}</li>
      </menu>
      {grid}
    </main>
  );

  return page;
};

export default App;
