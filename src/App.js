import React from 'react';
import { HashRouter } from 'react-router-dom';

import ChimeProvider from './providers/ChimeProvider';
import I18nProvider from './providers/I18nProvider';
import TilesProvider from './providers/TilesProvider';
import LocalUserProvider from './providers/LocalUserProvider';
import Routes from './Routes';
import './App.css';

function App() {
  return (
    <HashRouter>
      <I18nProvider>
        <ChimeProvider>
          <LocalUserProvider>
            <TilesProvider>
              <Routes />
            </TilesProvider>
          </LocalUserProvider>
        </ChimeProvider>
      </I18nProvider>
    </HashRouter>
  );
}

export default App;
