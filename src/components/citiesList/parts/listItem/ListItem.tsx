import {
  Box,
  ChevronRightIcon,
  HStack,
  Icon,
  Pressable,
} from '@gluestack-ui/themed';
import {WeatherInformationBox} from '@src/components/weatherInformationBox';
import {getIconUrl} from '@src/utils';
import {FC} from 'react';

interface ListItemProps {
  cityName: string;
  weatherCondition: string;
  temperature: number;
  icon: string;
  onPress: () => void;
}

export const ListItem: FC<ListItemProps> = ({
  cityName,
  weatherCondition,
  temperature,
  icon,
  onPress,
}) => {
  const iconUrl = getIconUrl(icon);

  //TODO: Implement some fancy effect when item is pressed
  return (
    <Pressable onPress={onPress} testID="ListItem-pressable">
      <HStack alignItems="center" w="100%" justifyContent="space-between">
        <Box flex={1}>
          <WeatherInformationBox
            iconUrl={iconUrl}
            cityName={cityName}
            temperature={temperature}
            weatherCondition={weatherCondition}
          />
        </Box>

        <Icon as={ChevronRightIcon} size="xl" color="$trueGray600" mr="$3" />
      </HStack>
    </Pressable>
  );
};
