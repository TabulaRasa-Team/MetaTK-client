import React, { useEffect, useState } from "react";
import MapView, { PROVIDER_GOOGLE, Marker } from "react-native-maps";
import styled from "styled-components/native";
import { MAP_STYLE } from "../constants/map";
import { useLocation } from "../hooks/etc/useLocation";
import { TYPOGRAPHY } from "../constants/typography";
import Icon from "./Icon/Icon";

export type MapPin = {
  id: string;
  latitude: number;
  longitude: number;
  title?: string;
  description?: string;
  team?: string;
  hours?: string;
};

export default function Map({ markers, mapRef, onMarkerPress }: { markers?: MapPin[]; mapRef?: React.RefObject<MapView | null> | React.MutableRefObject<MapView | null>; onMarkerPress?: (pin: MapPin) => void }) {
  const [region, setRegion] = useState({
    latitude: 37.7749,
    longitude: -122.4194,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });

  const { coordinates } = useLocation();

  useEffect(() => {
    if (!coordinates) return;
    setRegion((prev) => ({
      ...prev,
      latitude: coordinates.latitude,
      longitude: coordinates.longitude,
    }));
  }, [coordinates]);

  const getPinIconName = (storeType?: string): 'pin' | 'cafePin' | 'foodPin' => {
    switch (storeType) {
      case 'cafe':
        return 'cafePin';
      case 'food':
        return 'foodPin';
      case 'drink':
        return 'pin';
      default:
        return 'pin';
    }
  };

  const getPinColor = (team?: string): string => {
    switch (team) {
      case '고구려':
        return '#C73434';
      case '백제':
        return '#2D3EFF';
      case '신라':
        return '#FF992D';
      case '미점령':
        return '#E5E7EB';
      default:
        return '#E5E7EB';
    }
  };

  return (
    <MapView
      ref={mapRef}
      style={{ width: "100%", height: "100%" }}
      provider={PROVIDER_GOOGLE}
      customMapStyle={MAP_STYLE}
      region={region}
      showsUserLocation
    >
      {markers?.map((m) => (
        <Marker
          key={m.id}
          coordinate={{ latitude: m.latitude, longitude: m.longitude }}
          anchor={{ x: 0.5, y: 1 }}
          onPress={() => onMarkerPress?.(m)}
        >
          <MarkerContainer>
            <Icon
              name={getPinIconName(m.description)}
              width={60}
              height={75}
              primaryColor={getPinColor(m.team)}
            />
            {m.title && <IconText>{m.title}</IconText>}
            {m.team && <IconSub>{m.team}</IconSub>}
          </MarkerContainer>
        </Marker>
      ))}
    </MapView>
  );
}

const MarkerContainer = styled.View`
  align-items: center;
`;
const IconText = styled.Text`
  color: #ffffff;
  ${TYPOGRAPHY.SECTION_2}
`;
const IconSub = styled.Text`
  color: #97c3dc;
  ${TYPOGRAPHY.SECTION_2}
`;