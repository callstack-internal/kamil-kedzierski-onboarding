import {
  Box,
  ChevronRightIcon,
  HStack,
  Icon,
  Pressable,
} from '@gluestack-ui/themed';
import {Separator} from '@src/components/separator';
import {WeatherInformationBox} from '@src/components/weatherInformationBox';
import {CityWeather} from '@src/types/api';
import {getIconUrl} from '@src/utils';
import {FC} from 'react';

interface CurrentLocationWeatherBoxProps {
  data?: CityWeather | null;
  onPress: () => void;
}

export const CurrentLocationWeatherBox: FC<CurrentLocationWeatherBoxProps> = ({
  data,
  onPress,
}) => {
  if (!data) {
    return null;
  }
  const iconUrl = getIconUrl(data.weather[0].icon);
  //TODO: Implement some fancy effect when item is pressed
  return (
    <>
      <Pressable onPress={onPress} testID="CurrentLocationWeatherBox-pressable">
        <HStack alignItems="center" w="100%" justifyContent="space-between">
          <Box flex={1}>
            <WeatherInformationBox
              iconUrl={iconUrl}
              cityName={data.name}
              temperature={data.main.temp}
              weatherCondition={data.weather[0].description}
              isCurrentLocation
            />
          </Box>
          <Icon as={ChevronRightIcon} size="xl" color="$trueGray600" mr="$3" />
        </HStack>
      </Pressable>
      <Separator />
    </>
  );
};
