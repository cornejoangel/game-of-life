import React from 'react';
import PropTypes from 'prop-types';
import { MdOutlinePlayArrow, MdPlayArrow, MdPause } from 'react-icons/md';

const PlayPauseButton = (props) => {
  const { playing, pauseGame, gameOfLife, maxX, maxY, singleStep } = props;
  return (
    <button
      type="button"
      className={`${playing ? 'pause' : 'play'}`}
      onClick={
        playing ? () => pauseGame() : () => gameOfLife(maxX, maxY, singleStep)
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
  pauseGame: PropTypes.func,
  gameOfLife: PropTypes.func,
  maxX: PropTypes.number,
  maxY: PropTypes.number,
  singleStep: PropTypes.bool,
};

export default PlayPauseButton;
