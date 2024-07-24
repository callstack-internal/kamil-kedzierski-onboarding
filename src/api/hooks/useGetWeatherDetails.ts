import {TemperatureUnit} from '@src/types';
import {CityWeather} from '@src/types/api';
import {useQuery} from '@tanstack/react-query';
import axios from 'axios';
import Config from 'react-native-config';

const fetchWeatherDetails = async (
  cityId: string,
  unit: TemperatureUnit = 'imperial',
) => {
  const url = `${Config.OPEN_WEATHER_BASE_URL}/weather?id=${cityId}&appid=${Config.OPEN_WEATHER_API_KEY}&units=${unit}`;

  try {
    const response = await axios.get<CityWeather>(url);

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error.message);
    }
  }
};

export const useGetWeatherDetails = (
  cityId: string,
  unit: TemperatureUnit = 'imperial',
) =>
  useQuery({
    queryKey: ['weatherDetails', cityId, unit],
    queryFn: () => fetchWeatherDetails(cityId, unit),
  });
