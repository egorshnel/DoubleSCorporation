import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Screen } from '../components/Screen';
import { useRole } from '../data/RoleContext';
import {
  ROLE_LABEL,
  ROLE_SUBTITLE,
  type PlatformRole,
} from '../data/roles';
import { colors } from '../theme';

const ROLES: PlatformRole[] = ['producer', 'wholesaler', 'processor'];

export function RoleSelectScreen() {
  const { setRole } = useRole();

  return (
    <Screen scroll>
      <Text style={styles.brand}>Смарт сүт</Text>
      <Text style={styles.title}>Выберите кабинет</Text>
      <Text style={styles.subtitle}>
        Платформа связывает производителя сырого молока, оптовика и
        переработчика.
      </Text>

      <View style={styles.roles}>
        {ROLES.map((item) => (
          <Pressable
            key={item}
            onPress={() => setRole(item)}
            style={({ pressed }) => [
              styles.roleCard,
              pressed && styles.rolePressed,
            ]}
          >
            <Text style={styles.roleTitle}>{ROLE_LABEL[item]}</Text>
            <Text style={styles.roleSub}>{ROLE_SUBTITLE[item]}</Text>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  brand: {
    fontSize: 14,
    fontWeight: '700',
    color: colors.primary,
    textTransform: 'uppercase',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },
  subtitle: {
    marginTop: 8,
    marginBottom: 24,
    fontSize: 15,
    color: colors.textMuted,
    lineHeight: 22,
  },
  roles: {
    gap: 12,
  },
  roleCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 16,
    gap: 6,
  },
  rolePressed: {
    borderColor: colors.primary,
    backgroundColor: '#E7F3EC',
  },
  roleTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
  },
  roleSub: {
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
});
