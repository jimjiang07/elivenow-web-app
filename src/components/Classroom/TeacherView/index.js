import React, { useCallback } from 'react';
import { useStudentsTiles } from '../../../hooks/useVideoTiles';
import VideoTile from '../../VideoTile';

export default function TeacherView({ localUserRole }) {
  const videoElements = [];

  const { numberOfStudentTile, visibleIndices } = useStudentsTiles({
    localUserRole,
    videoElements,
  });

  return (
    <div className="remote-video-group__teacher-view">
      <div className={`remote-video-group__students grid`}>
        {Array.from(Array(numberOfStudentTile).keys()).map((key, index) => {
          const visibleIndex = visibleIndices[index];

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const getElementRef = useCallback(
            (element) => {
              if (element) {
                videoElements[index] = element;
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
