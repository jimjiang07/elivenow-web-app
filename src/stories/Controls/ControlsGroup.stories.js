import React from 'react';
import ControlsGroup from '../../components/Classroom/Controls/ControlsGroup';

export default {
  title: 'ControlsGroup',
  component: ControlsGroup,
  excludeStories: /.*Data$/,
};

const DefaultData = {
  micrphoneControl: {
    enabled: true,
    onClick: () => {},
  },
  videoControl: {
    enabled: true,
    onClick: () => {},
  },
  exitControl: {
    enabled: false,
    onClick: () => {},
  },
}

export const Default = () => <ControlsGroup {...DefaultData}/>;
export const MicrphoneDisabled = () => <ControlsGroup {...DefaultData} micrphoneControl={{ enabled: false, onClick: () => {}}}/>;
export const VideoDisabled = () => <ControlsGroup {...DefaultData} videoControl={{ enabled: false, onClick: () => {}}}/>;
