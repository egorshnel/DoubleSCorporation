import { StyleSheet, Text, View } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppButton } from '../components/AppButton';
import { FarmTypeBadge } from '../components/FarmTypeBadge';
import { Screen } from '../components/Screen';
import { VolumeBadge } from '../components/VolumeBadge';
import { getFarmById } from '../data/mockFarms';
import { FARM_TYPE_LABEL } from '../data/types';
import type {
  CollectTabParamList,
  FarmsStackParamList,
  RootStackParamList,
} from '../navigation/types';
import { colors } from '../theme';

type Props = CompositeScreenProps<
  NativeStackScreenProps<FarmsStackParamList, 'FarmDetail'>,
  CompositeScreenProps<
    BottomTabScreenProps<CollectTabParamList>,
    NativeStackScreenProps<RootStackParamList>
  >
>;

export function FarmDetailScreen({ navigation, route }: Props) {
  const farm = getFarmById(route.params.farmId);

  if (!farm) {
    return (
      <Screen>
        <Text style={styles.missing}>Хозяйство не найдено</Text>
      </Screen>
    );
  }

  return (
    <Screen scroll>
      <Text style={styles.title}>{farm.name}</Text>
      <View style={styles.badgeRow}>
        <FarmTypeBadge type={farm.type} />
        <VolumeBadge liters={farm.volumeLitersTypical} />
        <Text style={styles.badgeHint}>типичный объём</Text>
      </View>

      <View style={styles.card}>
        <Row label="Тип" value={FARM_TYPE_LABEL[farm.type]} />
        <Row label="Контакт" value={farm.contactName} />
        <Row label="Телефон" value={farm.contactPhone} />
        <Row
          label={farm.type === 'producer' ? 'Коровы' : 'Роль'}
          value={
            farm.type === 'producer'
              ? String(farm.cowCount)
              : 'пункт приёма молока'
          }
        />
        <Row label="Сезонность" value={farm.seasonalityNote} />
        <Row label="Потенциал роста" value={farm.growthPotentialNote} />
        <Row
          label="GPS"
          value={`${farm.lat.toFixed(4)}, ${farm.lng.toFixed(4)}`}
        />
      </View>

      <AppButton
        label="Провести опрос"
        onPress={() =>
          navigation.navigate('SurveyForm', { farmId: farm.id })
        }
      />
    </Screen>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.row}>
      <Text style={styles.rowLabel}>{label}</Text>
      <Text style={styles.rowValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  missing: {
    color: colors.textMuted,
    marginTop: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 12,
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  badgeHint: {
    color: colors.textMuted,
    fontSize: 13,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 14,
    marginBottom: 20,
  },
  row: {
    gap: 4,
  },
  rowLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
  },
  rowValue: {
    fontSize: 16,
    color: colors.text,
    lineHeight: 22,
  },
});
