import {server} from '@src/api/mocks/server';
import {CitiesWeatherResponse} from '@src/types/api';
import {delay, http, HttpResponse} from 'msw';

const url = `${process.env.OPEN_WEATHER_BASE_URL}/group`;

export const setupSuccessCitiesListHandler = (
  citiesWeatherResponse: CitiesWeatherResponse,
  delayTime: number = 0,
) => {
  server.use(
    http.get(url, () => {
      delay(delayTime);
      return HttpResponse.json(citiesWeatherResponse);
    }),
  );
};

export const setupFailureCitiesListHandler = () => {
  server.use(
    http.get(url, () => {
      return HttpResponse.json(null, {status: 500});
    }),
  );
};

export const setupEmptyDataCitiesListHandler = () => {
  server.use(
    http.get(url, () => {
      return HttpResponse.json(null, {status: 200});
    }),
  );
};
