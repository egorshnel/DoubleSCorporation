import { StyleSheet, Text, View } from 'react-native';
import { FARM_TYPE_LABEL, type FarmType } from '../data/types';
import { colors } from '../theme';

type Props = {
  type: FarmType;
};

export function FarmTypeBadge({ type }: Props) {
  const isCollector = type === 'collector';

  return (
    <View style={[styles.badge, isCollector ? styles.collector : styles.producer]}>
      <Text
        style={[
          styles.text,
          isCollector ? styles.collectorText : styles.producerText,
        ]}
      >
        {FARM_TYPE_LABEL[type]}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  producer: {
    backgroundColor: '#E7F3EC',
  },
  collector: {
    backgroundColor: '#F3EDE7',
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
  },
  producerText: {
    color: colors.primary,
  },
  collectorText: {
    color: colors.accent,
  },
});
