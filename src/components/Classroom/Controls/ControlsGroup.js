import React from 'react';
import PropTypes from 'prop-types';
import MicrophoneButton from './MicrophoneButton';
import VideoButton from './VideoButton';
import ExitButton from './ExitButton';
import FocusButton from './FocusButton';

import './ControlsGroup.css';

const ControlsGroup = ({ microphoneControl, videoControl, exitControl, focusControl = null }) => {
  return (
    <div className='ControlGroup'>
      <MicrophoneButton {...microphoneControl}/>
      <VideoButton {...videoControl}/>
      <ExitButton {...exitControl}/>
      {focusControl && <FocusButton {...focusControl}/>}
    </div>
  )
}

const controlType = PropTypes.shape({
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
})

ControlsGroup.propTypes = {
  microphoneControl: controlType.isRequired,
  videoControl: controlType,
  exitControl: controlType,
}

export default ControlsGroup
