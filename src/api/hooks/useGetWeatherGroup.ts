import {cities} from '@src/shared/constants';
import {TemperatureUnit} from '@src/types';
import {CitiesWeatherResponse} from '@src/types/api';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import Config from 'react-native-config';

const fetchWeatherGroup = async (unit: TemperatureUnit = 'imperial') => {
  const url = `${Config.OPEN_WEATHER_BASE_URL}/group?id=${cities.join(
    ',',
  )}&appid=${Config.OPEN_WEATHER_API_KEY}&units=${unit}`;

  try {
    const response = await axios.get<CitiesWeatherResponse>(url);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
    }
  }
};

export const useGetWeatherGroup = (unit: TemperatureUnit) =>
  useQuery({
    queryKey: ['weatherGroup'],
    queryFn: () => fetchWeatherGroup(unit),
  });
