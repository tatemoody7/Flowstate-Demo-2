import React, { ReactNode } from "react";
import { StyleSheet, Pressable, ViewStyle, StyleProp, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  WithSpringConfig,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { FlowstateColors, BorderRadius, Spacing } from "@/constants/theme";

interface ButtonProps {
  onPress?: () => void;
  children: ReactNode;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "outline";
}

const springConfig: WithSpringConfig = {
  damping: 15,
  mass: 0.3,
  stiffness: 150,
  overshootClamping: true,
  energyThreshold: 0.001,
};

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

export function Button({
  onPress,
  children,
  style,
  disabled = false,
  variant = "primary",
}: ButtonProps) {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const handlePressIn = () => {
    if (!disabled) {
      scale.value = withSpring(0.98, springConfig);
    }
  };

  const handlePressOut = () => {
    if (!disabled) {
      scale.value = withSpring(1, springConfig);
    }
  };

  const getBackgroundColor = () => {
    if (variant === "outline") return "transparent";
    if (variant === "secondary") return FlowstateColors.secondary;
    return FlowstateColors.primary;
  };

  const getTextColor = () => {
    if (variant === "outline") return FlowstateColors.primary;
    return "#FFFFFF";
  };

  const getBorderColor = () => {
    if (variant === "outline") return FlowstateColors.primary;
    return "transparent";
  };

  return (
    <AnimatedPressable
      onPress={disabled ? undefined : onPress}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      disabled={disabled}
      style={[
        styles.button,
        {
          backgroundColor: getBackgroundColor(),
          opacity: disabled ? 0.5 : 1,
          borderColor: getBorderColor(),
          borderWidth: variant === "outline" ? 1 : 0,
        },
        style,
        animatedStyle,
      ]}
    >
      {typeof children === "string" ? (
        <ThemedText
          type="body"
          style={[styles.buttonText, { color: getTextColor() }]}
        >
          {children}
        </ThemedText>
      ) : (
        <View style={styles.childrenContainer}>{children}</View>
      )}
    </AnimatedPressable>
  );
}

const styles = StyleSheet.create({
  button: {
    height: Spacing.buttonHeight,
    borderRadius: BorderRadius.sm,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.xl,
  },
  buttonText: {
    fontWeight: "600",
    fontFamily: "Inter_600SemiBold",
  },
  childrenContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
});
