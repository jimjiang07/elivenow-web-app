import React, { useContext, useEffect, useCallback, useState } from 'react';
import getChimeContext from '../../../context/getChimeContext';
import VideoTile from '../../VideoTile';
import { MAX_REMOTE_VIDEOS, USER_ROLES } from '../../../constants';

const STUDENT_TILES_LAYOUT = {
  GRID: 'grid',
  VERTICAL_LEFT: 'vertical_left',
};

export default function RemoteVideoGroup({ localUserRole }) {
  const chime = useContext(getChimeContext());
  const [visibleIndices, setVisibleIndices] = useState({});
  const [teacherIndice, setTeacherIndice] = useState();

  const videoElements = [];
  let teacherTileElement = null;

  const numberOfStudentTile =
    localUserRole === USER_ROLES.STUDENT
      ? MAX_REMOTE_VIDEOS - 1
      : MAX_REMOTE_VIDEOS;
  const tiles = new Array(numberOfStudentTile).fill(undefined);

  const acquireVideoTile = (tileId) => {
    const existingIndex = tiles.findIndex((item) => item === tileId);

    if (existingIndex >= 0) {
      return existingIndex;
    }

    const index = tiles.findIndex((item) => item === undefined);

    if (index >= 0) {
      tiles[index] = tileId;
    }

    return index;
  };

  const releaseStudentVideoIndex = (tileId) => {
    const index = tiles.findIndex((item) => item === tileId);

    if (index) {
      tiles[index] = undefined;
      setVisibleIndices((previousVisibleIndices) => ({
        ...previousVisibleIndices,
        [index]: null,
      }));
    }

    return undefined;
  };

  const releaseTeacherVideo = (tileId) => {
    setTeacherIndice((prev) => {
      if (prev === tileId) {
        return undefined;
      }
      return prev;
    });
  };

  const isTeacherTitle = (externalUserId) =>
    externalUserId && externalUserId.includes(USER_ROLES.TEACHER);

  useEffect(() => {
    if (!chime) {
      return;
    }

    chime.audioVideo.addObserver({
      videoTileDidUpdate: (tileState) => {
        if (
          !tileState.boundAttendeeId ||
          tileState.localTile ||
          tileState.isContent ||
          !tileState.tileId
        ) {
          return;
        }
        const isTeacher = isTeacherTitle(tileState.boundExternalUserId);

        if (isTeacher) {
          chime.audioVideo.bindVideoElement(
            tileState.tileId,
            teacherTileElement
          );

          setTeacherIndice(tileState.tileId);
          return;
        }

        const index = acquireVideoTile(tileState.tileId);

        if (index < 0) {
          return;
        }

        chime.audioVideo.bindVideoElement(
          tileState.tileId,
          videoElements[index]
        );

        setVisibleIndices((previousVisibleIndices) => ({
          ...previousVisibleIndices,
          [index]: {
            attendeeId: tileState.boundAttendeeId,
            externalUserId: tileState.boundExternalUserId,
          },
        }));
      },
      videoTileWasRemoved: (tileId) => {
        releaseTeacherVideo(tileId);
        releaseStudentVideoIndex(tileId);
      },
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    chime,
  ]);

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
          [index]
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
        teacherTileElement = element;
      }
    }, []);

    return (
      <div className="remote-video-group__student-view">
        {renderStudentTiles(STUDENT_TILES_LAYOUT.VERTICAL_LEFT)}
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
