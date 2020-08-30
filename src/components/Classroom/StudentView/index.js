import React, { useCallback, useContext } from 'react';
import getTilesContext from '../../../context/getTilesContext';
import VideoTile from '../../VideoTile';

export default function StudentView() {
  const { setTeacherVideoElement, teacherIndice } = useContext(
    getTilesContext(),
  );
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const getElementRef = useCallback(
    (element) => {
      if (element) {
        console.log('setTeacherVideoElement');
        setTeacherVideoElement(element);
      }
    },
    [setTeacherVideoElement],
  );

  return (
    <div className="classroom__student-view">
      <VideoTile getVideoElementRef={getElementRef} tileInfo={teacherIndice} />
    </div>
  );
}
