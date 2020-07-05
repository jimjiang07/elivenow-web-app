import React, { useContext, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import VideoTile from '../../VideoTile';
import getChimeContext from '../../../context/getChimeContext';
import './LocalVideo.css';

export default function LocalVideo() {
  const [videoEnabled, setVideoEnabled] = useState(false);
  const chime = useContext(getChimeContext());
  const videoElement = useRef(null);

  const videoClassName = classNames('local-video-tile__video', {
    'hidden': !videoEnabled,
  })

  const videoPlaceHolderClassName = classNames('local-video-tile__place-holder', {
    'hidden': videoEnabled,
  })

  useEffect(() => {
    async function initialize() {
      if (!chime) {
        return;
      }

      chime.audioVideo.addObserver({
        videoTileDidUpdate: (tileState) => {
          if (
            !tileState.boundAttendeeId ||
            !tileState.localTile ||
            !tileState.tileId ||
            !videoElement.current
          ) {
            return;
          }

          chime.audioVideo.bindVideoElement(
            tileState.tileId,
            videoElement.current
          );
          setVideoEnabled(tileState.active);
        }
      });

      if (!chime.currentVideoInputDevice) {
        throw new Error('currentVideoInputDevice does not exist');
      }

      await chime.chooseVideoInputDevice(
        chime.currentVideoInputDevice
      );

      chime.audioVideo.startLocalVideoTile();
    }

    initialize();
  }, [chime]);

  return (
    <div className='local-video-tile'>
      <VideoTile getVideoElementRef={videoElement} hidden={!videoEnabled} placeHolderText="Loading"/>
    </div>
  );
}
