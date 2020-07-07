import React from 'react';
import ExitButton from '../../components/Classroom/Controls/ExitButton';

export default {
  title: 'ExitButton',
  component: ExitButton,
  excludeStories: /.*Data$/,
};

export const Enabled = () => <ExitButton enabled={true} onClick={() => {}}/>;
export const Disabled = () => <ExitButton enabled={false} onClick={() => {}}/>;