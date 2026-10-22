import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CollectProvider } from './src/data/CollectContext';
import { CollectNavigator } from './src/navigation/CollectNavigator';

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
