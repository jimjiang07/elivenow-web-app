// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import {
  AsyncScheduler,
  ConsoleLogger,
  DataMessage,
  DefaultDeviceController,
  DefaultMeetingSession,
  DefaultModality,
  LogLevel,
  MeetingSessionConfiguration,
} from 'amazon-chime-sdk-js';
import { useIntl } from 'react-intl';
import _ from 'lodash';
import throttle from 'lodash/throttle';
import getBaseUrl from '../utils/getBaseUrl';
import { MESSAGE_TOPIC } from '../constants';

export default class ChimeSdkWrapper {
  intl = useIntl();

  DATA_MESSAGE_LIFETIME_MS = 10000;

  ROSTER_THROTTLE_MS = 400;

  meetingSession = null;

  audioVideo = null;

  title = null;

  name = null;

  region = null;

  supportedChimeRegions = [
    { label: 'United States (N. Virginia)', value: 'us-east-1' },
    { label: 'Japan (Tokyo)', value: 'ap-northeast-1' },
    { label: 'Singapore', value: 'ap-southeast-1' },
    { label: 'Australia (Sydney)', value: 'ap-southeast-2' },
    { label: 'Canada', value: 'ca-central-1' },
    { label: 'Germany (Frankfurt)', value: 'eu-central-1' },
    { label: 'Sweden (Stockholm)', value: 'eu-north-1' },
    { label: 'Ireland', value: 'eu-west-1' },
    { label: 'United Kingdom (London)', value: 'eu-west-2' },
    { label: 'France (Paris)', value: 'eu-west-3' },
    { label: 'Brazil (São Paulo)', value: 'sa-east-1' },
    { label: 'United States (Ohio)', value: 'us-east-2' },
    { label: 'United States (N. California)', value: 'us-west-1' },
    { label: 'United States (Oregon)', value: 'us-west-2' },
  ];

  currentAudioInputDevice = null;

  currentAudioOutputDevice = null;

  currentVideoInputDevice = null;

  audioInputDevices = [];

  audioOutputDevices = [];

  videoInputDevices = [];

  devicesUpdatedCallbacks = [];

  roster = {};

  rosterUpdateCallbacks = [];

  configuration = null;

  messageUpdateCallbacks = [];

  initializeSdkWrapper = async () => {
    this.meetingSession = null;
    this.audioVideo = null;
    this.title = null;
    this.name = null;
    this.region = null;
    this.currentAudioInputDevice = null;
    this.currentAudioOutputDevice = null;
    this.currentVideoInputDevice = null;
    this.audioInputDevices = [];
    this.audioOutputDevices = [];
    this.videoInputDevices = [];
    this.roster = {};
    this.rosterUpdateCallbacks = [];
    this.configuration = null;
    this.messageUpdateCallbacks = [];
  };

  /*
   * ====================================================================
   * regions
   * ====================================================================
   */
  lookupClosestChimeRegion = async () => {
    let region;
    try {
      const response = await fetch(`https://l.chime.aws`, {
        method: 'GET',
      });
      const json = await response.json();
      if (json.error) {
        throw new Error(
          `${this.intl.formatMessage({
            id: 'CreateOrJoin.serverError',
          })}: ${json.error}`,
        );
      }
      region = json.region;
    } catch (error) {
      this.logError(error);
    }
    return (
      this.supportedChimeRegions.find(({ value }) => value === region) ||
      this.supportedChimeRegions[0]
    );
  };

  createRoom = async (title, name, region, role) => {
    if (!title || !name || !region || !role) {
      this.logError(
        new Error(
          `title=${title} name=${name} region=${region} role=${role} must exist`,
        ),
      );
      return;
    }

    const response = await fetch(
      `${getBaseUrl()}join?title=${encodeURIComponent(
        title,
      )}&name=${encodeURIComponent(name)}&region=${encodeURIComponent(
        region,
      )}&role=${encodeURIComponent(role)}`,
      {
        method: 'POST',
      },
    );
    const json = await response.json();
    if (json.error) {
      throw new Error(
        `${this.intl.formatMessage({
          id: 'CreateOrJoin.serverError',
        })}: ${json.error}`,
      );
    }

    const { JoinInfo } = json;
    if (!JoinInfo) {
      throw new Error(
        this.intl.formatMessage({
          id: 'CreateOrJoin.classRoomDoesNotExist',
        }),
      );
    }
    this.configuration = new MeetingSessionConfiguration(
      JoinInfo.Meeting,
      JoinInfo.Attendee,
    );
    await this.initializeMeetingSession(this.configuration);

    this.title = title;
    this.name = name;
    this.region = region;
  };

