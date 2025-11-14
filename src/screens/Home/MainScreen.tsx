import type { NavigationProp } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { View } from "react-native";
import MapView from "react-native-maps";
import MenuButton from "../../components/Menu/MenuButton";
import MenuPopover from "../../components/Menu/MenuPopover";
import Map, { MapPin } from "../../components/Map";
import SearchPanel from "../../components/SearchPanel";
import StoreModal from "../../components/StoreModal";
import { useStores } from "../../hooks/api/useStores";
import type { RootStackParamList } from "../../types/navigation";
import { geocodeAddress } from "../../utils/geocode";

export default function MainScreen() {
  const [query, setQuery] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<MapPin | null>(null);
  const [pins, setPins] = useState<MapPin[]>([
    // 더미 데이터 - 테스트용
    { id: 'dummy1', latitude: 36.3545812, longitude: 127.3687688, title: '카페보다', description: 'cafe', team: '백제', hours: '11:00 - 20:00' },
    { id: 'dummy2', latitude: 35.19110910, longitude: 128.905598, title: '만주점', description: 'food', team: '고구려', hours: '11:00 - 20:00' },
    { id: 'dummy3', latitude: 35.18910910, longitude: 128.906598, title: '신라바', description: 'drink', team: '신라', hours: '11:00 - 20:00' },
    { id: 'dummy4', latitude: 35.19210910, longitude: 128.903598, title: '한양카페', description: 'cafe', team: '백제', hours: '11:00 - 20:00' },
    { id: 'dummy5', latitude: 35.18810910, longitude: 128.907598, title: '척화비국수', description: 'food', team: '고구려', hours: '11:00 - 20:00' },
  ]);
  const mapRef = useRef<MapView | null>(null);
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();
  const { data: storesData } = useStores();

  useEffect(() => {
    if (!storesData) return;

    const convertAddressesToPins = async () => {
      const convertedPins: MapPin[] = [];

      for (const store of storesData) {
        const coords = await geocodeAddress(store.address);
        if (coords) {
          convertedPins.push({
            id: store.store_id,
            latitude: coords.latitude,
            longitude: coords.longitude,
            title: store.store_name,
            description: store.store_type,
            team: store.team || getTeamFromStoreType(store.store_type),
            hours: '11:00 - 20:00',
          });
        }
      }

      setPins(convertedPins);
    };

    convertAddressesToPins();
  }, [storesData]);

  const getTeamFromStoreType = (storeType: string): string => {
    const teamMap: Record<string, string> = {
      'food': '고구려',
      'drink': '신라',
      'cafe': '백제',
    };
    return teamMap[storeType] || '고구려';
  };

  return (
    <View style={{ flex: 1 }}>
      <Map
        markers={pins}
        mapRef={mapRef}
        onMarkerPress={(pin) => setSelected(pin)}
      />
      <MenuButton onPress={() => setMenuOpen((v) => !v)} />
      <MenuPopover
        visible={menuOpen}
        onClose={() => setMenuOpen(false)}
        onPressCoupon={() => {
          setMenuOpen(false);
          navigation.navigate({ name: 'Coupon', params: { screen: 'CouponListScreen' } });
        }}
        onPressScan={() => {
          setMenuOpen(false);
          navigation.navigate({ name: 'Home', params: { screen: 'CouponScanScreen' } });
        }}
        onPressRegisterStore={() => {
          setMenuOpen(false);
          navigation.navigate({ name: 'Register', params: { screen: 'OcrScreen' } });
        }}
      />
      <SearchPanel
        query={query}
        onChangeQuery={setQuery}
        onSubmit={async () => {
          const coords = await geocodeAddress(query);
          if (coords && mapRef.current) {
            mapRef.current.animateToRegion({
              latitude: coords.latitude,
              longitude: coords.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.01,
            }, 600);
          }
        }}
        onPressAction={() => {}}
        teamLabel="民"
      />
      <StoreModal
        visible={!!selected}
        onClose={() => setSelected(null)}
        title={selected?.title}
        team={selected?.team ?? selected?.description}
        hours={selected?.hours}
        onPressInfo={() => {
          setSelected(null);
          navigation.navigate({ name: 'Restaurant', params: { screen: 'RestaurantInfoScreen' } });
        }}
        onPressConquer={() => {}}
      />
    </View>
  );
}