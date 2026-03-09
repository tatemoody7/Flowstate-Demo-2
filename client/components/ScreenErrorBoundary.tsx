import React from "react";
import { StyleSheet, View, Pressable } from "react-native";
import { Feather } from "@expo/vector-icons";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import type { ErrorFallbackProps } from "@/components/ErrorFallback";
import { ThemedView } from "@/components/ThemedView";
import { ThemedText } from "@/components/ThemedText";
import { useTheme } from "@/hooks/useTheme";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";

/**
 * Lightweight per-screen fallback. Shows a retry button instead of
 * restarting the whole app. The user can switch tabs while this is showing.
 */
function ScreenFallback({ error, resetError }: ErrorFallbackProps) {
  const { theme } = useTheme();

  return (
    <ThemedView style={styles.container}>
      <View style={styles.content}>
        <Feather
          name="alert-triangle"
          size={48}
          color={FlowstateColors.healthYellow}
        />
        <ThemedText type="h3" style={styles.title}>
          Something went wrong
        </ThemedText>
        <ThemedText type="body" style={styles.message}>
          This screen ran into an issue. You can try again or navigate to
          another tab.
        </ThemedText>
        {__DEV__ && (
          <ThemedText type="caption" style={styles.errorDetail}>
            {error.message}
          </ThemedText>
        )}
        <Pressable
          onPress={resetError}
          style={({ pressed }) => [
            styles.retryButton,
            {
              backgroundColor: theme.link,
              opacity: pressed ? 0.9 : 1,
            },
          ]}
        >
          <Feather name="refresh-cw" size={16} color="#FFFFFF" />
          <ThemedText
            type="body"
            style={[styles.retryText, { color: theme.buttonText }]}
          >
            Try Again
          </ThemedText>
        </Pressable>
      </View>
    </ThemedView>
  );
}

/**
 * Wrap a screen or stack navigator with this to catch render errors
 * without crashing the entire app. The root ErrorBoundary in App.tsx
 * remains as the ultimate fallback.
 */
export function ScreenErrorBoundary({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ErrorBoundary FallbackComponent={ScreenFallback}>{children}</ErrorBoundary>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: Spacing["2xl"],
  },
  content: {
    alignItems: "center",
    gap: Spacing.md,
    maxWidth: 320,
  },
  title: {
    textAlign: "center",
    color: FlowstateColors.textPrimary,
  },
  message: {
    textAlign: "center",
    color: FlowstateColors.textSecondary,
    lineHeight: 20,
  },
  errorDetail: {
    textAlign: "center",
    color: FlowstateColors.textTertiary,
    fontSize: 11,
    fontStyle: "italic",
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing["2xl"],
    borderRadius: BorderRadius.lg,
    marginTop: Spacing.md,
  },
  retryText: {
    fontWeight: "600",
    fontSize: 15,
  },
});
