import get from 'lodash/get'
import React, { useContext } from 'react';
import classNames from 'classnames'
import getChimeContext from '../../context/getChimeContext';
import { extractUserInfo } from '../../utils/user'

const VideoTile = ({ getVideoElementRef, tileInfo = null, placeHolderText, showNameTag }) => {
  const chime = useContext(getChimeContext());
  const hasTileInfo = !!tileInfo;
  const hasVideo = get(tileInfo, 'hasVideo', false);
  const userInfo = extractUserInfo(get(tileInfo, 'externalUserId'));

  const videoTileClassName = classNames('video-tile', {
    hidden: !hasVideo,
  });
  const placeHolderClassName = classNames('video-tile__place-holder', {
    hidden: hasVideo,
    taken: hasTileInfo,
  });

  const containerClassName = classNames('video-tile-container');

  return (
    <div className={containerClassName}>
      {
        chime ?
        <>
          <video
            className={videoTileClassName}
            muted
            ref={getVideoElementRef}
          />
          {showNameTag && userInfo.userName && hasVideo && <div className='video-tile__name-tag'>{userInfo.userName}</div>}
          <div className={placeHolderClassName}>{userInfo.userName || placeHolderText}</div>
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