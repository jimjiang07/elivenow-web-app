import React from 'react';
import RemoteVideoGroup from '../components/Classroom/RemoteVideoGroup';

export default {
  title: 'RemoteVideoGroup',
  component: RemoteVideoGroup,
  excludeStories: /.*Data$/,
};

export const StudentView = () => <RemoteVideoGroup localUserRole='student'/>
export const TeacherView = () => <RemoteVideoGroup localUserRole='teacher'/>