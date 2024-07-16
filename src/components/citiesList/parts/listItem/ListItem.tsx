import {
  Box,
  ChevronRightIcon,
  HStack,
  Icon,
  Image,
  Pressable,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {getIconUrl} from '@src/utils';
import {FC} from 'react';

interface ListItemProps {
  cityName: string;
  weatherCondition: string;
  temperature: string;
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
      <HStack alignItems="center" justifyContent="space-between" mr="$4">
        <HStack alignItems="center">
          <Image
            source={{uri: iconUrl}}
            size="sm"
            alt="Weather condition icon"
            testID="ListItem-icon"
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
          <Icon as={ChevronRightIcon} size="xl" color="$trueGray600" ml="$2" />
        </HStack>
      </HStack>
    </Pressable>
  );
};
