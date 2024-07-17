import {TemperatureUnit} from '@src/types';
import {useQuery} from '@tanstack/react-query';
import {fetchWeatherGroup} from '../fetchFunctions/fetchWeatherGroup';

export const useGetWeatherGroup = (unit: TemperatureUnit) =>
  useQuery({
    queryKey: ['weatherGroup'],
    queryFn: () => fetchWeatherGroup(unit),
  });
