import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HomeScreen} from '@src/screens';
import {WeatherDetailsScreen} from '@src/screens/weatherDetailsScreen';
import {MainStackParamList} from '@src/types/navigation';
import {HomeNavigationHeader} from '../customNavigationHeaders';
import {WeatherDetailsHeader} from '../customNavigationHeaders/WeatherDetailsHeader';

const Stack = createNativeStackNavigator<MainStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          header: HomeNavigationHeader,
        }}
      />
      <Stack.Screen
        name="WeatherDetails"
        component={WeatherDetailsScreen}
        options={{
          header: WeatherDetailsHeader,
        }}
      />
    </Stack.Navigator>
  );
};
