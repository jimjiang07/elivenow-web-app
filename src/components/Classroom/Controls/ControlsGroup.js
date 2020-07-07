import React from 'react';
import PropTypes from 'prop-types';
import MicrophoneButton from './MicrophoneButton';
import VideoButton from './VideoButton';
import ExitButton from './ExitButton';

import './ControlsGroup.css';

const ControlsGroup = ({ microphoneControl, videoControl, exitControl }) => {
  return (
    <div className='ControlGroup'>
      <MicrophoneButton {...microphoneControl}/>
      <VideoButton {...videoControl}/>
      <ExitButton {...exitControl}/>
    </div>
  )
}

const controlType = PropTypes.shape({
  enabled: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
})

ControlsGroup.propTypes = {
  micrphoneControl: controlType.isRequired,
  videoControl: controlType,
  exitControl: controlType,
}

export default ControlsGroup
