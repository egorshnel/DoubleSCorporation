import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { Farm } from '../data/types';
import { colors } from '../theme';
import { FarmTypeBadge } from './FarmTypeBadge';
import { VolumeBadge } from './VolumeBadge';

type Props = {
  farm: Farm;
  onPress: () => void;
};

export function FarmListItem({ farm, onPress }: Props) {
  const meta =
    farm.type === 'producer'
      ? `${farm.cowCount} коров · ${farm.contactName}`
      : farm.contactName;

  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [styles.row, pressed && styles.pressed]}
    >
      <View style={styles.main}>
        <FarmTypeBadge type={farm.type} />
        <Text style={styles.name}>{farm.name}</Text>
        <Text style={styles.meta}>{meta}</Text>
      </View>
      <VolumeBadge liters={farm.volumeLitersTypical} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    paddingVertical: 14,
  },
  pressed: {
    backgroundColor: colors.bg,
  },
  main: {
    flex: 1,
    gap: 6,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  meta: {
    fontSize: 13,
    color: colors.textMuted,
  },
});
