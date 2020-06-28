// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React from 'react';
import { MEETING_STATUS } from '../constants'

const context = React.createContext({
  meetingStatus: MEETING_STATUS.LOADING
});

export default function getMeetingContext() {
  return context;
}
