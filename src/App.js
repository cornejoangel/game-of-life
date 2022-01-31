import Tile from './components/Tile';
import './styles/normalize.css';

const App = () => {
  const tile = <Tile x={1} y={1} />;

  let page = '';
  page = (
    <div>
      <p>here is a tile</p>
      {tile}
    </div>
  );

  return page;
};

export default App;
