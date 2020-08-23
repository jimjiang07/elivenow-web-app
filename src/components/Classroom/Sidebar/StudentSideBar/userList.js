import React, { useCallback, useContext } from 'react';
import get from 'lodash/get';

import getMeetingContext from '../../../../context/getMeetingContext';
import { useStudentsTiles } from '../../../../hooks/useVideoTiles';
import { USER_ROLES } from '../../../../constants';
import VideoTile from '../../../VideoTile';
import LocalVideo from '../../LocalVideo'
import classNames from 'classnames';

const getNameInitials = (name = '') => {
  return name
    .split(' ')
    .map((item) => item[0].toUpperCase())
    .join('');
};

const UserList = ({ roster, hidden = false, collapsed }) => {
  const videoElements = [];
  const { numberOfStudentTile, visibleIndices } = useStudentsTiles({
    localUserRole: USER_ROLES.STUDENT,
    videoElements,
  });

  const { localAttendeeId } = useContext(getMeetingContext());

  let attendeeIds = [];

  if (roster) {
    attendeeIds = Object.keys(roster).filter((attendeeId) => {
      let hasVideo = false;

      if (visibleIndices) {
        hasVideo =
          Object.values(visibleIndices).findIndex(
            (item) => item && item.attendeeId === attendeeId,
          ) !== -1;
      }

      return !!roster[attendeeId].name && !hasVideo;
    });
  }

  const userListClassNames = classNames('sidebar-user-list', {
    hidden,
  });

  return (
    <div className={userListClassNames}>
      <div className="sidebar-videos">
        {!collapsed && <LocalVideo />}
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

          let isMicActive;
          const attendeeId = get(visibleIndice, 'attendeeId');

          if (attendeeId) {
            const muted = get(roster, `${attendeeId}.muted`);

            if (muted !== undefined) {
              isMicActive = !muted;
            }
          }

          return (
            <div className="sidebar-videos--row" key={`sidebar-videotile-${key}`}>
              <VideoTile
                getVideoElementRef={getElementRef}
                hidden={!visibleIndice}
                externalUserId={get(visibleIndice, 'externalUserId')}
                showNameTag={true}
                isMicActive={isMicActive}
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

            const isLocal = localAttendeeId === attendeeId;

            if (isLocal) {
              return null;
            }

            const attendeeInitials = getNameInitials(name);
            const isMicActive = !muted;

            const micClasses = classNames('mic material-icons md-18', {
              active: isMicActive,
            });

            return (
              <div key={`sidebar-users--${attendeeId}`} className="list-item--attendee">
                <div className="initial">
                  <span>{attendeeInitials}</span>
                </div>
                <i className={micClasses}>{isMicActive ? 'mic' : 'mic_off'}</i>
                <div className="name">{isLocal ? 'You' : name}</div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default UserList;