  initializeMeetingSession = async (configuration) => {
    const logger = new ConsoleLogger('SDK', LogLevel.ERROR);
    const deviceController = new DefaultDeviceController(logger);
    this.meetingSession = new DefaultMeetingSession(
      configuration,
      logger,
      deviceController,
    );
    this.audioVideo = this.meetingSession.audioVideo;

    this.audioInputDevices = [];
    (await this.audioVideo.listAudioInputDevices()).forEach(
      (mediaDeviceInfo) => {
        this.audioInputDevices.push({
          label: mediaDeviceInfo.label,
          value: mediaDeviceInfo.deviceId,
        });
      },
    );
    this.audioOutputDevices = [];
    (await this.audioVideo.listAudioOutputDevices()).forEach(
      (mediaDeviceInfo) => {
        this.audioOutputDevices.push({
          label: mediaDeviceInfo.label,
          value: mediaDeviceInfo.deviceId,
        });
      },
    );
    this.videoInputDevices = [];
    (await this.audioVideo.listVideoInputDevices()).forEach(
      (mediaDeviceInfo) => {
        this.videoInputDevices.push({
          label: mediaDeviceInfo.label,
          value: mediaDeviceInfo.deviceId,
        });
      },
    );
    this.publishDevicesUpdated();
    this.audioVideo.addDeviceChangeObserver(this);

    this.audioVideo.realtimeSubscribeToAttendeeIdPresence(
      (presentAttendeeId, present) => {
        if (!present) {
          delete this.roster[presentAttendeeId];
          this.publishRosterUpdate.cancel();
          this.publishRosterUpdate();
          return;
        }

        this.audioVideo.realtimeSubscribeToVolumeIndicator(
          presentAttendeeId,
          async (attendeeId, volume, muted, signalStrength) => {
            const baseAttendeeId = new DefaultModality(attendeeId).base();
            if (baseAttendeeId !== attendeeId) {
              // Don't include the content attendee in the roster.
              //
              // When you or other attendees share content (a screen capture, a video file,
              // or any other MediaStream object), the content attendee (attendee-id#content) joins the session and
              // shares content as if a regular attendee shares a video.
              //
              // For example, your attendee ID is "my-id". When you call meetingSession.audioVideo.startContentShare,
              // the content attendee "my-id#content" will join the session and share your content.
              return;
            }

            let shouldPublishImmediately = false;

            if (!this.roster[attendeeId]) {
              this.roster[attendeeId] = { name: '' };
            }
            if (volume !== null) {
              this.roster[attendeeId].volume = Math.round(volume * 100);
            }
            if (muted !== null) {
              this.roster[attendeeId].muted = muted;
            }
            if (signalStrength !== null) {
              this.roster[attendeeId].signalStrength = Math.round(
                signalStrength * 100,
              );
            }
            if (
              this.title &&
              attendeeId &&
              this.roster[attendeeId] &&
              !this.roster[attendeeId].name
            ) {
              const response = await fetch(
                `${getBaseUrl()}attendee?title=${encodeURIComponent(
                  this.title,
                )}&attendee=${encodeURIComponent(attendeeId)}`,
              );
              const json = await response.json();
              this.roster[attendeeId].name = json.AttendeeInfo.Name || '';
              shouldPublishImmediately = true;
            }

            if (shouldPublishImmediately) {
              this.publishRosterUpdate.cancel();
            }
            this.publishRosterUpdate();
          },
        );
      },
    );
  };

