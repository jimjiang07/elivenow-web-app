import React, { useState } from 'react';
import useRoster from '../../../../hooks/useRoster';
import UserList from './userList'
import classNames from 'classnames';

const VIEW_STUDENT_LIST = 'VIEW_STUDENT_LIST';
const VIEW_CHAT = 'VIEW_CHAT';

const StudentSidebar = () => {
  const [activeView, setActiveView] = useState(VIEW_STUDENT_LIST);
  const [collapsed, setCollapsed] = useState(true);

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
        onClick={() => setCollapsed(!collapsed)}
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
        <UserList roster={roster} hidden={activeView !== VIEW_STUDENT_LIST}/>
        {activeView === VIEW_CHAT && <div></div>}
      </div>
    </aside>
  );
};

StudentSidebar.defaultProps = {
  attendees: [],
  attendeeCount: 0,
};

StudentSidebar.propTypes = {};

export default StudentSidebar;
