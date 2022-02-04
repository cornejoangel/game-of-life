/*
  Deprecated!
  Replaced with PlayPauseButton.
  Why? Had a flicker issue when:
    Play and Pause buttons had a hover style that changed their color
    combined with a .2s transition
    Play and Pause buttons swapped out for each other when clicked
  What happened:
    Naturally a button must be hovered when it is clicked, so it will have a different color at that time
    Then it switches to the opposite button (don't want play button if it is playing)
    The new button is rendered with its original color and then transitions to the hover color
    This causes an unpleasant flicker effect
*/
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
