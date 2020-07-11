import React, { useContext, useEffect, useCallback, useState } from 'react';
import getChimeContext from '../../../context/getChimeContext';
import VideoTile from '../../VideoTile';
import { MAX_REMOTE_VIDEOS, USER_ROLES } from '../../../constants';

const STUDENT_TILES_LAYOUT = {
  GRID: 'grid',
  VERTICAL_LEFT: 'vertical_left',
}

export default function RemoteVideoGroup({ localUserRole }) {
  const chime = useContext(getChimeContext());
  const [visibleIndices, setVisibleIndices] = useState({});
  const [teacherIndice, setTeacherIndice] = useState();

  const videoElements = [];
  let teacherTileElement = null;

  const numberOfStudentTile = localUserRole === USER_ROLES.STUDENT ? MAX_REMOTE_VIDEOS - 1 : MAX_REMOTE_VIDEOS;
  const tiles = new Array(numberOfStudentTile).fill(undefined);

  const acquireTile = (externalUserId, tileId = null) => {
    const existingIndex = tiles.findIndex((item) => item && item.externalUserId === externalUserId);

    if (existingIndex >= 0) {
      tiles[existingIndex].tileId = tileId;
      return existingIndex;
    }

    const index = tiles.findIndex((item) => item === undefined);

    if (index >= 0) {
      tiles[index] = {
        externalUserId,
        tileId
      };
    }

    return index
  }

  const releaseStudentVideoIndex = useCallback(
    (tileId) => {
      const index = tiles.findIndex((item) => item && item.tileId === tileId);

      console.log('releaseStudentVideoIndex', tileId, tiles, index)

      if (index >= 0) {
        tiles[index] = undefined;

        setVisibleIndices(previousVisibleIndices => {
          const newIndice = Object.assign({}, previousVisibleIndices[index]);
          newIndice.hasVideo = false;

          return {
            ...previousVisibleIndices,
            [index]: newIndice,
          }
        });
      }

      return undefined;
    },
    [tiles],
  )

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

    // chime.audioVideo.realtimeSubscribeToAttendeeIdPresence((presentAttendeeId, present, externalUserId) => {
    //   console.log(`Attendee ID: ${presentAttendeeId} Present: ${present}`);
    //   if (present) {
    //     const index = acquireTile(externalUserId);

    //     if (index < 0) {
    //       return;
    //     }

    //     setVisibleIndices(previousVisibleIndices => ({
    //       ...previousVisibleIndices,
    //       [index]: {
    //         externalUserId,
    //         hasVideo: false,
    //       }
    //     }));
    //   } else {
    //   }
    // })

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

        const index = acquireTile(tileState.boundExternalUserId, tileState.tileId);

        console.log('Found index: ', index, tileState.boundExternalUserId, tileState.tileId);

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
            externalUserId: tileState.boundExternalUserId,
            tileId: tileState.tileId,
            hasVideo: true,
          }
        }));
      },
      videoTileWasRemoved: (tileId) => {
        releaseTeacherVideo(tileId);
        releaseStudentVideoIndex(tileId);
      }
    });


  }, [chime]);

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
          [],
        )

        return ( <VideoTile key={key} getVideoElementRef={getElementRef} tileInfo={visibleIndex} showNameTag={true}/> );
      })}
    </div>
  )

  const teacherLayout = () => (
    <div className='remote-video-group__teacher-view'>
      {renderStudentTiles(STUDENT_TILES_LAYOUT.GRID)}
    </div>
  );

  const studentLayout = () => {
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
        {renderStudentTiles(STUDENT_TILES_LAYOUT.VERTICAL_LEFT)}
        <VideoTile getVideoElementRef={getTeacherElementRef} tileInfo={{ hasVideo: !!teacherIndice }} containerStyle={{
          width: '100%',
          height: '100vh'
        }}/>
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
