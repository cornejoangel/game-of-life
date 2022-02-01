import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import '../styles/Grid.scss';

const Grid = (props) => {
  const { tileSet, toggle } = props;

  let grid = '';
  grid = (
    <div className="grid">
      {tileSet.map((tile) => (
        <Tile
          x={tile.x}
          y={tile.y}
          on={tile.on}
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
  toggle: PropTypes.func,
};

export default Grid;
