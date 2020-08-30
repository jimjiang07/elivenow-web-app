import React, { useContext, useState, useEffect, useCallback } from 'react';

import getMeetingContext from '../context/getMeetingContext';
import getChimeContext from '../context/getChimeContext';
import getTilesContext from '../context/getTilesContext';
import { MAX_REMOTE_VIDEOS, USER_ROLES } from '../constants';

const isTeacherTitle = (externalUserId) =>
  externalUserId && externalUserId.includes(USER_ROLES.TEACHER);

export default function TilesProvider(props) {
  const { children } = props;
  const TilesContext = getTilesContext();
  const chime = useContext(getChimeContext());
  const { localUserRole } = useContext(getMeetingContext());
  const [studentIndices, setstudentIndices] = useState({});
  const [hasObserveTiles, setHasObserveTiles] = useState(false);
  const [videoElements, setVideoElements] = useState([]);

  const [teacherIndice, setTeacherIndice] = useState();
  const [teacherVideoElement, setTeacherVideoElement] = useState();

  const numberOfStudentTile =
    localUserRole === USER_ROLES.STUDENT
      ? MAX_REMOTE_VIDEOS - 1
      : MAX_REMOTE_VIDEOS;

  const [tiles, setTiles] = useState(
    new Array(numberOfStudentTile).fill(undefined),
  );

  const acquireVideoTile = useCallback(
    (tileState) => {
      const { tileId, boundAttendeeId, boundExternalUserId } = tileState;
      const existingIndex = tiles.findIndex((item) => item === tileId);

      if (existingIndex >= 0) {
        return existingIndex;
      }

      const index = tiles.findIndex((item) => item === undefined);

      if (index >= 0) {
        tiles[index] = tileId;
        setTiles([...tiles]);

        setstudentIndices((previousstudentIndices) => ({
          ...previousstudentIndices,
          [index]: {
            attendeeId: boundAttendeeId,
            externalUserId: boundExternalUserId,
          },
        }));
      }

      return index;
    },
    [tiles],
  );

  const releaseStudentVideoIndex = useCallback(
    (tileId) => {
      const index = tiles.findIndex((item) => item === tileId);

      if (index !== -1) {
        delete tiles[index];
        setTiles([...tiles]);
        setstudentIndices((previousstudentIndices) => ({
          ...previousstudentIndices,
          [index]: null,
        }));
      }

      return undefined;
    },
    [tiles],
  );

  const releaseTeacherVideo = (tileId) => {
    setTeacherIndice((prev) => {
      if (prev === tileId) {
        return undefined;
      }
      return prev;
    });
  };


  const observeTiles = useCallback(() => {
    if (hasObserveTiles) {
      return;
    }

    console.log('observeTiles');

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
            teacherVideoElement,
          );
          setTeacherIndice(tileState.tileId);
          return;
        }

        const index = acquireVideoTile(tileState);

        if (index < 0) {
          return;
        }

        videoElements[index] &&
          chime.audioVideo.bindVideoElement(
            tileState.tileId,
            videoElements[index],
          );
      },
      videoTileWasRemoved: (tileId) => {
        releaseStudentVideoIndex(tileId);
        releaseTeacherVideo(tileId);
      },
    });

    setHasObserveTiles(true);
  }, [acquireVideoTile, chime, hasObserveTiles, releaseStudentVideoIndex, teacherVideoElement, videoElements]);

  const setStudentVideoElement = ({ index, element }) => {
    videoElements[index] = element;
    setVideoElements({
      ...videoElements,
    });
  };

  useEffect(() => {
    if (!chime || !chime.audioVideo) {
      return;
    }

    observeTiles();
  }, [chime, observeTiles]);

  return (
    <TilesContext.Provider
      value={{
        studentIndices,
        teacherIndice,
        setStudentVideoElement,
        setTeacherVideoElement,
      }}
    >
      {children}
    </TilesContext.Provider>
  );
}
