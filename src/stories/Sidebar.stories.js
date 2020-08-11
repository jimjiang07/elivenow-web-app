import React from 'react';

import Sidebar from '../components/common/Sidebar';

export default {
  title: 'Sidebar',
  component: Sidebar,
};

const props = {
  studentCount: 12,
  students: [
    {
      studentInit: 'BS',
      isMicActive: true,
      isCamActive: true,
      name: 'Brooklyn S.'
    },
    {
      studentInit: 'BS',
      isMicActive: false,
      isCamActive: true,
      name: 'Brooklyn S.'
    },
    {
      studentInit: 'DR',
      isMicActive: true,
      isCamActive: false,
      name: 'Dianne R.'
    },
    {
      studentInit: 'AM',
      isMicActive: false,
      isCamActive: false,
      name: 'Arlene M.'
    },
  ],
};

export const Text = () => <Sidebar {...props} />;