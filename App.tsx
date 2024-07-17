import {config} from '@gluestack-ui/config';
import {GluestackUIProvider, StatusBar} from '@gluestack-ui/themed';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import {MainNavigator} from '@src/navigators';
import {QueryClient, QueryClientProvider} from 'react-query';

function App() {
  const queryClient = new QueryClient();

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: config.tokens.colors.white,
    },
  };
  return (
    <GluestackUIProvider config={config}>
      <StatusBar backgroundColor="$trueGray200" barStyle="dark-content" />
      <QueryClientProvider client={queryClient}>
        <NavigationContainer theme={MyTheme}>
          <MainNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    </GluestackUIProvider>
  );
}

export default App;
