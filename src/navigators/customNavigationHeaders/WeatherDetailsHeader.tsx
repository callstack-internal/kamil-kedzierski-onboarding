import {
  Box,
  ChevronLeftIcon,
  HStack,
  Icon,
  Pressable,
  Text,
} from '@gluestack-ui/themed';
import {NativeStackHeaderProps} from '@react-navigation/native-stack';
import {NavigationHeader} from '@src/components/navigationHeader';

export const WeatherDetailsHeader = (props: NativeStackHeaderProps) => {
  return (
    <NavigationHeader>
      <HStack justifyContent="space-between" alignItems="center">
        <Pressable
          onPress={() =>
            props.navigation.canGoBack() ? props.navigation.goBack() : null
          }>
          <HStack alignItems="center" width="$9">
            <Icon as={ChevronLeftIcon} size="xl" color="$trueGray600" ml="$3" />
            <Text>Back</Text>
          </HStack>
        </Pressable>
        <Text color="$black" bold size="2xl" textAlign="center">
          Details
        </Text>
        <Box width="$9" />
      </HStack>
    </NavigationHeader>
  );
};
