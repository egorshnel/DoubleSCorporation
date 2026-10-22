import { StyleSheet } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from 'react-native-maps';
import { FARM_TYPE_LABEL, type Farm } from '../data/types';

type Props = {
  farms: Farm[];
  onSelectFarm: (farmId: string) => void;
};

const REGION = {
  latitude: 49.82,
  longitude: 73.1,
  latitudeDelta: 0.25,
  longitudeDelta: 0.25,
};

export function FarmsMap({ farms, onSelectFarm }: Props) {
  return (
    <MapView
      style={styles.map}
      provider={PROVIDER_DEFAULT}
      initialRegion={REGION}
    >
      {farms.map((farm) => (
        <Marker
          key={farm.id}
          coordinate={{ latitude: farm.lat, longitude: farm.lng }}
          title={farm.name}
          description={`${FARM_TYPE_LABEL[farm.type]} · ${farm.volumeLitersTypical} л`}
          onCalloutPress={() => onSelectFarm(farm.id)}
        />
      ))}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
});
