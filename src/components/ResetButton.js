import React from 'react';
import PropTypes from 'prop-types';

const ResetButton = (props) => {
  const { resetGame } = props;
  let r = '';
  r = (
    <button type="button" className="reset" onClick={() => resetGame()}>
      Reset
    </button>
  );
  return r;
};

ResetButton.propTypes = {
  resetGame: PropTypes.func,
};

export default ResetButton;
