import {fireEvent, render} from '@src/tests';
import {getIconUrl} from '@src/utils';
import {ListItem} from './ListItem';

describe('ListItem', () => {
  const onPressMock = jest.fn();

  //TODO I'll replace this with faker in the next PR
  const defaultProps = {
    cityName: 'Test City',
    weatherCondition: 'Sunny',
    temperature: 75,
    icon: '10d',
    onPress: onPressMock,
  };

  it('renders correctly with given props', () => {
    const utils = render(<ListItem {...defaultProps} />);
    expect(utils.getByText('Test City')).toBeTruthy();
    expect(utils.getByText('Sunny')).toBeTruthy();
    expect(utils.getByText('75 °F')).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const {getByTestId} = render(
      <ListItem {...defaultProps} onPress={onPressMock} />,
    );
    fireEvent.press(getByTestId('ListItem-pressable'));
    expect(onPressMock).toHaveBeenCalled();
  });

  it('displays the correct weather icon URI', () => {
    const utils = render(<ListItem {...defaultProps} />);
    const image = utils.getByTestId('WeatherInformationBox-icon');
    const iconUrl = getIconUrl(defaultProps.icon);
    expect(image.props.source.uri).toBe(iconUrl);
  });

  it('displays the temperature correctly', () => {
    const utils = render(<ListItem {...defaultProps} />);
    expect(utils.getByText(`${defaultProps.temperature} °F`)).toBeTruthy();
  });
});
