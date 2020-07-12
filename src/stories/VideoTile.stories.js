import React from 'react';
import VideoTile from '../components/VideoTile';

export default {
  title: 'VideoTile',
  component: VideoTile,
  excludeStories: /.*Data$/,
};

const hasVideo = {
  tileInfo: {
    externalUserId: '39fcbb5f-9e27-4c5a-b1b6-87fee8123c8b_Jim_teacher',
  },
  showNameTag: true,
}

export const Default = () => <VideoTile {...hasVideo}/>;