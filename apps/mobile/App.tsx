import { Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import { CollectProvider } from './src/data/CollectContext';
import { PlatformProvider } from './src/data/PlatformContext';
import { RoleProvider } from './src/data/RoleContext';
import { CollectNavigator } from './src/navigation/CollectNavigator';

if (Platform.OS === 'web') {
  enableScreens(false);
}

export default function App() {
  return (
    <SafeAreaProvider>
      <RoleProvider>
        <PlatformProvider>
          <CollectProvider>
            <CollectNavigator />
            <StatusBar style="dark" />
          </CollectProvider>
        </PlatformProvider>
      </RoleProvider>
    </SafeAreaProvider>
  );
}
