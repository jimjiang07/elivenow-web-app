import React, { useContext, useEffect, useRef, useState } from 'react';
import VideoTile from '../../VideoTile';
import getChimeContext from '../../../context/getChimeContext';
import './LocalVideo.css';

export default function LocalVideo() {
  const [videoEnabled, setVideoEnabled] = useState(false);
  const chime = useContext(getChimeContext());
  const videoElement = useRef(null);

  useEffect(() => {
    async function initialize() {
      if (!chime || !chime.audioVideo) {
        return;
      }

      const localTile = chime.audioVideo.getLocalVideoTile();

      if (localTile && videoElement.current) {
        console.log('binding local tile');
        localTile.bindVideoElement(videoElement.current);
        setVideoEnabled(true);
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
            videoElement.current,
          );
          setVideoEnabled(tileState.active);
        },
      });
    }

    initialize();
  });

  return (
    <div className="local-video-tile">
      <VideoTile
        getVideoElementRef={videoElement}
        hidden={!videoEnabled}
        placeHolderText="You"
        isLocal
      />
    </div>
  );
}
