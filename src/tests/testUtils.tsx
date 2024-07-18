import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {NavigationContainer} from '@react-navigation/native';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {render, RenderOptions} from '@testing-library/react-native';
import {FC, ReactElement} from 'react';

interface AllTheProvidersProps {
  children: React.ReactNode;
}

const queryClient = new QueryClient();

const AllTheProviders: FC<AllTheProvidersProps> = ({children}) => {
  return (
    <QueryClientProvider client={queryClient}>
      <GluestackUIProvider config={config}>
        <NavigationContainer>{children}</NavigationContainer>
      </GluestackUIProvider>
    </QueryClientProvider>
  );
};

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'queries'>,
) => render(ui, {wrapper: AllTheProviders, ...options});

afterEach(() => {
  queryClient.clear();
});
// re-export everything
export * from '@testing-library/react-native';

// override render method
export {customRender as render};
