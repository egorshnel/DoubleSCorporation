import { FlatList, StyleSheet, Text, View } from 'react-native';
import { EmptyState } from '../components/EmptyState';
import { Screen } from '../components/Screen';
import { StatusChip } from '../components/StatusChip';
import { VolumeBadge } from '../components/VolumeBadge';
import { usePlatform } from '../data/PlatformContext';
import { colors } from '../theme';

function routeTone(status: string) {
  if (status === 'planned') return 'neutral' as const;
  if (status === 'in_progress') return 'warn' as const;
  return 'ok' as const;
}

function routeLabel(status: string) {
  if (status === 'planned') return 'запланирован';
  if (status === 'in_progress') return 'в пути';
  return 'завершён';
}

export function RoutesScreen() {
  const { routes } = usePlatform();

  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>Маршруты</Text>
      <Text style={styles.subtitle}>
        Логистика сбора молока у хозяйств и пунктов приёма
      </Text>

      <FlatList
        data={routes}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.list}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        ListEmptyComponent={<EmptyState title="Нет маршрутов" />}
        renderItem={({ item }) => {
          const total = item.stops.reduce((s, x) => s + x.plannedUnits, 0);
          return (
            <View style={styles.card}>
              <View style={styles.cardTop}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <VolumeBadge liters={total} />
              </View>
              <StatusChip
                label={routeLabel(item.status)}
                tone={routeTone(item.status)}
              />
              <Text style={styles.meta}>{item.vehicleNote}</Text>
              {item.stops.map((stop, index) => (
                <Text key={stop.pointId} style={styles.stop}>
                  {index + 1}. {stop.pointName} — {stop.plannedUnits} л
                </Text>
              ))}
            </View>
          );
        }}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: { paddingBottom: 0 },
  title: { fontSize: 24, fontWeight: '700', color: colors.text },
  subtitle: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 14,
    color: colors.textMuted,
  },
  list: { paddingBottom: 24, flexGrow: 1 },
  sep: { height: 10 },
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
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    flex: 1,
    fontSize: 16,
    fontWeight: '700',
    color: colors.text,
  },
  meta: { fontSize: 13, color: colors.textMuted },
  stop: { fontSize: 14, color: colors.text, marginTop: 2 },
});
