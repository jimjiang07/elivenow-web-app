import React from 'react';
import ClassroomBase from '../components/Classroom/ClassroomBase';

export default {
  title: 'ClassroomBase',
  component: ClassroomBase,
  excludeStories: /.*Data$/,
};

export const StudentView = () => <ClassroomBase localUserRole='student'/>
export const TeacherView = () => <ClassroomBase localUserRole='teacher'/>