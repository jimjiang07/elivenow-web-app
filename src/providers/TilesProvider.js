import React, { useContext, useState, useCallback, useRef } from 'react';

import getLocalUserContext from '../context/getLocalUserContext';
import getChimeContext from '../context/getChimeContext';
import getTilesContext from '../context/getTilesContext';
import { MAX_REMOTE_VIDEOS, USER_ROLES } from '../constants';

const isTeacherTitle = (externalUserId) =>
  externalUserId && externalUserId.includes(USER_ROLES.TEACHER);

export default function TilesProvider(props) {
  const { children } = props;
  const TilesContext = getTilesContext();
  const chime = useContext(getChimeContext());
  const { localUserRole } = useContext(getLocalUserContext());
  const [studentIndices, setstudentIndices] = useState({});
  const [videoElements, setVideoElements] = useState([]);

  const [teacherIndice, setTeacherIndice] = useState();

  const teacherVideoElement = useRef(null);

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

  const observer = {
    videoTileDidUpdate: (tileState) => {
      console.log('videoTileDidUpdate', tileState);
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
        console.log('teacherVideoElement', teacherVideoElement.current);
        chime.audioVideo.bindVideoElement(
          tileState.tileId,
          teacherVideoElement.current,
        );
        setTeacherIndice(tileState.tileId);
        return;
      }

      const index = acquireVideoTile(tileState);

      if (index < 0) {
        console.log('acquireVideoTile: index < 0', );
        return;
      }

      if (videoElements[index]){
        chime.audioVideo.bindVideoElement(
          tileState.tileId,
          videoElements[index],
        );
        console.log('bindVideoElement', tileState.tileId, index);
      }
    },
    videoTileWasRemoved: (tileId) => {
      releaseStudentVideoIndex(tileId);
      releaseTeacherVideo(tileId);
    },
  };

  const setStudentVideoElement = ({ index, element }) => {
    videoElements[index] = element;
    setVideoElements({
      ...videoElements,
    });
  };

  const setTeacherVideoElement = (element) => {
    teacherVideoElement.current = element;
  };

  const observeTiles = () => {
    if (chime && chime.audioVideo) {
      console.log('chime.audioVideo.addObserver', observer);
      chime.audioVideo.addObserver(observer);
    } else {
      console.log('chime or chime.audioVideo is undefined', chime, chime.audioVideo);
    }
  };

  const resetObserver = () => {
    if (chime && chime.audioVideo) {
      console.log('resetObserver');
      chime.audioVideo.removeObserver(observer);
    }
  };

  return (
    <TilesContext.Provider
      value={{
        studentIndices,
        teacherIndice,
        setStudentVideoElement,
        setTeacherVideoElement,
        observeTiles,
        resetObserver,
      }}
    >
      {children}
    </TilesContext.Provider>
  );
}
