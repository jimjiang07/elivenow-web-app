import React from 'react';
import { BaseButton } from '../../components/Buttons';

export default {
  title: 'BaseButton',
  component: BaseButton,
  excludeStories: /.*Data$/,
};

export const Enabled = () => <BaseButton enabled={true} onClick={() => {}}>Log In</BaseButton>;
export const Disabled = () => <BaseButton enabled={false} onClick={() => {}}>Log In</BaseButton>;