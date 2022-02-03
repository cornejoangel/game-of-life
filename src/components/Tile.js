import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Tile.scss';

const Tile = (props) => {
  const { x, y, on, toggleDrawing, toggleCheck } = props;

  let tile = '';
  tile = (
    <button
      type="button"
      className={`tile ${on ? 'on' : 'off'}`}
      onMouseDown={() => toggleDrawing(on, true)}
      onMouseOver={() => toggleCheck(x, y)}
      onMouseUp={() => toggleDrawing(on, false)}
      onFocus={() => toggleCheck(x, y)}
    >
      {x},{y}
    </button>
  );

  return tile;
};

Tile.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  on: PropTypes.bool,
  toggleDrawing: PropTypes.func,
  toggleCheck: PropTypes.func,
};

export default Tile;
