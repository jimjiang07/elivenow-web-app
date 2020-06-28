// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import Lobby from './components/Lobby';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
          <Redirect to="/join" />
      </Route>
      <Route path={'/join'}>
        <Lobby />
      </Route>
    </Switch>
  );
}
