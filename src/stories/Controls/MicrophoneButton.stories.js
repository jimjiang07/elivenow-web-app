import React from 'react';
import MicrophoneButton from '../../components/Classroom/Controls/MicrophoneButton';

export default {
  title: 'MicrophoneButton',
  component: MicrophoneButton,
  excludeStories: /.*Data$/,
};

export const on = () => <MicrophoneButton isOn onClick={() => {}}/>;
export const off = () => <MicrophoneButton onClick={() => {}}/>;
export const Disabled = () => <MicrophoneButton disabled={true} onClick={() => {}}/>;