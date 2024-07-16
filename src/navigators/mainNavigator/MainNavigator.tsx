import {Text} from '@gluestack-ui/themed';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationHeader} from '@src/components/navigationHeader';
import {HomeScreen} from '@src/screens';

const Stack = createNativeStackNavigator();

export const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: () => (
            <NavigationHeader>
              <Text color="$black" bold size="2xl" textAlign="center">
                Weather
              </Text>
            </NavigationHeader>
          ),
        }}
      />
    </Stack.Navigator>
  );
};
