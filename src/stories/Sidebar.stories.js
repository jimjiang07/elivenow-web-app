import React from 'react';

import { StudentSideBar } from '../components/Classroom/Sidebar';

export default {
  title: 'Sidebar',
  component: StudentSideBar,
};

const props = {
  attendeeCount: 12,
  attendees: [
    {
      attendeeInit: 'BS',
      isMicActive: true,
      isCamActive: true,
      name: 'Brooklyn S.'
    },
    {
      attendeeInit: 'BS',
      isMicActive: false,
      isCamActive: true,
      name: 'Brooklyn S.'
    },
    {
      attendeeInit: 'DR',
      isMicActive: true,
      isCamActive: false,
      name: 'Dianne R.'
    },
    {
      attendeeInit: 'AM',
      isMicActive: false,
      isCamActive: false,
      name: 'Arlene M.'
    },
  ],
};

export const WithAttendees = () => <StudentSideBar {...props} />;
export const WithNoAttendee = () => <StudentSideBar attendeeCount={0} attendees={[]}/>;