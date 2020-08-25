import { useContext, useEffect, useCallback, useState } from 'react';

import getChimeContext from '../context/getChimeContext';
import { MAX_REMOTE_VIDEOS, USER_ROLES } from '../constants';

const isTeacherTitle = (externalUserId) =>
  externalUserId && externalUserId.includes(USER_ROLES.TEACHER);

export const useTeacherTile = ({ teacherVideoElement }) => {
  const chime = useContext(getChimeContext());
  const [teacherIndice, setTeacherIndice] = useState();

  const releaseTeacherVideo = (tileId) => {
    setTeacherIndice((prev) => {
      if (prev === tileId) {
        return undefined;
      }
      return prev;
    });
  };

  useEffect(() => {
    if (!chime || !chime.audioVideo) {
      return;
    }

    chime.audioVideo.addObserver({
      videoTileDidUpdate: (tileState) => {
        if (
          !teacherVideoElement.current &&
          (!tileState.boundAttendeeId ||
            tileState.localTile ||
            tileState.isContent ||
            !tileState.tileId)
        ) {
          return;
        }
        const isTeacher = isTeacherTitle(tileState.boundExternalUserId);

        if (isTeacher) {
          chime.audioVideo.bindVideoElement(
            tileState.tileId,
            teacherVideoElement.current,
          );
          setTeacherIndice(tileState.tileId);
          return;
        }
      },
      videoTileWasRemoved: (tileId) => {
        releaseTeacherVideo(tileId);
      },
    });
  }, [chime, teacherVideoElement]);

  return {
    teacherIndice,
  };
};

export const useStudentsTiles = ({ localUserRole, videoElements }) => {
  const chime = useContext(getChimeContext());
  const [visibleIndices, setVisibleIndices] = useState({});

  const numberOfStudentTile =
    localUserRole === USER_ROLES.STUDENT
      ? MAX_REMOTE_VIDEOS - 1
      : MAX_REMOTE_VIDEOS;

  const tiles = new Array(numberOfStudentTile).fill(undefined);

  const acquireVideoTile = useCallback(
    (tileId) => {
      const existingIndex = tiles.findIndex((item) => item === tileId);

      if (existingIndex >= 0) {
        return existingIndex;
      }

      const index = tiles.findIndex((item) => item === undefined);

      if (index >= 0) {
        tiles[index] = tileId;
      }

      return index;
    },
    [tiles],
  );

  const releaseStudentVideoIndex = useCallback((tileId) => {
    const index = tiles.findIndex((item) => item === tileId);

    if (index !== -1) {
      delete tiles[index];
      setVisibleIndices((previousVisibleIndices) => ({
        ...previousVisibleIndices,
        [index]: null,
      }));
    }

    return undefined;
  }, [tiles]);

  useEffect(() => {
    if (!chime || !chime.audioVideo) {
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
          return;
        }

        const index = acquireVideoTile(tileState.tileId);

        if (index < 0) {
          return;
        }

        videoElements[index] &&
          chime.audioVideo.bindVideoElement(
            tileState.tileId,
            videoElements[index],
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
        releaseStudentVideoIndex(tileId);
      },
    });
  }, [acquireVideoTile, chime, releaseStudentVideoIndex, videoElements]);

  return {
    numberOfStudentTile,
    visibleIndices,
  };
};
