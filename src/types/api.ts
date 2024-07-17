type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type MainWeatherData = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  sea_level: number;
  grnd_level: number;
  humidity: number;
};

type Wind = {
  speed: number;
  deg: number;
};

type Clouds = {
  all: number;
};

type Sys = {
  country: string;
  timezone: number;
  sunrise: number;
  sunset: number;
};

type Coord = {
  lon: number;
  lat: number;
};

export type CityWeather = {
  coord: Coord;
  sys: Sys;
  weather: Weather[];
  main: MainWeatherData;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  id: number;
  name: string;
};

export type CitiesWeatherResponse = {
  cnt: number;
  list: CityWeather[];
};
