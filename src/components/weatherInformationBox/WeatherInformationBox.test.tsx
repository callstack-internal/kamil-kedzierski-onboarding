import React from 'react';

import {render} from '@src/tests';
import {WeatherInformationBox} from './WeatherInformationBox';

describe('WeatherInformationBox', () => {
  //TODO I'll replace this with faker in the next PR
  const defaultProps = {
    iconUrl: 'https://example.com/weather-icon.png',
    cityName: 'New York',
    weatherCondition: 'Cloudy',
    temperature: 75,
  };

  it('renders correctly with default props', () => {
    const utils = render(<WeatherInformationBox {...defaultProps} />);

    expect(utils.getByText('New York')).toBeTruthy();
    expect(utils.getByText('Cloudy')).toBeTruthy();
    expect(utils.getByText('75 °F')).toBeTruthy();
  });

  it('displays the correct city name and weather condition', () => {
    const utils = render(
      <WeatherInformationBox
        {...defaultProps}
        cityName="Los Angeles"
        weatherCondition="Sunny"
      />,
    );

    expect(utils.getByText('Los Angeles')).toBeTruthy();
    expect(utils.getByText('Sunny')).toBeTruthy();
  });

  it('displays the correct temperature', () => {
    const utils = render(
      <WeatherInformationBox {...defaultProps} temperature={88} />,
    );

    expect(utils.getByText('88 °F')).toBeTruthy();
  });
});
