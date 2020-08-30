import React from 'react';
import { HashRouter } from 'react-router-dom';

import ChimeProvider from './providers/ChimeProvider';
import I18nProvider from './providers/I18nProvider';
import MeetingProvider from './providers/MeetingProvider';
import TilesProvider from './providers/TilesProvider';
import Routes from './Routes';
import './App.css';

function App() {
  return (
    <HashRouter>
      <I18nProvider>
        <ChimeProvider>
          <MeetingProvider>
            <TilesProvider>
              <Routes />
            </TilesProvider>
          </MeetingProvider>
        </ChimeProvider>
      </I18nProvider>
    </HashRouter>
  );
}

export default App;
