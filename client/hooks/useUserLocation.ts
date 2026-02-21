import { useState, useEffect } from "react";
import * as Location from "expo-location";
import { Coordinates, FGCU_COORDS } from "@/utils/distance";

interface UserLocationState {
  coords: Coordinates;
  isUsingFallback: boolean;
  isLoading: boolean;
}

/**
 * Hook to get user's current location.
 * Falls back to FGCU campus coordinates if permission is denied or unavailable.
 */
export function useUserLocation(): UserLocationState {
  const [state, setState] = useState<UserLocationState>({
    coords: FGCU_COORDS,
    isUsingFallback: true,
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;

    async function getLocation() {
      try {
        const { status } = await Location.getForegroundPermissionsAsync();

        if (status === "granted") {
          const location = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.Balanced,
          });

          if (isMounted) {
            setState({
              coords: {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
              },
              isUsingFallback: false,
              isLoading: false,
            });
          }
        } else {
          if (isMounted) {
            setState({
              coords: FGCU_COORDS,
              isUsingFallback: true,
              isLoading: false,
            });
          }
        }
      } catch {
        if (isMounted) {
          setState({
            coords: FGCU_COORDS,
            isUsingFallback: true,
            isLoading: false,
          });
        }
      }
    }

    getLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  return state;
}
