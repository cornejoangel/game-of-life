import Tile from './components/Tile';
import Grid from './components/Grid';
import './styles/normalize.css';

const App = () => {
  const tiles = [
    { x: 0, y: 0 },
    { x: 1, y: 0 },
  ];
  const tile = <Tile x={1} y={1} />;
  const grid = <Grid tileSet={tiles} />;

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
