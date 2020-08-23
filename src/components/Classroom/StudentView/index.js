import React, { useRef } from 'react';
import { useTeacherTile } from '../../../hooks/useVideoTiles';
import VideoTile from '../../VideoTile';

export default function StudentView() {
  const teacherVideoElement = useRef(null);

  const { teacherIndice } = useTeacherTile({
    teacherVideoElement: teacherVideoElement,
  });

  return (
    <div className="classroom__student-view">
      <VideoTile
        getVideoElementRef={teacherVideoElement}
        tileInfo={teacherIndice}
      />
    </div>
  );
}
