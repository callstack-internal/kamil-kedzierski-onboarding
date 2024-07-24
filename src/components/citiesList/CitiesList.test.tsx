import {generateMockCitiesWeatherResponse} from '@src/api/mocks/data';
import {fireEvent, render, waitFor} from '@src/tests';
import {CitiesList} from './CitiesList';
import {
  setupEmptyDataCitiesListHandler,
  setupFailureCitiesListHandler,
  setupSuccessCitiesListHandler,
} from './CitiesList.msw';

const citiesWeatherResponseData = generateMockCitiesWeatherResponse();

const mockNavigate = jest.fn();
jest.mock('@react-navigation/native', () => {
  const actualNav = jest.requireActual('@react-navigation/native');
  return {
    ...actualNav,
    useNavigation: () => ({
      navigate: mockNavigate,
    }),
  };
});

describe('CitiesList', () => {
  describe('when successful backend response', () => {
    beforeEach(() => setupSuccessCitiesListHandler(citiesWeatherResponseData));

    it('renders correctly', async () => {
      const utils = render(<CitiesList />);

      expect(
        await utils.findByText(citiesWeatherResponseData.list[0].name),
      ).toBeTruthy();
      expect(
        await utils.findByText(citiesWeatherResponseData.list[1].name),
      ).toBeTruthy();
    });

    it('navigates to WeatherDetails on press', async () => {
      const utils = render(<CitiesList />);

      fireEvent.press(
        await utils.findByText(citiesWeatherResponseData.list[0].name),
      );
      await waitFor(() =>
        expect(mockNavigate).toHaveBeenCalledWith('WeatherDetails', {
          cityId: citiesWeatherResponseData.list[0].id.toString(),
        }),
      );
    });
  });

  describe('when response failed', () => {
    beforeEach(() => setupFailureCitiesListHandler());

    it('renders error message', async () => {
      const utils = render(<CitiesList />);

      expect(
        await utils.findByText('Failed to load. Please try again later.'),
      ).toBeTruthy();
    });
  });

  describe('when request returns no data', () => {
    beforeEach(() => setupEmptyDataCitiesListHandler());

    it('renders no data message', async () => {
      const utils = render(<CitiesList />);

      expect(await utils.findByText('No data')).toBeTruthy();
    });
  });
});
