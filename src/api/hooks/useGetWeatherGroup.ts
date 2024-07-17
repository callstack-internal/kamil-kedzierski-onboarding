import {TemperatureUnit} from '@src/types';
import {useQuery} from 'react-query';
import {fetchWeatherGroup} from '../fetchFunctions/fetchWeatherGroup';

export const useGetWeatherGroup = (unit: TemperatureUnit) =>
  useQuery('weatherGroup', () => fetchWeatherGroup(unit));
