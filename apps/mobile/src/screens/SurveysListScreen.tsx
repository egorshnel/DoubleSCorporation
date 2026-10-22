import { Alert, FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import type { CompositeScreenProps } from '@react-navigation/native';
import type { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmptyState } from '../components/EmptyState';
import { Screen } from '../components/Screen';
import { VolumeBadge } from '../components/VolumeBadge';
import { useCollect } from '../data/CollectContext';
import type {
  CollectTabParamList,
  RootStackParamList,
} from '../navigation/types';
import { colors } from '../theme';

type Props = CompositeScreenProps<
  BottomTabScreenProps<CollectTabParamList, 'Surveys'>,
  NativeStackScreenProps<RootStackParamList>
>;

function formatTime(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function SurveysListScreen({ navigation }: Props) {
  const { surveys, deleteSurvey } = useCollect();
  const total = surveys.reduce((sum, s) => sum + s.volumeLiters, 0);

  const onDelete = (id: string, farmName: string) => {
    Alert.alert('Удалить визит?', `«${farmName}» будет удалён из списка`, [
      { text: 'Отмена', style: 'cancel' },
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: () => deleteSurvey(id),
      },
    ]);
  };

  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>Визиты</Text>
      <Text style={styles.subtitle}>Проверки точек за сессию (mock)</Text>

      <View style={styles.totalCard}>
        <Text style={styles.totalLabel}>Всего устройств</Text>
        <Text style={styles.totalValue}>{total} шт</Text>
      </View>

      <FlatList
        data={surveys}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListEmptyComponent={
          <EmptyState
            title="Пока нет визитов"
            subtitle="Откройте точку и нажмите «Зафиксировать визит»"
          />
        }
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <Text style={styles.farmName}>{item.farmName}</Text>
              <VolumeBadge liters={item.volumeLiters} />
            </View>
            <Text style={styles.meta}>{formatTime(item.collectedAt)}</Text>
            <Text style={styles.note}>{item.qualityNote}</Text>
            <Text style={styles.gps}>
              GPS {item.lat.toFixed(4)}, {item.lng.toFixed(4)}
            </Text>
            <View style={styles.actions}>
              <Pressable
                onPress={() =>
                  navigation.navigate('SurveyForm', {
                    farmId: item.farmId,
                    surveyId: item.id,
                  })
                }
                style={({ pressed }) => [
                  styles.actionBtn,
                  pressed && styles.actionPressed,
                ]}
              >
                <Text style={styles.actionEdit}>Изменить</Text>
              </Pressable>
              <Pressable
                onPress={() => onDelete(item.id, item.farmName)}
                style={({ pressed }) => [
                  styles.actionBtn,
                  pressed && styles.actionPressed,
                ]}
              >
                <Text style={styles.actionDelete}>Удалить</Text>
              </Pressable>
            </View>
          </View>
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    paddingBottom: 0,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 14,
    color: colors.textMuted,
  },
  totalCard: {
    backgroundColor: colors.primary,
    borderRadius: 12,
    padding: 14,
    marginBottom: 12,
  },
  totalLabel: {
    color: 'rgba(255,255,255,0.85)',
    fontSize: 13,
    fontWeight: '600',
  },
  totalValue: {
    marginTop: 4,
    color: '#fff',
    fontSize: 28,
    fontWeight: '700',
  },
  list: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  sep: {
    height: 10,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 6,
  },
  cardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  farmName: {
    flex: 1,
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  meta: {
    fontSize: 13,
    color: colors.textMuted,
  },
  note: {
    fontSize: 14,
    color: colors.text,
  },
  gps: {
    fontSize: 12,
    color: colors.textMuted,
    fontVariant: ['tabular-nums'],
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 8,
  },
  actionBtn: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: colors.bg,
  },
  actionPressed: {
    opacity: 0.7,
  },
  actionEdit: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primary,
  },
  actionDelete: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.danger,
  },
});
