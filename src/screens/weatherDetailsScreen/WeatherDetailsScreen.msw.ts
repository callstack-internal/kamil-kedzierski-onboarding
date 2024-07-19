import {server} from '@src/api/mocks/server';
import {CityWeather} from '@src/types/api';
import {http, HttpResponse} from 'msw';

const url = `${process.env.OPEN_WEATHER_BASE_URL}/weather`;

export const setupSuccessWeatherDetailsHandler = (
  cityWeatherResponseData: CityWeather,
) => {
  server.use(
    http.get(url, () => {
      return HttpResponse.json(cityWeatherResponseData);
    }),
  );
};

export const setupFailureWeatherDetailsHandler = () => {
  server.use(
    http.get(url, () => {
      return HttpResponse.json(null, {status: 500});
    }),
  );
};

export const setupEmptyDataWeatherDetailsHandler = () => {
  server.use(
    http.get(url, () => {
      return HttpResponse.json(null, {status: 200});
    }),
  );
};
