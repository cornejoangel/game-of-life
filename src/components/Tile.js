import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Tile.scss';

const Tile = (props) => {
  const { x, y, on, toggle } = props;

  let tile = '';
  tile = (
    <button
      type="button"
      className={`tile ${on ? 'on' : 'off'}`}
      onClick={(e) => toggle(e, on)}
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
  toggle: PropTypes.func,
};

export default Tile;
