import React, { useContext } from 'react';
import classNames from 'classnames'
import getChimeContext from '../../context/getChimeContext';

const VideoTile = ({ getVideoElementRef, hidden = false, placeHolderText, containerStyle = {} }) => {
  const chime = useContext(getChimeContext());
  const videoTileClassName = classNames('video-tile', {
    hidden,
  });
  const placeHolderClassName = classNames('video-tile__place-holder', {
    hidden: !hidden,
  });

  return (
    <div className='video-tile-container' style={containerStyle}>
      {
        chime ?
        <>
          <video
            className={videoTileClassName}
            muted
            ref={getVideoElementRef}
          />
          <div className={placeHolderClassName}>{placeHolderText}</div>
        </>
        : <img
            className={'video-tile'}
            alt='test video'
            src='https://cdn.theatlantic.com/thumbor/fjk7yZScOyO526FEjDkJepEgCvw=/0x57:1088x669/720x405/media/img/mt/2015/07/minions1/original.jpg'
          />
      }
    </div>

  );
}

export default VideoTile;