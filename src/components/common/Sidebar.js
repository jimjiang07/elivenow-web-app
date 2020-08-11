import React, { useState, Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from "classnames";

const VIEW_STUDENT_LIST = 'VIEW_STUDENT_LIST';
const VIEW_COMMENTS = 'VIEW_COMMENTS';

const Sidebar = ({
  studentCount,
  students,
  comments,
}) => {
  const [activeView, setActiveView] = useState(VIEW_STUDENT_LIST);
  return (
    <aside className="sidebar">
      <button type="button" className="">
        Students <span>({studentCount})</span>
      </button>
      <div className="controlBtns">
        <button
          type="button"
          onClick={() => {setActiveView(VIEW_STUDENT_LIST)}}
        >
          LIST
        </button>
        <button
          type="button"
          onClick={() => {setActiveView(VIEW_COMMENTS)}}
        >
          COMMENT
        </button>
      </div>
      { activeView === VIEW_STUDENT_LIST && (
        <Fragment>
          { students.length > 0 && students.map((student, index) => {
            const { studentInit, isMicActive, isCamActive, name } = student;
            const micClasses = classNames('mic material-icons md-24', { 'active': isMicActive });
            const camClasses = classNames('cam material-icons md-24', { 'active': isCamActive });
            return (
              <div key={index} className="list-item--student">
                <div className="initial"><span>{studentInit}</span></div>
                <i className={micClasses}>{ isMicActive ? 'mic' : 'mic_off'}</i>
                <i className={camClasses}>{ isCamActive ? 'videocam' : 'videocam_off'}</i>
                <span className="name">{name}</span>
              </div>
            );
          }) }
        </Fragment>
      ) }
      { activeView === VIEW_COMMENTS && <div>comments</div> }
    </aside>
  );
};

Sidebar.propTypes = {

};

export default Sidebar;
