import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Tile.scss';

const Tile = (props) => {
  const { x, y } = props;

  let tile = '';
  tile = (
    <div className="tile">
      {x},{y}
    </div>
  );

  return tile;
};

Tile.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
};

export default Tile;
