import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = {
  liters: number;
};

export function VolumeBadge({ liters }: Props) {
  return (
    <View style={styles.badge}>
      <Text style={styles.text}>{liters} л</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: '#E7F3EC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  text: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: '700',
  },
});
