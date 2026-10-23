import { useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { AppButton } from '../components/AppButton';
import { AppInput } from '../components/AppInput';
import { EmptyState } from '../components/EmptyState';
import { Screen } from '../components/Screen';
import { StatusChip } from '../components/StatusChip';
import { VolumeBadge } from '../components/VolumeBadge';
import { usePlatform } from '../data/PlatformContext';
import { useRole } from '../data/RoleContext';
import type { DemandRequest, SupplyOffer } from '../data/platformTypes';
import { colors } from '../theme';

const MY_FARM_NAME = 'Моё хозяйство';
const MY_PLANT_NAME = 'Мой завод';

function statusTone(status: string) {
  if (status === 'open') return 'ok' as const;
  if (status === 'matched') return 'warn' as const;
  return 'neutral' as const;
}

function statusLabel(status: string) {
  if (status === 'open') return 'открыта';
  if (status === 'matched') return 'сопоставлена';
  return 'закрыта';
}

function OfferCard({
  item,
  mine,
}: {
  item: SupplyOffer;
  mine?: boolean;
}) {
  return (
    <View style={[styles.card, mine && styles.cardMine]}>
      <View style={styles.cardTop}>
        <Text style={styles.cardTitle}>
          {item.shopName}
          {mine ? ' (ваша)' : ''}
        </Text>
        <VolumeBadge liters={item.units} />
      </View>
      <StatusChip
        label={statusLabel(item.status)}
        tone={statusTone(item.status)}
      />
      <Text style={styles.meta}>{item.conditionNote}</Text>
      <Text style={styles.meta}>{item.scheduleNote}</Text>
    </View>
  );
}

function DemandCard({
  item,
  mine,
}: {
  item: DemandRequest;
  mine?: boolean;
}) {
  return (
    <View style={[styles.card, mine && styles.cardMine]}>
      <View style={styles.cardTop}>
        <Text style={styles.cardTitle}>
          {item.networkName}
          {mine ? ' (ваш)' : ''}
        </Text>
        <VolumeBadge liters={item.units} />
      </View>
      <StatusChip
        label={statusLabel(item.status)}
        tone={statusTone(item.status)}
      />
      <Text style={styles.meta}>{item.paymentNote}</Text>
    </View>
  );
}

export function AggregationScreen() {
  const { role } = useRole();
  const { offers, demands, addOffer, addDemand } = usePlatform();
  const [units, setUnits] = useState('100');
  const [note, setNote] = useState('');
  const [showForm, setShowForm] = useState(false);

  const isProducer = role === 'producer';
  const isProcessor = role === 'processor';
  const isWholesaler = role === 'wholesaler';

  const myOffers = useMemo(
    () => offers.filter((o) => o.shopName === MY_FARM_NAME),
    [offers],
  );
  const myDemands = useMemo(
    () => demands.filter((d) => d.networkName === MY_PLANT_NAME),
    [demands],
  );

  const onSubmit = () => {
    const n = Number(units.replace(',', '.'));
    if (!Number.isFinite(n) || n <= 0) {
      Alert.alert('Проверьте объём', 'Укажите объём молока в литрах');
      return;
    }

    if (isProducer) {
      addOffer({
        shopName: MY_FARM_NAME,
        units: n,
        conditionNote: note.trim() || 'без заметки',
        scheduleNote: 'По согласованию',
      });
      setShowForm(false);
      setUnits('100');
      setNote('');
      Alert.alert(
        'Заявка опубликована',
        `Предложение на ${n} л появилось в блоке «Мои заявки» и видно оптовику в сделках.`,
      );
      return;
    }

    if (isProcessor) {
      addDemand({
        networkName: MY_PLANT_NAME,
        units: n,
        paymentNote: note.trim() || 'условия по договору',
      });
      setShowForm(false);
      setUnits('100');
      setNote('');
      Alert.alert(
        'Спрос опубликован',
        `Запрос на ${n} л появился в блоке «Мой спрос» и виден оптовику.`,
      );
    }
  };

  const pageTitle = isProducer
    ? 'Заявки'
    : isProcessor
      ? 'Спрос'
      : 'Сделки';

  return (
    <Screen scroll>
      <Text style={styles.title}>{pageTitle}</Text>
      <Text style={styles.subtitle}>
        {isWholesaler
          ? 'Заявки хозяйств и спрос переработчиков в одном месте'
          : isProducer
            ? 'Создайте заявку: сколько молока готовы сдать и на каких условиях'
            : 'Создайте спрос: сколько сырья нужно заводу'}
      </Text>

      {(isProducer || isProcessor) && (
        <View style={styles.actions}>
          <AppButton
            label={
              showForm
                ? 'Скрыть форму'
                : isProducer
                  ? 'Новая заявка'
                  : 'Новый спрос'
            }
            variant={showForm ? 'secondary' : 'primary'}
            onPress={() => setShowForm((v) => !v)}
          />
        </View>
      )}

      {showForm && (isProducer || isProcessor) ? (
        <View style={styles.form}>
          <Text style={styles.formHint}>
            {isProducer
              ? 'Заявка = предложение сдать молоко (объём + качество). После публикации она появится ниже и у оптовика во вкладке «Сделки».'
              : 'Спрос = запрос завода на сырое молоко. После публикации он появится ниже и у оптовика.'}
          </Text>
          <AppInput
            label="Объём, л"
            value={units}
            onChangeText={setUnits}
            keyboardType="decimal-pad"
          />
          <AppInput
            label={isProducer ? 'Качество / охлаждение' : 'Условия оплаты'}
            value={note}
            onChangeText={setNote}
            placeholder={
              isProducer ? 'жирность, температура...' : 'предоплата, отсрочка...'
            }
          />
          <AppButton
            label={isProducer ? 'Опубликовать заявку' : 'Опубликовать спрос'}
            onPress={onSubmit}
          />
        </View>
      ) : null}

      {isProducer ? (
        <>
          <Text style={styles.section}>Мои заявки</Text>
          {myOffers.length === 0 ? (
            <EmptyState
              title="Пока нет ваших заявок"
              subtitle="Нажмите «Новая заявка» и укажите объём молока"
            />
          ) : (
            <View style={styles.stack}>
              {myOffers.map((item) => (
                <OfferCard key={item.id} item={item} mine />
              ))}
            </View>
          )}
        </>
      ) : null}

      {isProcessor ? (
        <>
          <Text style={styles.section}>Мой спрос</Text>
          {myDemands.length === 0 ? (
            <EmptyState
              title="Пока нет вашего спроса"
              subtitle="Нажмите «Новый спрос» и укажите нужный объём"
            />
          ) : (
            <View style={styles.stack}>
              {myDemands.map((item) => (
                <DemandCard key={item.id} item={item} mine />
              ))}
            </View>
          )}
        </>
      ) : null}

      <Text style={styles.section}>Все предложения производителей</Text>
      {offers.length === 0 ? (
        <EmptyState title="Нет предложений" />
      ) : (
        <View style={styles.stack}>
          {offers.map((item) => (
            <OfferCard
              key={item.id}
              item={item}
              mine={item.shopName === MY_FARM_NAME}
            />
          ))}
        </View>
      )}

      <Text style={styles.section}>Весь спрос переработчиков</Text>
      {demands.length === 0 ? (
        <EmptyState title="Нет спроса" />
      ) : (
        <View style={styles.stack}>
          {demands.map((item) => (
            <DemandCard
              key={item.id}
              item={item}
              mine={item.networkName === MY_PLANT_NAME}
            />
          ))}
        </View>
      )}
    </Screen>
  );
}

const styles = StyleSheet.create({
  title: { fontSize: 24, fontWeight: '700', color: colors.text },
  subtitle: {
    marginTop: 4,
    marginBottom: 12,
    fontSize: 14,
    color: colors.textMuted,
    lineHeight: 20,
  },
  actions: { marginBottom: 12 },
  form: {
    gap: 12,
    marginBottom: 16,
    padding: 14,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  formHint: {
    fontSize: 13,
    color: colors.textMuted,
    lineHeight: 18,
  },
  section: {
    marginTop: 12,
    marginBottom: 8,
    fontSize: 13,
    fontWeight: '700',
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  stack: { gap: 8, marginBottom: 8 },
  card: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 6,
  },
  cardMine: {
    borderColor: colors.primary,
    backgroundColor: '#E7F3EC',
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 8,
  },
  cardTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },
  meta: { fontSize: 13, color: colors.textMuted },
});
