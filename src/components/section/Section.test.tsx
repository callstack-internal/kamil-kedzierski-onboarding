import {render} from '@src/tests';
import {Section} from './Section';

describe('Section', () => {
  it('renders correctly with mandatory props', () => {
    const utils = render(<Section label="Temperature" value={25} />);
    expect(utils.getByText('Temperature')).toBeTruthy();
    expect(utils.getByText('25')).toBeTruthy();
  });

  it('displays the unit when provided', () => {
    const utils = render(<Section label="Temperature" value={25} unit="°C" />);
    expect(utils.getByText('°C')).toBeTruthy();
  });

  it('conditionally renders the separator based on hasSeparator prop', () => {
    const utils = render(
      <Section label="Temperature" value={25} hasSeparator={false} />,
    );
    // Assuming Separator component has a testID prop for identification
    expect(utils.queryByTestId('Separator')).toBeNull();
  });
});
