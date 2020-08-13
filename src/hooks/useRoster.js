// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import { useContext, useEffect, useState } from 'react';

import getChimeContext from '../context/getChimeContext';

export default function useRoster() {
  const chime = useContext(getChimeContext());
  const [roster, setRoster] = useState({});
  useEffect(() => {
    if (!chime) {
      return;
    }

    const callback = (newRoster) => {
      setRoster({
        ...newRoster,
      });
    };
    chime.subscribeToRosterUpdate(callback);
    return () => {
      chime.unsubscribeFromRosterUpdate(callback);
    };
  }, [chime]);
  return roster;
}
