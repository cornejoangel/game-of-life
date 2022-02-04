import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlinePlayArrow, MdPlayArrow, MdPause } from 'react-icons/md';

const PlayPauseButton = (props) => {
  const { playing, stopGame, gameOfLife, maxX, maxY, singleStep } = props;
  return (
    <button
      type="button"
      className={`${playing ? 'stop' : 'play'}`}
      onClick={
        playing ? () => stopGame() : () => gameOfLife(maxX, maxY, singleStep)
      }
    >
      {playing ? (
        <MdPause className="pause-svg" />
      ) : (
        <MdPlayArrow className="play-svg" />
      )}
    </button>
  );
};

PlayPauseButton.propTypes = {
  playing: PropTypes.bool,
  stopGame: PropTypes.func,
  gameOfLife: PropTypes.func,
  maxX: PropTypes.number,
  maxY: PropTypes.number,
  singleStep: PropTypes.bool,
};

export default PlayPauseButton;
