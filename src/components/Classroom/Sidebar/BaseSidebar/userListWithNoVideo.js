import React, { useContext } from 'react';
import getMeetingContext from '../../../../context/getMeetingContext';
import classNames from 'classnames';

const getNameInitials = (name = '') => {
  return name
    .split(' ')
    .map((item) => item[0].toUpperCase())
    .join('');
};

const UserListWithNoVideo = ({ roster, hidden = false }) => {
  const { localAttendeeId } = useContext(getMeetingContext());

  let attendeeIds = [];

  if (roster) {
    attendeeIds = Object.keys(roster).filter((attendeeId) => {
      return !!roster[attendeeId].name;
    });
  }

  const userListClassNames = classNames('sidebar-user-list', {
    hidden,
  });

  return (
    <div className={userListClassNames}>
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

export default UserListWithNoVideo;
