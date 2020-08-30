// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import {
  Redirect,
  HashRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Lobby from './components/Lobby';
import Classroom from './components/Classroom';

export default function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/join" />
        </Route>
        <Route path="/join">
          <Lobby />
        </Route>
        <Route path="/classroom">
          <Classroom />
        </Route>
      </Switch>
    </Router>
  );
}
