import { useEffect, useMemo, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import * as Location from 'expo-location';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppButton } from '../components/AppButton';
import { AppInput } from '../components/AppInput';
import { Screen } from '../components/Screen';
import { useCollect } from '../data/CollectContext';
import { getFarmById } from '../data/mockFarms';
import type { RootStackParamList } from '../navigation/types';
import { colors } from '../theme';
import { parseVolumeLiters } from '../utils/surveyValidation';

type Props = NativeStackScreenProps<RootStackParamList, 'SurveyForm'>;

export function SurveyFormScreen({ navigation, route }: Props) {
  const { farmId, surveyId } = route.params;
  const farm = getFarmById(farmId);
  const { addSurvey, updateSurvey, getSurveyById } = useCollect();
  const existing = surveyId ? getSurveyById(surveyId) : undefined;
  const isEdit = Boolean(surveyId && existing);

  const [volume, setVolume] = useState(
    existing
      ? String(existing.volumeLiters)
      : farm
        ? String(farm.volumeLitersTypical)
        : '',
  );
  const [qualityNote, setQualityNote] = useState(
    existing?.qualityNote === 'без заметки' ? '' : (existing?.qualityNote ?? ''),
  );
  const [lat, setLat] = useState(existing?.lat ?? farm?.lat ?? 0);
  const [lng, setLng] = useState(existing?.lng ?? farm?.lng ?? 0);
  const [gpsStatus, setGpsStatus] = useState(
    existing ? 'Координаты опроса' : 'Координаты хозяйства',
  );
  const [touchedVolume, setTouchedVolume] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (isEdit) {
      return;
    }

    let cancelled = false;

    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        if (!cancelled) {
          setGpsStatus('Нет доступа к GPS — используем координаты хозяйства');
        }
        return;
      }

      try {
        const pos = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.Balanced,
        });
        if (!cancelled) {
          setLat(pos.coords.latitude);
          setLng(pos.coords.longitude);
          setGpsStatus('GPS устройства зафиксирован');
        }
      } catch {
        if (!cancelled) {
          setGpsStatus('GPS недоступен — координаты хозяйства');
        }
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [isEdit]);

  const volumeResult = useMemo(() => parseVolumeLiters(volume), [volume]);
  const volumeError =
    touchedVolume && !volumeResult.ok ? volumeResult.error : undefined;
  const canSave = volumeResult.ok && !saving;

  if (!farm) {
    return (
      <Screen>
        <Text style={styles.missing}>Хозяйство не найдено</Text>
      </Screen>
    );
  }

  if (surveyId && !existing) {
    return (
      <Screen>
        <Text style={styles.missing}>Опрос не найден</Text>
        <View style={styles.gap} />
        <AppButton label="Назад" variant="secondary" onPress={() => navigation.goBack()} />
      </Screen>
    );
  }

  const onSave = () => {
    setTouchedVolume(true);
    const parsed = parseVolumeLiters(volume);
    if (!parsed.ok) {
      return;
    }

    setSaving(true);
    const note = qualityNote.trim() || 'без заметки';

    if (isEdit && surveyId) {
      updateSurvey(surveyId, {
        volumeLiters: parsed.liters,
        qualityNote: note,
        lat,
        lng,
      });
      setSaving(false);
      Alert.alert('Сохранено', 'Опрос обновлён', [
        { text: 'OK', onPress: () => navigation.goBack() },
      ]);
      return;
    }

    addSurvey({
      farmId: farm.id,
      farmName: farm.name,
      volumeLiters: parsed.liters,
      qualityNote: note,
      lat,
      lng,
    });
    setSaving(false);
    Alert.alert('Сохранено', 'Опрос добавлен в сборы', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <Screen scroll>
      <Text style={styles.title}>{isEdit ? 'Изменить опрос' : 'Опрос'}</Text>
      <Text style={styles.farm}>{farm.name}</Text>

      <View style={styles.form}>
        <AppInput
          label="Объём сегодня, л"
          value={volume}
          onChangeText={(text) => {
            setVolume(text);
            setTouchedVolume(true);
          }}
          onBlur={() => setTouchedVolume(true)}
          keyboardType="decimal-pad"
          error={volumeError}
        />
        <AppInput
          label="Заметка о качестве"
          value={qualityNote}
          onChangeText={setQualityNote}
          placeholder="температура, запах, замечания"
          multiline
          style={styles.note}
        />
        <View style={styles.gpsBox}>
          <Text style={styles.gpsLabel}>GPS</Text>
          <Text style={styles.gpsValue}>
            {lat.toFixed(5)}, {lng.toFixed(5)}
          </Text>
          <Text style={styles.gpsStatus}>{gpsStatus}</Text>
        </View>
      </View>

      <AppButton
        label={isEdit ? 'Сохранить изменения' : 'Сохранить опрос'}
        onPress={onSave}
        disabled={!canSave}
      />
      <View style={styles.gap} />
      <AppButton
        label="Отмена"
        variant="secondary"
        onPress={() => navigation.goBack()}
      />
    </Screen>
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
  },
  farm: {
    marginTop: 4,
    marginBottom: 16,
    fontSize: 15,
    color: colors.textMuted,
  },
  form: {
    gap: 14,
    marginBottom: 20,
  },
  note: {
    minHeight: 88,
    textAlignVertical: 'top',
    paddingTop: 12,
  },
  gpsBox: {
    backgroundColor: colors.surface,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 12,
    gap: 4,
  },
  gpsLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: colors.textMuted,
    textTransform: 'uppercase',
  },
  gpsValue: {
    fontSize: 16,
    color: colors.text,
    fontVariant: ['tabular-nums'],
  },
  gpsStatus: {
    fontSize: 13,
    color: colors.textMuted,
  },
  gap: {
    height: 10,
  },
});
