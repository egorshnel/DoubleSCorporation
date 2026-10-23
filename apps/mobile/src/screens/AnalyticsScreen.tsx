import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { StatusChip } from '../components/StatusChip';
import { useCollect } from '../data/CollectContext';
import { usePlatform } from '../data/PlatformContext';
import { useRole } from '../data/RoleContext';
import { ROLE_LABEL } from '../data/roles';
import { colors } from '../theme';

function shipLabel(status: string) {
  const map: Record<string, string> = {
    pending: 'ожидает',
    in_transit: 'в пути',
    delivered: 'доставлено',
    accepted: 'принято',
    rejected: 'отклонено',
  };
  return map[status] ?? status;
}

function shipTone(status: string) {
  if (status === 'accepted') return 'ok' as const;
  if (status === 'rejected') return 'danger' as const;
  if (status === 'in_transit' || status === 'delivered') return 'warn' as const;
  return 'neutral' as const;
}

export function AnalyticsScreen() {
  const { role } = useRole();
  const { offers, demands, routes, shipments } = usePlatform();
  const { surveys } = useCollect();

  const openOffers = offers.filter((o) => o.status === 'open').length;
  const openDemands = demands.filter((d) => d.status === 'open').length;
  const offerUnits = offers.reduce((s, o) => s + o.units, 0);
  const demandUnits = demands.reduce((s, d) => s + d.units, 0);
  const visitUnits = surveys.reduce((s, v) => s + v.volumeLiters, 0);
  const activeRoutes = routes.filter((r) => r.status !== 'done').length;

  return (
    <Screen>
      <Text style={styles.title}>Мониторинг</Text>
      <Text style={styles.subtitle}>
        Аналитика
        {role ? ` для роли «${ROLE_LABEL[role]}»` : ''}
      </Text>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.grid}>
          <Stat label="Открытые заявки" value={String(openOffers)} />
          <Stat label="Открытый спрос" value={String(openDemands)} />
          <Stat label="Предложено, л" value={String(offerUnits)} />
          <Stat label="Спрос, л" value={String(demandUnits)} />
          <Stat label="Активные маршруты" value={String(activeRoutes)} />
          <Stat label="Сборы, л" value={String(visitUnits)} />
        </View>

        <Text style={styles.section}>Поставки</Text>
        {shipments.map((item) => (
          <View key={item.id} style={styles.card}>
            <Text style={styles.cardTitle}>
              {item.fromName} → {item.toName}
            </Text>
            <View style={styles.row}>
              <StatusChip
                label={shipLabel(item.status)}
                tone={shipTone(item.status)}
              />
              <Text style={styles.units}>{item.units} л</Text>
            </View>
            <Text style={styles.meta}>{item.qualityNote}</Text>
          </View>
        ))}
      </ScrollView>
    </Screen>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.stat}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700', color: colors.text },
  subtitle: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 14,
    color: colors.textMuted,
  },
  content: { paddingBottom: 24, gap: 10 },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  stat: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 4,
  },
  statValue: {
    fontSize: 22,
    fontWeight: '700',
    color: colors.primary,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  section: {
    marginTop: 8,
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 6,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  units: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.text,
  },
  meta: { fontSize: 13, color: colors.textMuted },
});
