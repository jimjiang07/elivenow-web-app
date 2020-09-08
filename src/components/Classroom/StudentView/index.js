import React, { useCallback, useContext } from 'react';
import getTilesContext from '../../../context/getTilesContext';
import VideoTile from '../../VideoTile';

export default function StudentView() {
  const { setTeacherVideoElement, teacherIndice } = useContext(
    getTilesContext(),
  );

  const getElementRef = useCallback((element) => {
    if (element) {
      console.log('setTeacherVideoElement', element);
      setTeacherVideoElement(element);

      console.log();
    }
  }, [setTeacherVideoElement]);

  return (
    <div className="classroom__student-view">
      <VideoTile getVideoElementRef={getElementRef} tileInfo={teacherIndice} />
    </div>
  );
}
