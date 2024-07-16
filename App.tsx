import {config} from '@gluestack-ui/config';
import {GluestackUIProvider} from '@gluestack-ui/themed';
import {MainNavigator} from '@src/navigators';
import {SafeAreaProvider} from 'react-native-safe-area-context';

function App() {
  return (
    <SafeAreaProvider>
      <GluestackUIProvider config={config}>
        <MainNavigator />
      </GluestackUIProvider>
    </SafeAreaProvider>
  );
}

export default App;
