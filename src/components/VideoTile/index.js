import React, { useContext } from 'react';
import classNames from 'classnames';
import getChimeContext from '../../context/getChimeContext';
import { extractUserInfo } from '../../utils/user';

const VideoTile = ({
  getVideoElementRef,
  externalUserId,
  hidden = false,
  placeHolderText,
  showNameTag,
  isMicActive,
  isLocal,
}) => {
  const chime = useContext(getChimeContext());
  const { userName } = extractUserInfo(externalUserId);

  const videoTileClassName = classNames('video-tile', {
    hidden,
  });
  const placeHolderClassName = classNames('video-tile__place-holder', {
    hidden: !hidden,
  });
  const containerClassName = classNames('video-tile-container', {
    hidden,
  });

  const micClasses = classNames('mic material-icons md-18', {
    active: isMicActive === true,
    hidden: isMicActive === undefined,
  });

  return (
    <div className={containerClassName}>
      {chime ? (
        <>
          <video
            className={videoTileClassName}
            muted
            ref={getVideoElementRef}
          />
          <div className={placeHolderClassName}>{placeHolderText}</div>
        </>
      ) : (
        <img
          className="video-tile"
          alt="test video"
          src="https://cdn.theatlantic.com/thumbor/fjk7yZScOyO526FEjDkJepEgCvw=/0x57:1088x669/720x405/media/img/mt/2015/07/minions1/original.jpg"
        />
      )}
      <i className={micClasses}>{isMicActive ? 'mic' : 'mic_off'}</i>
      {isLocal ? (
        <div className="video-tile__name-tag">You</div>
      ) : (
        showNameTag &&
        userName && <div className="video-tile__name-tag">{userName}</div>
      )}
      {}
    </div>
  );
};

export default VideoTile;
