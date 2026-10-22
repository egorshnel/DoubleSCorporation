import { StyleSheet, Text, View } from 'react-native';
import type { Farm } from '../data/types';
import { colors } from '../theme';

type Props = {
  farms: Farm[];
  onSelectFarm: (farmId: string) => void;
};

export function FarmsMap(_props: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.text}>
        Карта на вебе отключена. Откройте приложение в Expo Go на телефоне.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  text: {
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 14,
    lineHeight: 20,
  },
});
