import { useCallback, useEffect, useState } from "react";
import * as Location from "expo-location";

export type Coordinates = {
  latitude: number;
  longitude: number;
};

export function useLocation() {
  const [coordinates, setCoordinates] = useState<Coordinates | undefined>(undefined);
  const [permissionGranted, setPermissionGranted] = useState<boolean | undefined>(undefined);
  const [error, setError] = useState<Error | undefined>(undefined);

  const refresh = useCallback(async () => {
    try {
      setError(undefined);

      const { status: existing } = await Location.getForegroundPermissionsAsync();
      let granted = existing === Location.PermissionStatus.GRANTED;
      if (!granted) {
        const { status: requested } = await Location.requestForegroundPermissionsAsync();
        granted = requested === Location.PermissionStatus.GRANTED;
      }

      setPermissionGranted(granted);
      if (!granted) return;

      const position = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.Balanced,
        mayShowUserSettingsDialog: true,
      });

      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
    } catch (e: any) {
      setError(e);
    }
  }, []);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { coordinates, permissionGranted, error, refresh };
}