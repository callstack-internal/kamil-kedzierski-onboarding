import {TemperatureUnit} from '@src/types';
import {CitiesWeatherResponse} from '@src/types/api';
import axios from 'axios';
import Config from 'react-native-config';

const mockedCityIds = [
  703448, // Kyiv, UA
  692194, // Sumy, UA
  756135, // Warsaw, PL
  3081368, // Wrocław, PL
  3067696, // Prague, CZ
  3077916, // České Budějovice, CZ
  2950159, // Berlin, DE
  2867714, // Munich, DE
  3247449, // Aachen, DE
  5815135, // Washington, US
  5128581, // New York City, US
];

export const fetchWeatherGroup = async (unit: TemperatureUnit = 'imperial') => {
  const url = `${Config.OPEN_WEATHER_BASE_URL}/group?id=${mockedCityIds.join(
    ',',
  )}&appid=${Config.OPEN_WEATHER_API_KEY}&units=${unit}`;

  try {
    const response = await axios.post<CitiesWeatherResponse>(url);

    return response.data;
  } catch (error) {
    console.log(error);
  }
};
