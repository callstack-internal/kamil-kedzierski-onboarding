import '@testing-library/react-native/extend-expect';
import * as dotenv from 'dotenv';
import 'react-native-gesture-handler/jestSetup';
import mockPermissions from 'react-native-permissions/mock';
import {server} from './src/api/mocks/server';

dotenv.config({path: '.env.test'});

jest.mock('react-native-config', () => ({
  OPEN_WEATHER_API_KEY: process.env.OPEN_WEATHER_API_KEY,
  OPEN_WEATHER_BASE_URL: process.env.OPEN_WEATHER_BASE_URL,
}));

jest.mock('react-native-permissions', () => {
  return mockPermissions;
});
// include this section and the NativeAnimatedHelper section for mocking react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');

  // The mock for `call` immediately calls the callback which is incorrect
  // So we override it with a no-op
  Reanimated.default.call = () => {};

  return Reanimated;
});

// Silence the warning: Animated: `useNativeDriver` is not supported because the native animated module is missing
jest.mock('react-native/Libraries/Animated/NativeAnimatedHelper');

jest.mock('location-info-package', () => {
  return {
    getCurrentLocation: jest.fn(() =>
      Promise.resolve({
        latitude: 123.456,
        longitude: -123.456,
      }),
    ),
    // Add other methods of LocationInfoModule here and their mock implementations
  };
});

beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
