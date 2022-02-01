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

  const toggle = (e, x, y) => {
    const tempTiles = tiles.map((t) => {
      if (t.x === x && t.y === y) {
        t.on = !t.on;
      }
      return t;
    });
    setTiles(tempTiles);
  };

  const tile = <Tile x={1} y={1} toggle={toggle} />;
  const grid = <Grid tileSet={tiles} toggle={toggle} />;

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
