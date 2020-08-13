import { useContext, useEffect, useState } from 'react';

import getChimeContext from '../context/getChimeContext';
import { MAX_REMOTE_VIDEOS, USER_ROLES } from '../constants';

export default function useVideoTiles({ localUserRole, videoElements, teacherTile }) {
  const chime = useContext(getChimeContext());
  const [visibleIndices, setVisibleIndices] = useState({});
  const [teacherIndice, setTeacherIndice] = useState();

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
          console.log(teacherTile[0]);
          teacherTile[0] && chime.audioVideo.bindVideoElement(
            tileState.tileId,
            teacherTile[0]
          );

          setTeacherIndice(tileState.tileId);
          return;
        }

        const index = acquireVideoTile(tileState.tileId);

        if (index < 0) {
          return;
        }

        videoElements[index] && chime.audioVideo.bindVideoElement(
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

  return {
    numberOfStudentTile,
    visibleIndices,
    teacherIndice,
  };
}
