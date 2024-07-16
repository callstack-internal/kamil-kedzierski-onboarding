import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {NavigationContainer} from '@react-navigation/native';
import {render, RenderOptions} from '@testing-library/react-native';
import {FC, ReactElement} from 'react';

interface AllTheProvidersProps {
  children: React.ReactNode;
}

const AllTheProviders: FC<AllTheProvidersProps> = ({children}) => {
  return (
    <GluestackUIProvider config={config}>
      <NavigationContainer>{children}</NavigationContainer>
    </GluestackUIProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, {wrapper: AllTheProviders, ...options});

// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};
