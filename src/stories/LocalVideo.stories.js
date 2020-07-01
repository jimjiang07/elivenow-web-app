import React from 'react';
import LocalVideo from '../components/Classroom/LocalVideo';

export default {
  title: 'LocalVideo',
  component: LocalVideo,
  excludeStories: /.*Data$/,
};

export const Default = () => <LocalVideo/>;