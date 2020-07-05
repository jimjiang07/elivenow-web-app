import React, { useContext, useEffect, useCallback, useState, useRef } from 'react';
import classNames from 'classnames'
import getChimeContext from '../../../context/getChimeContext';
import { MAX_REMOTE_VIDEOS, USER_ROLES } from '../../../constants'
import './RemoteVideoGroup.css';

export default function RemoteVideoGroup({ localUserRole }) {
  const chime = useContext(getChimeContext());
  const [visibleIndices, setVisibleIndices] = useState({});
  const [teacherIndice, setTeacherIndice] = useState();

  const videoElements = [];
  let teacherTileElement = null;

  const numberOfStudentTile = localUserRole === USER_ROLES.STUDENT ? MAX_REMOTE_VIDEOS - 1 : MAX_REMOTE_VIDEOS;
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

    return index
  }

  const releaseStudentVideoIndex = (tileId) => {
    const index = tiles.findIndex((item) => item === tileId);

    if (index) {
      tiles[index] = undefined;
      setVisibleIndices(previousVisibleIndices => ({
        ...previousVisibleIndices,
        [index]: null
      }));
    }

    return undefined;
  }

  const releaseTeacherVideo = (tileId) => {
    setTeacherIndice((prev) => {
      if(prev === tileId) {
        return undefined;
      }
      return prev;
    });
  }

  const isTeacherTitle = (externalUserId) => externalUserId && externalUserId.includes(USER_ROLES.TEACHER);

  useEffect(() => {
    if (!chime) {
      return;
    }

    chime.audioVideo.addObserver({
      videoTileDidUpdate: (tileState)=> {
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
            teacherTileElement,
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
          videoElements[index],
        );

        setVisibleIndices(previousVisibleIndices => ({
          ...previousVisibleIndices,
          [index]: {
            boundAttendeeId: tileState.boundAttendeeId,
            boundExternalUserId: tileState.boundExternalUserId
          }
        }));
      },
      videoTileWasRemoved: (tileId) => {
        releaseTeacherVideo(tileId);
        releaseStudentVideoIndex(tileId);
      }
    });
  }, [chime]);

  const renderStudentTiles = () => (
    <div className='remote-video-group__students'>
      {Array.from(Array(numberOfStudentTile).keys()).map((key, index) => {
        const visibleIndex = visibleIndices[index];

        const remoteVideoTileClassName = classNames('remote-video-group__student-tile', {
          'hidden': !visibleIndex,
        })

        // eslint-disable-next-line react-hooks/rules-of-hooks
        const getElementRef = useCallback(
          (element) => {
            if (element) {
              videoElements[index] = element;
            }
          },
          [],
        )
        return (
          <div className={remoteVideoTileClassName} key={key}>
            <video
              className='remote-video-group__video'
              muted
              ref={getElementRef}
            />
          </div>
        );
      })}
    </div>
  )

  const teacherLayout = () => (
    <div className='remote-video-group__teacher-view'>
      {renderStudentTiles()}
    </div>
  );

  const studentLayout = () => {
    const teacherVideoClassName = classNames('remote-video-group__video', {
      'hidden': !teacherIndice,
    })

    const teacherPlaceHolderClassName = classNames('remote-video-group__teacher-tile-video-place-holder', {
      'hidden': teacherIndice,
    })

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const getTeacherElementRef = useCallback(
      (element) => {
        if (element) {
          teacherTileElement = element;
        }
      },
      [],
    )

    return (
      <div className='remote-video-group__student-view'>
        <div className='remote-video-group__teacher-tile'>
          <video
            className={teacherVideoClassName}
            muted
            ref={getTeacherElementRef}
          />
          <div className={teacherPlaceHolderClassName}>Teacher is not in the room.</div>
        </div>
        {renderStudentTiles()}
      </div>
    )
  };

  return (
    <>
      {localUserRole === USER_ROLES.STUDENT && studentLayout()}
      {localUserRole === USER_ROLES.TEACHER && teacherLayout()}
    </>
  );
}
