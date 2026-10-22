import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { CollectProvider } from './src/data/CollectContext';
import { CollectNavigator } from './src/navigation/CollectNavigator';

// native-stack + screens on web often blanks / loops; use JS views instead
if (Platform.OS === 'web') {
  enableScreens(false);
}

export default function App() {
  return (
    <SafeAreaProvider>
      <CollectProvider>
        <CollectNavigator />
        <StatusBar style="dark" />
      </CollectProvider>
    </SafeAreaProvider>
  );
}
