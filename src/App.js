import { React, useState } from 'react';
import SetupTiles from './modules/SetupTIles';
import Tile from './components/Tile';
import Grid from './components/Grid';
import StepButton from './components/StepButton';
import PlayButton from './components/PlayButton';
import StopButton from './components/StopButton';
import ResetButton from './components/ResetButton';
import './styles/normalize.css';

const App = () => {
  const xLimit = 20;
  const yLimit = 20;
  const [tiles, setTiles] = useState(SetupTiles(xLimit, yLimit));
  const [drawing, setDrawing] = useState(false);
  const [erasing, setErasing] = useState(false);
  const [timeOutID, setTimeOutID] = useState('');
  const [generation, setGeneration] = useState(0);

  /*
    Parameters:
      the on status of the tile being targeted
      boolean representing whether we are turning on or off
    Turns off drawing and erasing, unless second parameter is true, 
    in which case it turns on the appropriate state
  */
  const toggleDrawing = (status, startDrawing) => {
    let nowDrawing = false;
    let nowErasing = false;
    if (!status && startDrawing) {
      // the tile was off so now we are turning tiles on
      nowDrawing = true;
    } else if (status && startDrawing) {
      // the tile was on so now we are turning tiles off
      nowErasing = true;
    }
    setDrawing(nowDrawing);
    setErasing(nowErasing);
  };

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

    if (singleStep) return;

    const newTimeOut = setTimeout(() => {
      gameOfLife(maxX, maxY, false);
    }, 1000);
    setTimeOutID(newTimeOut);
  };

  const stopGame = () => {
    clearTimeout(timeOutID);
  };

  /*
    Stops the game and resets all state
  */
  const resetGame = () => {
    stopGame();
    setDrawing(false);
    setErasing(false);
    setTimeOutID('');
    setGeneration(0);
    setTiles(SetupTiles(xLimit, yLimit));
  };

  const tile = <Tile x={1} y={1} toggleCheck={toggleCheck} />;
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
      singleStep
    />
  );

  const play = (
    <PlayButton
      gameOfLife={gameOfLife}
      maxX={xLimit}
      maxY={yLimit}
      singleStep={false}
    />
  );

  const stop = <StopButton stopGame={stopGame} />;

  const reset = <ResetButton resetGame={resetGame} />;

  let page = '';
  page = (
    <div>
      <p>here is a tile</p>
      {tile}
      <p>here is a grid</p>
      {grid}
      <p>and the step button</p>
      {step}
      <p>play button</p>
      {play}
      <p>stop button</p>
      {stop}
      <p>generation counter</p>
      {generation}
      <p>reset button</p>
      {reset}
    </div>
  );

  return page;
};

export default App;
