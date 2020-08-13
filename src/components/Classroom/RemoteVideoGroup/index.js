import React, { useCallback } from 'react';
import useVideoTiles from '../../../hooks/useVideoTiles';
import VideoTile from '../../VideoTile';
import { USER_ROLES } from '../../../constants';

const STUDENT_TILES_LAYOUT = {
  GRID: 'grid',
  VERTICAL_LEFT: 'vertical_left',
};

export default function RemoteVideoGroup({ localUserRole }) {
  const videoElements = [];
  const teacherTile = [];

  const { numberOfStudentTile, visibleIndices, teacherIndice } = useVideoTiles({
    localUserRole,
    videoElements,
    teacherTile,
  });

  const renderStudentTiles = (layout = STUDENT_TILES_LAYOUT.VERTICAL_LEFT) => (
    <div className={`remote-video-group__students ${layout}`}>
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
  );

  const teacherLayout = () => (
    <div className="remote-video-group__teacher-view">
      {renderStudentTiles(STUDENT_TILES_LAYOUT.GRID)}
    </div>
  );

  const studentLayout = () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const getTeacherElementRef = useCallback((element) => {
      if (element) {
        teacherTile[0] = element;
      }
    }, []);

    return (
      <div className="remote-video-group__student-view">
        <VideoTile
          getVideoElementRef={getTeacherElementRef}
          tileInfo={teacherIndice}
        />
      </div>
    );
  };

  return (
    <>
      {localUserRole === USER_ROLES.STUDENT && studentLayout()}
      {localUserRole === USER_ROLES.TEACHER && teacherLayout()}
    </>
  );
}
