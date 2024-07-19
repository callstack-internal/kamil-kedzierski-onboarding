import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {generateMockCityWeather} from '@src/api/mocks/data';
import {cities} from '@src/shared/constants';
import {render} from '@src/tests';
import {WeatherDetailsScreen} from './WeatherDetailsScreen';
import {
  setupEmptyDataWeatherDetailsHandler,
  setupFailureWeatherDetailsHandler,
  setupSuccessWeatherDetailsHandler,
} from './WeatherDetailsScreen.msw';

const Stack = createNativeStackNavigator();
const cityWeatherResponseData = generateMockCityWeather();

describe('WeatherDetailsScreen', () => {
  const Component = () => (
    <Stack.Navigator>
      <Stack.Screen
        name="WeatherDetails"
        component={WeatherDetailsScreen}
        initialParams={{cityId: cities[0]}}
      />
    </Stack.Navigator>
  );

  describe('when successful backend response', () => {
    beforeEach(() =>
      setupSuccessWeatherDetailsHandler(cityWeatherResponseData),
    );
    it('displays proper data', async () => {
      const utils = render(<Component />);

      expect(await utils.findByText(cityWeatherResponseData.name)).toBeTruthy();
    });
  });

  describe('when request returns no data', () => {
    beforeEach(() => setupEmptyDataWeatherDetailsHandler());
    it('renders no data message', async () => {
      const utils = render(<Component />);

      expect(await utils.findByText('No data found')).toBeTruthy();
    });
  });

  describe('when request failed', () => {
    beforeEach(() => setupFailureWeatherDetailsHandler());
    it('renders error message', async () => {
      const utils = render(<Component />);

      expect(
        await utils.findByText(
          'Failed to load weather details. Please try again later.',
        ),
      ).toBeTruthy();
    });
  });
});
