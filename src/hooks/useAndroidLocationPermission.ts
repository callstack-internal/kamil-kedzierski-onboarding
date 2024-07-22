import {useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';

export const useAndroidLocationPermission = () => {
  useEffect(() => {
    const requestPermission = async () => {
      if (Platform.OS === 'android') {
        const alreadyGranted = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );

        if (!alreadyGranted) {
          await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Permission',
              message: 'This app needs access to your location.',
              buttonNeutral: 'Ask Me Later',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK',
            },
          );
        }
      }
    };

    requestPermission();
  }, []);
};
