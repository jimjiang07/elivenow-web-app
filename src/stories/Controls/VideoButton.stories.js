import React from 'react';
import VideoButton from '../../components/Classroom/Controls/VideoButton';

export default {
  title: 'VideoButton',
  component: VideoButton,
  excludeStories: /.*Data$/,
};

export const Enabled = () => <VideoButton enabled={true} onClick={() => {}}/>;
export const Disabled = () => <VideoButton enabled={false} onClick={() => {}}/>;