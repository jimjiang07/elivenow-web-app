import React from 'react';
import MicrophoneButton from '../../components/Classroom/Controls/MicrophoneButton';

export default {
  title: 'MicrophoneButton',
  component: MicrophoneButton,
  excludeStories: /.*Data$/,
};

export const Enabled = () => <MicrophoneButton enabled={true} onClick={() => {}}/>;
export const Disabled = () => <MicrophoneButton enabled={false} onClick={() => {}}/>;