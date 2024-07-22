import {PermissionStatus, useLocationPermission} from '@src/hooks';
import {TemperatureUnit} from '@src/types';
import {CityWeather} from '@src/types/api';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import {LocationInfoModule} from 'location-info-package';
import Config from 'react-native-config';

const fetchLocation = async (unit: TemperatureUnit = 'imperial') => {
  try {
    const currentLocation = await LocationInfoModule.getCurrentLocation();

    const url = `${Config.OPEN_WEATHER_BASE_URL}/weather?lat=${currentLocation.latitude}&lon=${currentLocation.longitude}&appid=${Config.OPEN_WEATHER_API_KEY}&units=${unit}`;
    const response = await axios.get<CityWeather>(url);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
    }
    console.log('ERROR', error);
    return null;
  }
};

export const useGetCurrentLocationWeather = (
  unit: TemperatureUnit = 'imperial',
) => {
  const permissionStatus = useLocationPermission();

  return useQuery({
    queryKey: ['currentLocationWeather', unit],
    queryFn: () => fetchLocation(unit),
    enabled: permissionStatus === PermissionStatus.GRANTED,
  });
};
