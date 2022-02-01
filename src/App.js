import Tile from './components/Tile';
import Grid from './components/Grid';
import './styles/normalize.css';

const App = () => {
  const x = 10;
  const y = 10;
  const tiles = [];

  for (let i = 0; i < y; i += 1) {
    for (let j = 0; j < x; j += 1) {
      tiles.push({ x: j, y: i, on: false });
    }
  }

  const toggle = (e, status) => {
    console.log('whoah');
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
