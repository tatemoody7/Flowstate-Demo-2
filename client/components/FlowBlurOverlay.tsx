import React, { useEffect } from "react";
import { StyleSheet, View, Platform } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  Easing,
  interpolate,
} from "react-native-reanimated";

import { useApp } from "@/context/AppContext";

export function FlowBlurOverlay() {
  const { flowToday, isInFlow } = useApp();

  const pillarsComplete =
    (flowToday.nourish ? 1 : 0) +
    (flowToday.move ? 1 : 0) +
    (flowToday.rest ? 1 : 0);

  const progress = useSharedValue(0);
  const flashOpacity = useSharedValue(0);

  useEffect(() => {
    progress.value = withTiming(pillarsComplete / 3, {
      duration: 600,
      easing: Easing.out(Easing.cubic),
    });

    if (isInFlow) {
      flashOpacity.value = withTiming(0.25, { duration: 200 }, () => {
        flashOpacity.value = withTiming(0, { duration: 600 });
      });
    }
  }, [pillarsComplete, isInFlow]);

  const overlayStyle = useAnimatedStyle(() => {
    const opacity = interpolate(progress.value, [0, 0.33, 0.66, 1], [0.45, 0.25, 0.1, 0]);
    return {
      opacity,
    };
  });

  const flashStyle = useAnimatedStyle(() => ({
    opacity: flashOpacity.value,
  }));

  return (
    <>
      <Animated.View
        style={[styles.overlay, overlayStyle, { pointerEvents: "none" }]}
      />
      <Animated.View
        style={[styles.flashOverlay, flashStyle, { pointerEvents: "none" }]}
      />
    </>
  );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(248, 250, 252, 0.7)",
    zIndex: 0,
  },
  flashOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "#00A651",
    zIndex: 1,
  },
});
