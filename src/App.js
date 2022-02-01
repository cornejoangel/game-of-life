import { React, useState } from 'react';
import Tile from './components/Tile';
import Grid from './components/Grid';
import './styles/normalize.css';

const App = () => {
  const xLimit = 10;
  const yLimit = 10;
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

  const toggle = (e, x, y) => {
    const tempTiles = tiles.map((t) => {
      if (t.x === x && t.y === y && drawing) {
        t.on = true;
      } else if (t.x === x && t.y === y && erasing) {
        t.on = false;
      }
      return t;
    });
    setTiles(tempTiles);
  };

  const getNeighbors = (x, y, maxX, maxY) => {
    const neighbors = [];
    for (let dx = -1; dx < 2; dx += 1) {
      for (let dy = -1; dy < 2; dy += 1) {
        const newX = x + dx;
        const newY = y + dy;
        if (
          dx !== dy &&
          dx !== 0 &&
          newX >= 0 &&
          newX < maxX &&
          newY >= 0 &&
          newY < maxY
        ) {
          neighbors.push({ x: newX, y: newY });
        }
      }
    }

    return neighbors;
  };

  const tile = <Tile x={1} y={1} toggle={toggle} />;
  const grid = (
    <Grid tileSet={tiles} toggleDrawing={toggleDrawing} toggle={toggle} />
  );

  let page = '';
  page = (
    <div>
      <p>here is a tile</p>
      {tile}
      <p>here is a grid</p>
      {grid}
    </div>
  );

  return page;
};

export default App;
