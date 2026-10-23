import { StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { Screen } from '../components/Screen';
import { useCollect } from '../data/CollectContext';
import { usePlatform } from '../data/PlatformContext';
import { useRole } from '../data/RoleContext';
import { ROLE_LABEL, ROLE_SUBTITLE } from '../data/roles';
import { colors } from '../theme';

export function CabinetScreen() {
  const { role, clearRole } = useRole();
  const { offers, demands, routes, shipments } = usePlatform();
  const { surveys } = useCollect();

  if (!role) {
    return null;
  }

  const openOffers = offers.filter((o) => o.status === 'open').length;
  const openDemands = demands.filter((d) => d.status === 'open').length;
  const activeRoutes = routes.filter((r) => r.status !== 'done').length;
  const visitLiters = surveys.reduce((s, v) => s + v.volumeLiters, 0);
  const inTransit = shipments.filter((s) => s.status === 'in_transit').length;

  return (
    <Screen scroll>
      <Text style={styles.eyebrow}>Кабинет</Text>
      <Text style={styles.title}>{ROLE_LABEL[role]}</Text>
      <Text style={styles.subtitle}>{ROLE_SUBTITLE[role]}</Text>

      <Text style={styles.section}>Сводка</Text>
      <View style={styles.stats}>
        <Text style={styles.statLine}>Открытые заявки: {openOffers}</Text>
        <Text style={styles.statLine}>Открытый спрос: {openDemands}</Text>
        <Text style={styles.statLine}>Активные маршруты: {activeRoutes}</Text>
        <Text style={styles.statLine}>Поставки в пути: {inTransit}</Text>
        <Text style={styles.statLine}>Сборы, л: {visitLiters}</Text>
      </View>

      <Text style={styles.section}>Быстрые действия</Text>
      <View style={styles.hint}>
        <Text style={styles.hintText}>
          Пользуйтесь вкладками внизу: заявки, сборы, маршруты и мониторинг
          зависят от вашей роли.
        </Text>
      </View>

      <View style={styles.footer}>
        <AppButton
          label="Сменить кабинет"
          variant="secondary"
          onPress={clearRole}
        />
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  eyebrow: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.4,
    marginBottom: 6,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    marginTop: 6,
    marginBottom: 20,
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 22,
  },
  section: {
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  stats: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    gap: 6,
    marginBottom: 20,
  },
  statLine: {
    fontSize: 15,
    color: colors.text,
  },
  hint: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 24,
  },
  hintText: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  footer: {
    marginTop: 'auto' as unknown as number,
    paddingBottom: 8,
  },
});
