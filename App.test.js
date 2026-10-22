// The native push bridge is provided by iOS/Android, not the Node test process.
jest.mock('react-native-chabok', () => ({
  AdpPushClient: jest.fn(() => ({
    init: jest.fn(() => Promise.resolve(true)),
    register: jest.fn(() => Promise.resolve(true)),
    getUserId: jest.fn(() => Promise.resolve('test-user')),
    registerAsGuest: jest.fn(() => Promise.resolve(true)),
    setDefaultTracker: jest.fn(),
    setDeeplinkCallbackListener: jest.fn(),
    notificationOpenedHandler: jest.fn(),
    appWillOpenUrl: jest.fn(),
  })),
}));

import React from 'react';
import App from './App';

import renderer from 'react-test-renderer';
import { NativeModules } from 'react-native';

NativeModules.AdpPushClient = { addListener: jest.fn(), removeListeners: jest.fn() };

it('renders without crashing', () => {
  const component = renderer.create(<App />);
  expect(component.toJSON()).toBeTruthy();
  component.unmount();
});
