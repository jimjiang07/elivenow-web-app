import React from 'react';
import ControlsGroup from '../../components/Classroom/Controls/ControlsGroup';

export default {
  title: 'ControlsGroup',
  component: ControlsGroup,
  excludeStories: /.*Data$/,
};

const DefaultData = {
  microphoneControl: {
    isOn: true,
    banned: false,
    onClick: () => {},
  },
  videoControl: {
    isOn: true,
    onClick: () => {},
  },
  exitControl: {
    isOn: false,
    onClick: () => {},
  },
}

export const Default = () => <ControlsGroup {...DefaultData}/>;
export const MicrphoneIsOff = () => <ControlsGroup {...DefaultData} microphoneControl={{ isOn: false, onClick: () => {} }}/>;
export const VideoIsOff = () => <ControlsGroup {...DefaultData} videoControl={{ isOn: false, onClick: () => {} }}/>;
export const FocusIsOff = () => <ControlsGroup {...DefaultData} focusControl={{ isOn: false, onClick: () => {} }}/>;
export const FocusIsOn = () => <ControlsGroup {...DefaultData} focusControl={{ isOn: true, onClick: () => {} }}/>;