  joinRoom = async (element) => {
    if (!element) {
      this.logError(new Error(`element does not exist`));
      return;
    }

    window.addEventListener('unhandledrejection', (event) => {
      this.logError(event.reason);
    });

    const audioInputs = await this.audioVideo.listAudioInputDevices();
    if (audioInputs && audioInputs.length > 0 && audioInputs[0].deviceId) {
      this.currentAudioInputDevice = {
        label: audioInputs[0].label,
        value: audioInputs[0].deviceId,
      };
      await this.audioVideo.chooseAudioInputDevice(audioInputs[0].deviceId);
      this.audioVideo.realtimeMuteLocalAudio();
    }

    const audioOutputs = await this.audioVideo.listAudioOutputDevices();
    if (audioOutputs && audioOutputs.length > 0 && audioOutputs[0].deviceId) {
      this.currentAudioOutputDevice = {
        label: audioOutputs[0].label,
        value: audioOutputs[0].deviceId,
      };
      await this.audioVideo.chooseAudioOutputDevice(audioOutputs[0].deviceId);
    }

    const videoInputs = await this.audioVideo.listVideoInputDevices();
    if (videoInputs && videoInputs.length > 0 && videoInputs[0].deviceId) {
      this.currentVideoInputDevice = {
        label: videoInputs[0].label,
        value: videoInputs[0].deviceId,
      };
      await this.audioVideo.chooseVideoInputDevice(null);
    }

    this.publishDevicesUpdated();

    this.audioVideo.bindAudioElement(element);
    this.audioVideo.start();
  };

  // eslint-disable-next-line
  sendMessage = (topic, data = {}) => {
    if (!this.audioVideo) {
      return;
    }

    new AsyncScheduler().start(() => {
      this.audioVideo.realtimeSendDataMessage(
        topic,
        data,
        this.DATA_MESSAGE_LIFETIME_MS,
      );

      this.publishMessageUpdate(
        new DataMessage(
          Date.now(),
          topic,
          new TextEncoder().encode(data),
          _.get(
            this.meetingSession,
            'configuration.credentials.attendeeId',
            '',
          ),
          _.get(
            this.meetingSession,
            'configuration.credentials.externalUserId',
            '',
          ),
        ),
      );
    });
  };

  leaveRoom = async (end) => {
    try {
      this.audioVideo.stop();

      console.log('leaveRoom');
      if (end) {
        this.sendMessage(MESSAGE_TOPIC);
      }
    } catch (error) {
      this.logError(error);
    }

    try {
      if (end && this.title) {
        await fetch(
          `${getBaseUrl()}end?title=${encodeURIComponent(this.title)}`,
          {
            method: 'POST',
          },
        );
      }
    } catch (error) {
      this.logError(error);
    }

    this.initializeSdkWrapper();
  };

  /**
   * ====================================================================
   * Device
   * ====================================================================
   */

  chooseAudioInputDevice = async (device) => {
    try {
      await this.audioVideo.chooseAudioInputDevice(device.value);
      this.currentAudioInputDevice = device;
    } catch (error) {
      this.logError(error);
    }
  };

  chooseAudioOutputDevice = async (device) => {
    try {
      await this.audioVideo.chooseAudioOutputDevice(device.value);
      this.currentAudioOutputDevice = device;
    } catch (error) {
      this.logError(error);
    }
  };

  chooseVideoInputDevice = async (device) => {
    try {
      await this.audioVideo.chooseVideoInputDevice(device.value);
      this.currentVideoInputDevice = device;
    } catch (error) {
      this.logError(error);
    }
  };

  chooseCurrentVideoInputDevice = async () => {
    if (!this.currentVideoInputDevice) {
      throw new Error('currentVideoInputDevice does not exist');
    }
    await this.chooseVideoInputDevice(this.currentVideoInputDevice);
  };

  chooseCurrentAudioInputDevice = async () => {
    if (!this.currentAudioInputDevice) {
      throw new Error('currentAudioInputDevice does not exist');
    }
    await this.chooseAudioInputDevice(this.currentAudioInputDevice);
  };

  /**
   * ====================================================================
   * Observer methods
   * ====================================================================
   */

  audioInputsChanged = (freshAudioInputDeviceList) => {
    let hasCurrentDevice = false;
    this.audioInputDevices = [];
    freshAudioInputDeviceList.forEach((mediaDeviceInfo) => {
      if (
        this.currentAudioInputDevice &&
        mediaDeviceInfo.deviceId === this.currentAudioInputDevice.value
      ) {
        hasCurrentDevice = true;
      }
      this.audioInputDevices.push({
        label: mediaDeviceInfo.label,
        value: mediaDeviceInfo.deviceId,
      });
    });
    if (!hasCurrentDevice) {
      this.currentAudioInputDevice =
        this.audioInputDevices.length > 0 ? this.audioInputDevices[0] : null;
    }
    this.publishDevicesUpdated();
  };

