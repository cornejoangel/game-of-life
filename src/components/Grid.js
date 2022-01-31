import React from 'react';
import PropTypes from 'prop-types';
import Tile from './Tile';
import '../styles/Grid.scss';

const Grid = (props) => {
  const { tileSet } = props;

  let grid = '';
  grid = (
    <div className="grid">
      {tileSet.map((tile) => (
        <Tile x={tile.x} y={tile.y} key={`${tile.x}${tile.y}`} />
      ))}
    </div>
  );

  return grid;
};

Grid.propTypes = {
  tileSet: PropTypes.array,
};

export default Grid;
