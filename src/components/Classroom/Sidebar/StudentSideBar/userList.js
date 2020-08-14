import React, { useCallback } from 'react';
import get from 'lodash/get'
import useVideoTiles from '../../../../hooks/useVideoTiles';
import { USER_ROLES } from '../../../../constants';
import VideoTile from '../../../VideoTile';
import classNames from 'classnames';

const getNameInitials = (name = '') => {
  return name
    .split(' ')
    .map((item) => item[0].toUpperCase())
    .join('');
};

const UserList = ({ roster, hidden = false }) => {
  const videoElements = [];
  const { numberOfStudentTile, visibleIndices } = useVideoTiles({
    localUserRole: USER_ROLES.STUDENT,
    videoElements,
  });

  let attendeeIds = [];

  if (roster) {
    attendeeIds = Object.keys(roster).filter((attendeeId) => {
      let hasVideo = true;

      if (visibleIndices) {
        hasVideo =
          Object.values(visibleIndices).find(
            (item) => item && item.attendeeId === attendeeId,
          ) !== -1;
      }
      return !!roster[attendeeId].name && hasVideo;
    });
  }

  const userListClassNames = classNames('sidebar-user-list', {
    hidden,
  });

  return (
    <div className={userListClassNames}>
      <div className="sidebar-videos">
        {Array.from(Array(numberOfStudentTile).keys()).map((key, index) => {
          const visibleIndice = visibleIndices[index];

          // eslint-disable-next-line react-hooks/rules-of-hooks
          const getElementRef = useCallback(
            (element) => {
              if (element) {
                videoElements[index] = element;
              }
            },
            [index],
          );

          return (
            <div className="sidebar-videos--row">
              <VideoTile
                key={key}
                getVideoElementRef={getElementRef}
                hidden={!visibleIndice}
                externalUserId={get(visibleIndice, 'externalUserId')}
                showNameTag={true}
              />
            </div>
          );
        })}
      </div>
      <div className="sidebar-users--without-videos">
        {attendeeIds &&
          attendeeIds.length > 0 &&
          attendeeIds.map((attendeeId, index) => {
            const rosterAttendee = roster[attendeeId];
            const { muted, name } = rosterAttendee;

            const attendeeInitials = getNameInitials(name);
            const isCamActive = true;
            const isMicActive = !muted;

            const micClasses = classNames('mic material-icons md-18', {
              active: isMicActive,
            });
            const camClasses = classNames('cam material-icons md-18', {
              active: isCamActive,
            });
            return (
              <div key={index} className="list-item--attendee">
                <div className="initial">
                  <span>{attendeeInitials}</span>
                </div>
                <i className={micClasses}>{isMicActive ? 'mic' : 'mic_off'}</i>
                <i className={camClasses}>
                  {isCamActive ? 'videocam' : 'videocam_off'}
                </i>
                <div className="name">{name}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserList;
