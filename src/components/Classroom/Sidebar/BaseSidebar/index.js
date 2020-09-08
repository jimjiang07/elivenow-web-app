import React, { useState } from 'react';
import useRoster from '../../../../hooks/useRoster';
import UserList from './userList';
import UserListWithNoVideo from './userListWithNoVideo';
import classNames from 'classnames';

const VIEW_STUDENT_LIST = 'VIEW_STUDENT_LIST';
const VIEW_CHAT = 'VIEW_CHAT';

const BaseSidebar = ({ onClick, collapsed, withNoVideo = false }) => {
  const [activeView, setActiveView] = useState(VIEW_STUDENT_LIST);

  const sideBarClassNames = classNames('sidebar', {
    collapsed: collapsed,
  });

  const sideBarToggleClassNames = classNames('sidebar-toggle', {
    collapsed: collapsed,
  });

  const sideBarContentClassNames = classNames('sidebar-content', {
    collapsed: collapsed,
  });

  const listTabBtnClassNames = classNames('sidebar-tabs--button', {
    selected: activeView === VIEW_STUDENT_LIST,
  });
  const chatTabBtnClassNames = classNames('sidebar-tabs--button', {
    selected: activeView === VIEW_CHAT,
  });

  const roster = useRoster();

  let attendeeIds = [];
  let attendeeCount = 0;

  if (roster) {
    attendeeIds = Object.keys(roster).filter((attendeeId) => {
      return !!roster[attendeeId].name;
    });
    attendeeCount = attendeeIds.length;
  }

  return (
    <aside className={sideBarClassNames}>
      <button
        type="button"
        className={sideBarToggleClassNames}
        onClick={onClick}
      >
        Attendees{' '}
        <span className="sidebar-toggle--count">({attendeeCount})</span>
        <i className="material-icons md-24">{collapsed ? 'add' : 'remove'}</i>
      </button>

      {/* content */}
      <div className={sideBarContentClassNames}>
        <div className="sidebar-tabs">
          <button
            className={listTabBtnClassNames}
            type="button"
            onClick={() => {
              setActiveView(VIEW_STUDENT_LIST);
            }}
          >
            <i className="material-icons md-24">list</i>
            LIST
          </button>
          <button
            className={chatTabBtnClassNames}
            type="button"
            onClick={() => {
              setActiveView(VIEW_CHAT);
            }}
          >
            <i className="material-icons md-18">chat_bubble_outline</i>
            CHAT
          </button>
        </div>
        {withNoVideo ? (
          <UserListWithNoVideo
            roster={roster}
            hidden={activeView !== VIEW_STUDENT_LIST}
          />
        ) : (
          <UserList
            roster={roster}
            hidden={activeView !== VIEW_STUDENT_LIST}
            collapsed={collapsed}
          />
        )}
        {activeView === VIEW_CHAT && <div></div>}
      </div>
    </aside>
  );
};

BaseSidebar.defaultProps = {
  attendees: [],
  attendeeCount: 0,
};

BaseSidebar.propTypes = {};

export default BaseSidebar;