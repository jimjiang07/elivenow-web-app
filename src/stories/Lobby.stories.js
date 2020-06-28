import React from 'react';
import Lobby from '../components/Lobby';

export default {
  title: 'Lobby',
  component: Lobby,
  excludeStories: /.*Data$/,
};

export const Default = () => <Lobby/>;