import React from 'react';
import PropTypes from 'prop-types';

const StopButton = (props) => {
  const { stopGame } = props;
  let stop = '';
  stop = (
    <button type="button" className="stop" onClick={() => stopGame()}>
      Stop
    </button>
  );
  return stop;
};

StopButton.propTypes = {
  stopGame: PropTypes.func,
};

export default StopButton;
