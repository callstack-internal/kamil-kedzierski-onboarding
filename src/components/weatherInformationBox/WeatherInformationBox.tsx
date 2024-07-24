import {Box, HStack, Icon, Image, Text, VStack} from '@gluestack-ui/themed';
import {MapPin} from 'lucide-react-native';
import {FC} from 'react';

interface WeatherInformationBoxProps {
  iconUrl: string;
  cityName: string;
  weatherCondition: string;
  temperature: number;
  isCurrentLocation?: boolean;
}

export const WeatherInformationBox: FC<WeatherInformationBoxProps> = ({
  iconUrl,
  cityName,
  weatherCondition,
  temperature,
  isCurrentLocation = false,
}) => {
  return (
    <HStack alignItems="center" justifyContent="space-between" mr="$4">
      <HStack alignItems="center">
        <Image
          source={{uri: iconUrl}}
          size="sm"
          alt="Weather condition icon"
          testID="WeatherInformationBox-icon"
        />
        <VStack>
          <HStack alignItems="center">
            <Text fontWeight="$medium">{cityName}</Text>
            {!!isCurrentLocation && (
              <Icon as={MapPin} size="xs" color="$blue500" ml="$1" />
            )}
          </HStack>
          <Text fontSize="$sm">{weatherCondition}</Text>
        </VStack>
      </HStack>
      <HStack alignItems="center">
        <Box backgroundColor="$info500" py="$1.5" px="$3" borderRadius="$2xl">
          {/* TODO: Implement temperature unit selection */}
          <Text color="$white">{temperature} °F</Text>
        </Box>
      </HStack>
    </HStack>
  );
};
