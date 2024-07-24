import {Text} from '@gluestack-ui/themed';
import {NavigationHeader} from '@src/components/navigationHeader';

export const HomeNavigationHeader = () => {
  return (
    <NavigationHeader>
      <Text color="$black" bold size="2xl" textAlign="center">
        Weather
      </Text>
    </NavigationHeader>
  );
};
