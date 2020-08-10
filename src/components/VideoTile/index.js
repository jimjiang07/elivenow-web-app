import get from 'lodash/get';
import React, { useContext } from 'react';
import classNames from 'classnames';
import getChimeContext from '../../context/getChimeContext';
import { extractUserInfo } from '../../utils/user';

const VideoTile = ({
  getVideoElementRef,
  tileInfo = null,
  placeHolderText,
  showNameTag,
}) => {
  const chime = useContext(getChimeContext());

  const hidden = !tileInfo;
  const { userName } = extractUserInfo(get(tileInfo, 'externalUserId'));

  const videoTileClassName = classNames('video-tile', {
    hidden,
  });
  const placeHolderClassName = classNames('video-tile__place-holder', {
    hidden: !hidden,
  });
  const containerClassName = classNames('video-tile-container');

  console.log(hidden, placeHolderClassName, videoTileClassName);

  return (
    <div className={containerClassName}>
      {chime ? (
        <>
          <video className={videoTileClassName} muted ref={getVideoElementRef} />
          <div className={placeHolderClassName}>{placeHolderText}</div>
        </>
      ) : (
        <img
          className='video-tile'
          alt="test video"
          src="https://cdn.theatlantic.com/thumbor/fjk7yZScOyO526FEjDkJepEgCvw=/0x57:1088x669/720x405/media/img/mt/2015/07/minions1/original.jpg"
        />
      )}
      {showNameTag && userName && (
        <div className="video-tile__name-tag">{userName}</div>
      )}
    </div>
  );
};

export default VideoTile;
