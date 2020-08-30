import React, { useCallback, useContext } from 'react';
import getTilesContext from '../../../context/getTilesContext';
import VideoTile from '../../VideoTile';
import { MAX_REMOTE_VIDEOS } from '../../../constants';

export default function TeacherView() {
  const { studentIndices, setStudentVideoElement } = useContext(
    getTilesContext(),
  );

  return (
    <div className="remote-video-group__teacher-view">
      <div className={`remote-video-group__students grid`}>
        {Array.from(Array(MAX_REMOTE_VIDEOS).keys()).map((key, index) => {
          const visibleIndex = studentIndices[index];

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const getElementRef = useCallback(
            (element) => {
              if (element) {
                setStudentVideoElement({ index, element });
              }
            },
            [index],
          );

          return (
            <VideoTile
              key={key}
              getVideoElementRef={getElementRef}
              tileInfo={visibleIndex}
              showNameTag={true}
            />
          );
        })}
      </div>
    </div>
  );
}