  audioOutputsChanged = (freshAudioOutputDeviceList) => {
    let hasCurrentDevice = false;
    this.audioOutputDevices = [];
    freshAudioOutputDeviceList.forEach((mediaDeviceInfo) => {
      if (
        this.currentAudioOutputDevice &&
        mediaDeviceInfo.deviceId === this.currentAudioOutputDevice.value
      ) {
        hasCurrentDevice = true;
      }
      this.audioOutputDevices.push({
        label: mediaDeviceInfo.label,
        value: mediaDeviceInfo.deviceId,
      });
    });
    if (!hasCurrentDevice) {
      this.currentAudioOutputDevice =
        this.audioOutputDevices.length > 0 ? this.audioOutputDevices[0] : null;
    }
    this.publishDevicesUpdated();
  };

  videoInputsChanged = (freshVideoInputDeviceList) => {
    let hasCurrentDevice = false;
    this.videoInputDevices = [];
    freshVideoInputDeviceList.forEach((mediaDeviceInfo) => {
      if (
        this.currentVideoInputDevice &&
        mediaDeviceInfo.deviceId === this.currentVideoInputDevice.value
      ) {
        hasCurrentDevice = true;
      }
      this.videoInputDevices.push({
        label: mediaDeviceInfo.label,
        value: mediaDeviceInfo.deviceId,
      });
    });
    if (!hasCurrentDevice) {
      this.currentVideoInputDevice =
        this.videoInputDevices.length > 0 ? this.videoInputDevices[0] : null;
    }
    this.publishDevicesUpdated();
  };

  /**
   * ====================================================================
   * Subscribe and unsubscribe from SDK events
   * ====================================================================
   */

  subscribeToDevicesUpdated = (callback) => {
    this.devicesUpdatedCallbacks.push(callback);
  };

  unsubscribeFromDevicesUpdated = (callback) => {
    const index = this.devicesUpdatedCallbacks.indexOf(callback);
    if (index !== -1) {
      this.devicesUpdatedCallbacks.splice(index, 1);
    }
  };

  publishDevicesUpdated = () => {
    this.devicesUpdatedCallbacks.forEach((callback) => {
      callback({
        currentAudioInputDevice: this.currentAudioInputDevice,
        currentAudioOutputDevice: this.currentAudioOutputDevice,
        currentVideoInputDevice: this.currentVideoInputDevice,
        audioInputDevices: this.audioInputDevices,
        audioOutputDevices: this.audioOutputDevices,
        videoInputDevices: this.videoInputDevices,
      });
    });
  };

  subscribeToRosterUpdate = (callback) => {
    this.rosterUpdateCallbacks.push(callback);
  };

  unsubscribeFromRosterUpdate = (callback) => {
    const index = this.rosterUpdateCallbacks.indexOf(callback);
    if (index !== -1) {
      this.rosterUpdateCallbacks.splice(index, 1);
    }
  };

  publishRosterUpdate = throttle(() => {
    for (let i = 0; i < this.rosterUpdateCallbacks.length; i += 1) {
      const callback = this.rosterUpdateCallbacks[i];
      callback(this.roster);
    }
  }, ChimeSdkWrapper.ROSTER_THROTTLE_MS);

  subscribeToMessageUpdate = ({ topic, callback }) => {
    if (!this.audioVideo) {
      return;
    }
    console.log('subscribeToMessageUpdate');
    this.messageUpdateCallbacks.push(callback);
    this.audioVideo.realtimeSubscribeToReceiveDataMessage(topic, callback);
  };

  unsubscribeFromMessageUpdate = (messageUpdateCallback) => {
    if (!this.audioVideo) {
      return;
    }

    const index = this.messageUpdateCallbacks.indexOf(messageUpdateCallback);
    if (index !== -1) {
      this.messageUpdateCallbacks.splice(index, 1);
    }

    this.audioVideo.realtimeUnsubscribeFromReceiveDataMessage(
      messageUpdateCallback.topic,
    );
  };

  publishMessageUpdate = (message) => {
    for (let i = 0; i < this.messageUpdateCallbacks.length; i += 1) {
      const { topic, callback } = this.messageUpdateCallbacks[i];

      if (topic === message.topic) {
        callback(message);
      }
    }
  };

  /**
   * ====================================================================
   * Utilities
   * ====================================================================
   */

  logError = (error) => {
    // eslint-disable-next-line
    console.error(error);
  };
}
