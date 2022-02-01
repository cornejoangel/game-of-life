import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Tile.scss';

const Tile = (props) => {
  const { x, y, on, toggleDrawing, toggle } = props;

  let tile = '';
  tile = (
    <button
      type="button"
      className={`tile ${on ? 'on' : 'off'}`}
      onMouseDown={(e) => toggleDrawing(e, on)}
      onMouseOver={(e) => toggle(e, x, y)}
      onMouseUp={(e) => toggleDrawing(e, on)}
      onFocus={(e) => toggle(e, x, y)}
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
  toggle: PropTypes.func,
};

export default Tile;
