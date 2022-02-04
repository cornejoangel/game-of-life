import React from 'react';
import PropTypes from 'prop-types';
import { MdPause } from 'react-icons/md';

const StopButton = (props) => {
  const { stopGame } = props;
  let stop = '';
  stop = (
    <button type="button" className="stop" onClick={() => stopGame()}>
      <MdPause className="pause-svg" />
    </button>
  );
  return stop;
};

StopButton.propTypes = {
  stopGame: PropTypes.func,
};

export default StopButton;
