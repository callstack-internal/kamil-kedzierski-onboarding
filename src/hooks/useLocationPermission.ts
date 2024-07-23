import {useEffect, useState} from 'react';
import {Platform} from 'react-native';
import {check, PERMISSIONS, request, RESULTS} from 'react-native-permissions';

export enum PermissionStatus {
  GRANTED = 'GRANTED',
  DENIED = 'DENIED',
  UNDETERMINED = 'UNDETERMINED',
}

export const useLocationPermission = (): PermissionStatus => {
  const [permissionStatus, setPermissionStatus] = useState<PermissionStatus>(
    PermissionStatus.UNDETERMINED,
  );

  useEffect(() => {
    const requestPermission = async () => {
      let permission;
      if (Platform.OS === 'android') {
        permission = PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;
      } else if (Platform.OS === 'ios') {
        permission = PERMISSIONS.IOS.LOCATION_WHEN_IN_USE;
      }

      if (!permission) {
        console.error('Platform not supported or permission not set');
        setPermissionStatus(PermissionStatus.UNDETERMINED);
        return;
      }

      const status = await check(permission);
      if (status === RESULTS.GRANTED) {
        setPermissionStatus(PermissionStatus.GRANTED);
      } else {
        const result = await request(permission);
        if (result === RESULTS.GRANTED) {
          setPermissionStatus(PermissionStatus.GRANTED);
        } else {
          setPermissionStatus(PermissionStatus.DENIED);
        }
      }
    };

    requestPermission();
  }, []);

  return permissionStatus;
};
