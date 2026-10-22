import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors } from '../theme';

type Props = {
  title: string;
  onBack?: () => void;
};

export function AppHeader({ title, onBack }: Props) {
  const insets = useSafeAreaInsets();
  const paddingTop =
    Platform.OS === 'web' ? 12 : Math.max(insets.top, 8);

  return (
    <View style={[styles.wrap, { paddingTop }]}>
      <View style={styles.row}>
        {onBack ? (
          <Pressable
            accessibilityRole="button"
            onPress={onBack}
            style={({ pressed }) => [styles.backBtn, pressed && styles.pressed]}
            hitSlop={8}
          >
            <Text style={styles.backText}>‹ Назад</Text>
          </Pressable>
        ) : (
          <View style={styles.side} />
        )}
        <Text style={styles.title} numberOfLines={1}>
          {title}
        </Text>
        <View style={styles.side} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    backgroundColor: colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    paddingBottom: 10,
    paddingHorizontal: 8,
  },
  row: {
    minHeight: 40,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backBtn: {
    minWidth: 72,
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  pressed: {
    opacity: 0.6,
  },
  backText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 17,
    fontWeight: '700',
    color: colors.text,
    paddingHorizontal: 4,
  },
  side: {
    minWidth: 72,
  },
});
