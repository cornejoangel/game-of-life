import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import '../styles/Grid.scss';

const Grid = (props) => {
  const { tileSet, toggleDrawing, toggle } = props;

  let grid = '';
  grid = (
    <div className="grid">
      {tileSet.map((tile) => (
        <Tile
          x={tile.x}
          y={tile.y}
          on={tile.on}
          toggleDrawing={toggleDrawing}
          toggle={toggle}
          key={`${tile.x}${tile.y}`}
        />
      ))}
    </div>
  );

  return grid;
};

Grid.propTypes = {
  tileSet: PropTypes.array,
  toggleDrawing: PropTypes.func,
  toggle: PropTypes.func,
};

export default Grid;
