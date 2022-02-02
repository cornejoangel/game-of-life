import React from 'react';
import PropTypes from 'prop-types';

const StepButton = (props) => {
  const { gameOfLife, maxX, maxY, singleStep } = props;
  let step = '';
  step = (
    <button
      type="button"
      className="step"
      onClick={() => gameOfLife(maxX, maxY, singleStep)}
    >
      Step
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
