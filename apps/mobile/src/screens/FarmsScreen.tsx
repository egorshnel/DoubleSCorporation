import { useMemo, useState } from 'react';
import {
  FlatList,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { EmptyState } from '../components/EmptyState';
import { FarmListItem } from '../components/FarmListItem';
import { FarmsMap } from '../components/FarmsMap';
import { Screen } from '../components/Screen';
import { filterFarms, type FarmFilter } from '../data/filterFarms';
import { MOCK_FARMS } from '../data/mockFarms';
import type { FarmsStackParamList } from '../navigation/types';
import { colors } from '../theme';

type Props = NativeStackScreenProps<FarmsStackParamList, 'FarmsHome'>;

type Mode = 'list' | 'map';

const FILTERS: { key: FarmFilter; label: string }[] = [
  { key: 'all', label: 'Все' },
  { key: 'producers', label: 'Магазины' },
  { key: 'collectors', label: 'Скупка' },
  { key: 'small', label: 'Мелкие <5' },
];

const HEADER: Record<FarmFilter, { title: string; subtitle: string }> = {
  all: {
    title: 'Точки',
    subtitle: 'Магазины телефонов и пункты скупки',
  },
  producers: {
    title: 'Магазины',
    subtitle: 'Точки продажи смартфонов',
  },
  collectors: {
    title: 'Скупка',
    subtitle: 'Пункты приёма б/у устройств',
  },
  small: {
    title: 'Мелкие салоны',
    subtitle: 'Магазины с менее чем 5 сотрудниками',
  },
};

export function FarmsScreen({ navigation }: Props) {
  const [mode, setMode] = useState<Mode>('list');
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<FarmFilter>('all');
  const mapSupported = Platform.OS !== 'web';

  const farms = useMemo(
    () => filterFarms(MOCK_FARMS, query, filter),
    [query, filter],
  );
  const header = HEADER[filter];

  return (
    <Screen style={styles.screen}>
      <Text style={styles.title}>{header.title}</Text>
      <Text style={styles.subtitle}>{header.subtitle}</Text>

      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Поиск по имени или контакту"
        placeholderTextColor={colors.textMuted}
        style={styles.search}
        autoCorrect={false}
        clearButtonMode="while-editing"
      />

      <View style={styles.filters}>
        {FILTERS.map((item) => {
          const active = filter === item.key;
          return (
            <Pressable
              key={item.key}
              onPress={() => setFilter(item.key)}
              style={[styles.chip, active && styles.chipActive]}
            >
              <Text style={[styles.chipText, active && styles.chipTextActive]}>
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.toggle}>
        <Pressable
          onPress={() => setMode('list')}
          style={[styles.toggleBtn, mode === 'list' && styles.toggleActive]}
        >
          <Text
            style={[
              styles.toggleText,
              mode === 'list' && styles.toggleTextActive,
            ]}
          >
            Список
          </Text>
        </Pressable>
        <Pressable
          onPress={() => mapSupported && setMode('map')}
          style={[
            styles.toggleBtn,
            mode === 'map' && styles.toggleActive,
            !mapSupported && styles.toggleDisabled,
          ]}
        >
          <Text
            style={[
              styles.toggleText,
              mode === 'map' && styles.toggleTextActive,
            ]}
          >
            Карта
          </Text>
        </Pressable>
      </View>

      <Text style={styles.count}>Найдено: {farms.length}</Text>

      {mode === 'map' && mapSupported ? (
        farms.length === 0 ? (
          <EmptyState
            title="Ничего не найдено"
            subtitle="Сбросьте фильтр или измените поиск"
          />
        ) : (
          <FarmsMap
            farms={farms}
            onSelectFarm={(farmId) =>
              navigation.navigate('FarmDetail', { farmId })
            }
          />
        )
      ) : (
        <FlatList
          data={farms}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          ItemSeparatorComponent={() => <View style={styles.sep} />}
          ListEmptyComponent={
            <EmptyState
              title="Ничего не найдено"
              subtitle="Сбросьте фильтр или измените поиск"
            />
          }
          renderItem={({ item }) => (
            <FarmListItem
              farm={item}
              onPress={() =>
                navigation.navigate('FarmDetail', { farmId: item.id })
              }
            />
          )}
          ListFooterComponent={
            !mapSupported ? (
              <Text style={styles.webHint}>
                Карта доступна в Expo Go на телефоне
              </Text>
            ) : (
              <View />
            )
          }
        />
      )}
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
  search: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: colors.surface,
    color: colors.text,
    fontSize: 16,
    marginBottom: 10,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  chipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  chipText: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.textMuted,
  },
  chipTextActive: {
    color: '#fff',
  },
  toggle: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    marginBottom: 8,
    padding: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  toggleActive: {
    backgroundColor: colors.primary,
  },
  toggleDisabled: {
    opacity: 0.45,
  },
  toggleText: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textMuted,
  },
  toggleTextActive: {
    color: '#fff',
  },
  count: {
    marginBottom: 8,
    fontSize: 13,
    color: colors.textMuted,
  },
  list: {
    paddingBottom: 24,
    flexGrow: 1,
  },
  sep: {
    height: 10,
  },
  webHint: {
    marginTop: 16,
    textAlign: 'center',
    color: colors.textMuted,
    fontSize: 13,
  },
});
