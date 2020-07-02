import React, { useContext, useEffect, useCallback, useState } from 'react';
import classNames from 'classnames'
import getChimeContext from '../../../context/getChimeContext';
import { MAX_REMOTE_VIDEOS } from '../../../constants'
import './RemoteVideoGroup.css';

export default function RemoteVideoGroup() {
  const chime = useContext(getChimeContext());
  const [visibleIndices, setVisibleIndices] = useState({});
  const videoElements = [];
  const tiles = new Array(MAX_REMOTE_VIDEOS).fill(undefined);

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

  const releaseVideoIndex = (tileId) => {
    const index = tiles.findIndex((item) => item.tileId === tileId);

    if (index) {
      tiles[index].tile = undefined;
      return index;
    }

    return undefined;
  }

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
        const index = releaseVideoIndex(tileId);
        setVisibleIndices(previousVisibleIndices => ({
          ...previousVisibleIndices,
          [index]: null
        }));
      }
    });
  }, [chime]);



  return (
    <div className='remote-video-group'>
       {Array.from(Array(MAX_REMOTE_VIDEOS).keys()).map((key, index) => {
        const visibleIndex = visibleIndices[index];

        const remoteVideoTileClassName = classNames('remote-video-group__tile', {
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

        // const externalUserId = visibleIndex ? visibleIndex.boundExternalUserId : null;
        return (
          <div className={remoteVideoTileClassName} key={key}>
            <video
              className='remote-video-group__tile-video'
              muted
              ref={getElementRef}
            />
          </div>
        );
      })}
    </div>
  );
}
