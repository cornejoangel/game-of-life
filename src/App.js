import { React, useState } from 'react';
import Tile from './components/Tile';
import Grid from './components/Grid';
import StepButton from './components/StepButton';
import PlayButton from './components/PlayButton';
import './styles/normalize.css';

const App = () => {
  const xLimit = 5;
  const yLimit = 5;
  const tileArray = [];

  for (let i = 0; i < yLimit; i += 1) {
    for (let j = 0; j < xLimit; j += 1) {
      tileArray.push({ x: j, y: i, on: false });
    }
  }
  const [tiles, setTiles] = useState(tileArray);
  const [drawing, setDrawing] = useState(false);
  const [erasing, setErasing] = useState(false);

  const toggleDrawing = (e, status, stop) => {
    let nowDrawing = false;
    let nowErasing = false;
    if (!status && !stop) {
      // the tile was off so now we are turning tiles on
      nowDrawing = true;
    } else if (status && !stop) {
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
  const toggleCheck = (e, x, y) => {
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
    </div>
  );

  return page;
};

export default App;
