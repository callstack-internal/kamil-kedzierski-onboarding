import {config} from '@gluestack-ui/config';
import {GluestackUIProvider, StatusBar} from '@gluestack-ui/themed';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigator} from '@src/navigators';

function App() {
  return (
    <GluestackUIProvider config={config}>
      <StatusBar backgroundColor="$trueGray200" barStyle="dark-content" />
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    </GluestackUIProvider>
  );
}

export default App;
