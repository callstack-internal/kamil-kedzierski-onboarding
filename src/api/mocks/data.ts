import {faker} from '@faker-js/faker';
import {CitiesWeatherResponse, CityWeather} from '@src/types/api';

export const generateMockCityWeather = (): CityWeather => ({
  coord: {
    lon: faker.location.longitude(),
    lat: faker.location.latitude(),
  },
  weather: [
    {
      id: faker.number.int(),
      main: faker.string.alpha(),
      description: faker.string.alpha(),
      icon: faker.string.alphanumeric(3),
    },
  ],
  main: {
    temp: faker.number.float({min: 280, max: 300}),
    feels_like: faker.number.float({min: 280, max: 300}),
    temp_min: faker.number.float({min: 280, max: 300}),
    temp_max: faker.number.float({min: 280, max: 300}),
    pressure: faker.number.int({min: 1000, max: 1050}),
    sea_level: faker.number.int({min: 1000, max: 1050}),
    grnd_level: faker.number.int({min: 1000, max: 1050}),
    humidity: faker.number.int({min: 0, max: 100}),
  },
  visibility: faker.number.int({min: 10000, max: 20000}),
  wind: {
    speed: faker.number.float({min: 0, max: 10}),
    deg: faker.number.int({min: 0, max: 360}),
  },
  clouds: {
    all: faker.number.int({min: 0, max: 100}),
  },
  dt: faker.date.past().getTime(),
  sys: {
    country: faker.location.countryCode(),
    timezone: faker.number.int(),
    sunrise: faker.date.past().getTime(),
    sunset: faker.date.future().getTime(),
  },
  id: faker.number.int(),
  name: faker.location.city(),
});

export const generateMockCitiesWeatherResponse = (): CitiesWeatherResponse => {
  const numberOfCities = faker.number.int({min: 2, max: 10});
  const citiesWeatherList = Array.from(
    {length: numberOfCities},
    generateMockCityWeather,
  );

  return {
    cnt: numberOfCities,
    list: citiesWeatherList,
  };
};
