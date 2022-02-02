import React from 'react';
import PropTypes from 'prop-types';

const PlayButton = (props) => {
  const { gameOfLife, maxX, maxY } = props;
  let play = '';
  play = (
    <button
      type="button"
      className="play"
      onClick={() => gameOfLife(maxX, maxY)}
    >
      Play
    </button>
  );
  return play;
};

PlayButton.propTypes = {
  gameOfLife: PropTypes.func,
  maxX: PropTypes.number,
  maxY: PropTypes.number,
};

export default PlayButton;
