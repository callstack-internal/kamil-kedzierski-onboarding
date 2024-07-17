import {Box, HStack, Image, Text, VStack} from '@gluestack-ui/themed';
import {FC} from 'react';

interface WeatherInformationBoxProps {
  iconUrl: string;
  cityName: string;
  weatherCondition: string;
  temperature: number;
}

export const WeatherInformationBox: FC<WeatherInformationBoxProps> = ({
  iconUrl,
  cityName,
  weatherCondition,
  temperature,
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
          <Text fontWeight="$medium">{cityName}</Text>
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
