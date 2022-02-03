import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import '../styles/Grid.scss';

const Grid = (props) => {
  const { tileSet, toggleDrawing, toggleCheck } = props;

  let grid = '';
  grid = (
    <div className="grid" onMouseLeave={() => toggleDrawing(true, false)}>
      {tileSet.map((tile) => (
        <Tile
          x={tile.x}
          y={tile.y}
          on={tile.on}
          toggleDrawing={toggleDrawing}
          toggleCheck={toggleCheck}
          key={`${tile.x},${tile.y}`}
        />
      ))}
    </div>
  );

  return grid;
};

Grid.propTypes = {
  tileSet: PropTypes.array,
  toggleDrawing: PropTypes.func,
  toggleCheck: PropTypes.func,
};

export default Grid;
