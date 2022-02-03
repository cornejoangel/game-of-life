import React from 'react';
import PropTypes from 'prop-types';

const StepButton = (props) => {
  const { gameOfLife, maxX, maxY, singleStep, playing } = props;
  let step = '';
  step = (
    <button
      type="button"
      className="step"
      disabled={!!playing}
      onClick={() => gameOfLife(maxX, maxY, singleStep)}
    >
      +1
    </button>
  );

  return step;
};

StepButton.propTypes = {
  gameOfLife: PropTypes.func,
  maxX: PropTypes.number,
  maxY: PropTypes.number,
  singleStep: PropTypes.bool,
};

export default StepButton;
