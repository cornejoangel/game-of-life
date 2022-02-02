import { React, useState } from 'react';
import Tile from './components/Tile';
import Grid from './components/Grid';
import StepButton from './components/StepButton';
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
  const toggle = (e, x, y) => {
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

  const gameOfLife = (maxX, maxY) => {
    const newTiles = [];
    const cellsToChange = [];
    let neighbors = [];
    let current = '';
    let livingNeighbors = 0;
    for (let i = 0; i < tiles.length; i += 1) {
      current = tiles[i];
      neighbors = getNeighbors(current.x, current.y, maxX, maxY);
      livingNeighbors = neighbors.reduce((total, neighbor) => {
        if (neighbor.on) {
          return total + 1;
        }
        return total;
      }, 0);

      if (current.on && (livingNeighbors < 2 || livingNeighbors > 3)) {
        cellsToChange.push(current);
      } else if (livingNeighbors === 3) {
        cellsToChange.push(current);
      }
    }
    while (cellsToChange.length > 0) {
      current = cellsToChange.pop();
      toggleTile(current.x, current.y, !current.on);
    }

    for (let i = 0; i < tiles.length; i += 1) {
      newTiles.push(tiles[i]);
    }
    setTiles(newTiles);

    /*
    iterate through all of my tiles
    for each tile set current equal to it
    initialise that tile's living neighbors to be 0
    get that tile's neighbors
    for each neighbor, check if that neighbor is on
      if the neighbor is on, increment living neighbors
    if the current tile is on
      check if it needs to be turned off
        if so add it to the list of tiles to toggle
    or if the current tile has 3 living neighbors
      add it to the list of tiles to toggle

    loop through the list of tiles to toggle and toggle them all
    increment generation counter if desired
    if only doing one generation then return
    */
  };

  const tile = <Tile x={1} y={1} toggle={toggle} />;
  const grid = (
    <Grid tileSet={tiles} toggleDrawing={toggleDrawing} toggle={toggle} />
  );
  const step = (
    <StepButton gameOfLife={gameOfLife} maxX={xLimit} maxY={yLimit} />
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
    </div>
  );

  return page;
};

export default App;
