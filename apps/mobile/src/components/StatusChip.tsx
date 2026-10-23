import { StyleSheet, Text, View } from 'react-native';
import { colors } from '../theme';

type Props = {
  label: string;
  tone?: 'neutral' | 'ok' | 'warn' | 'danger';
};

export function StatusChip({ label, tone = 'neutral' }: Props) {
  return (
    <View style={[styles.chip, styles[tone]]}>
      <Text style={[styles.text, styles[`${tone}Text` as const]]}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
  neutral: { backgroundColor: '#EEF1F0' },
  ok: { backgroundColor: '#E7F3EC' },
  warn: { backgroundColor: '#F3EDE7' },
  danger: { backgroundColor: '#F8E8E6' },
  neutralText: { color: colors.textMuted },
  okText: { color: colors.primary },
  warnText: { color: colors.accent },
  dangerText: { color: colors.danger },
});
