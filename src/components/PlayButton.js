import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlinePlayArrow, MdPlayArrow } from 'react-icons/md';

const PlayButton = (props) => {
  const { gameOfLife, maxX, maxY, singleStep } = props;
  let play = '';
  play = (
    <button
      type="button"
      className="play"
      onClick={() => gameOfLife(maxX, maxY, singleStep)}
    >
      {/* <MdOutlinePlayArrow className="play-svg" /> */}
      <MdPlayArrow className="play-svg" />
    </button>
  );
  return play;
};

PlayButton.propTypes = {
  gameOfLife: PropTypes.func,
  maxX: PropTypes.number,
  maxY: PropTypes.number,
  singleStep: PropTypes.bool,
};

export default PlayButton;
