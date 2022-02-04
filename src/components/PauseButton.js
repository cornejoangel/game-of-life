import React from 'react';
import PropTypes from 'prop-types';
import { MdPause } from 'react-icons/md';

const PauseButton = (props) => {
  const { pauseGame } = props;
  let pause = '';
  pause = (
    <button type="button" className="pause" onClick={() => pauseGame()}>
      <MdPause className="pause-svg" />
    </button>
  );
  return pause;
};

PauseButton.propTypes = {
  pauseGame: PropTypes.func,
};

export default PauseButton;
