import React, { useState, Fragment } from 'react';
import classNames from 'classnames';

const VIEW_STUDENT_LIST = 'VIEW_STUDENT_LIST';
const VIEW_CHAT = 'VIEW_CHAT';

const Sidebar = ({ studentCount, students, comments }) => {
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

  return (
    <aside className={sideBarClassNames}>
      <button
        type="button"
        className={sideBarToggleClassNames}
        onClick={() => setCollapsed(!collapsed)}
      >
        Attendees <span className="sidebar-toggle--count">({studentCount})</span>
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
        {activeView === VIEW_STUDENT_LIST && (
          <Fragment>
            {students.length > 0 &&
              students.map((student, index) => {
                const { studentInit, isMicActive, isCamActive, name } = student;
                const micClasses = classNames('mic material-icons md-18', {
                  active: isMicActive,
                });
                const camClasses = classNames('cam material-icons md-18', {
                  active: isCamActive,
                });
                return (
                  <div key={index} className="list-item--student">
                    <div className="initial">
                      <span>{studentInit}</span>
                    </div>
                    <i className={micClasses}>
                      {isMicActive ? 'mic' : 'mic_off'}
                    </i>
                    <i className={camClasses}>
                      {isCamActive ? 'videocam' : 'videocam_off'}
                    </i>
                    <span className="name">{name}</span>
                  </div>
                );
              })}
          </Fragment>
        )}
        {activeView === VIEW_CHAT && <div>comments</div>}
      </div>
    </aside>
  );
};

Sidebar.propTypes = {};

export default Sidebar;
