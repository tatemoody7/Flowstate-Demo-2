import React from "react";
import { View, StyleSheet } from "react-native";
import Svg, { Path, G } from "react-native-svg";

type LogoVariant = "full" | "icon" | "wordmark";

interface FlowstateLogoProps {
  size?: number;
  color?: string;
  variant?: LogoVariant;
}

export function FlowstateLogo({
  size = 40,
  color = "#FFFFFF",
  variant = "full",
}: FlowstateLogoProps) {
  const iconSize = size;
  const wordmarkWidth = size * 4.5;
  const wordmarkHeight = size * 0.6;

  const FlowIcon = () => (
    <Svg
      width={iconSize}
      height={iconSize}
      viewBox="0 0 100 100"
      fill="none"
    >
      <Path
        d="M15 65C15 65 25 25 50 25C75 25 65 50 50 50C35 50 25 75 50 75C75 75 85 35 85 35"
        stroke={color}
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M78 28L85 35L78 42"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );

  const FlowWordmark = () => (
    <Svg
      width={wordmarkWidth}
      height={wordmarkHeight}
      viewBox="0 0 360 50"
      fill="none"
    >
      <G>
        <Path d="M0 8H30V14H6V22H26V28H6V42H0V8Z" fill={color} />
        <Path d="M36 8H42V36H62V42H36V8Z" fill={color} />
        <Path
          d="M66 25C66 15.6 73.6 8 83 8C92.4 8 100 15.6 100 25C100 34.4 92.4 42 83 42C73.6 42 66 34.4 66 25ZM94 25C94 18.9 89.1 14 83 14C76.9 14 72 18.9 72 25C72 31.1 76.9 36 83 36C89.1 36 94 31.1 94 25Z"
          fill={color}
        />
        <Path
          d="M103 8H110L118 30L126 8H133L121 42H115L103 8Z"
          fill={color}
        />
        <Path
          d="M146 30C146 30 150 36 158 36C163 36 166 33.5 166 30C166 22 144 26 144 14C144 9 149 4 158 4C167 4 171 10 171 10L167 15C167 15 163 10 158 10C153 10 150 12.5 150 15C150 23 172 19 172 31C172 36 167 42 158 42C148 42 143 35 143 35L146 30Z"
          fill={color}
          transform="translate(0, 4)"
        />
        <Path
          d="M185 14H175V8H201V14H191V42H185V14Z"
          fill={color}
        />
        <Path
          d="M210 8H216L228 42H222L219 33H207L204 42H198L210 8ZM213 14L209 28H218L213 14Z"
          fill={color}
        />
        <Path
          d="M237 14H227V8H253V14H243V42H237V14Z"
          fill={color}
        />
        <Path
          d="M258 8H288V14H264V22H284V28H264V36H288V42H258V8Z"
          fill={color}
        />
      </G>
    </Svg>
  );

  if (variant === "icon") {
    return <FlowIcon />;
  }

  if (variant === "wordmark") {
    return <FlowWordmark />;
  }

  return (
    <View style={styles.fullContainer}>
      <FlowIcon />
      <View style={{ width: size * 0.15 }} />
      <FlowWordmark />
    </View>
  );
}

const styles = StyleSheet.create({
  fullContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
