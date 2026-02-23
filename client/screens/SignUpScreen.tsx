import React, { useState } from "react";
import { StyleSheet, View, TextInput, Pressable, Alert } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useHeaderHeight } from "@react-navigation/elements";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Feather } from "@expo/vector-icons";
import * as Haptics from "expo-haptics";

import { KeyboardAwareScrollViewCompat } from "@/components/KeyboardAwareScrollViewCompat";
import { ThemedText } from "@/components/ThemedText";
import { Button } from "@/components/Button";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import { AuthStackParamList } from "@/navigation/AuthStackNavigator";
import { useTheme } from "@/hooks/useTheme";

type SignUpScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, "SignUp">;
};

export default function SignUpScreen({ navigation }: SignUpScreenProps) {
  const insets = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isValidEduEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.edu$/i.test(email.trim());
  };

  const handleSignUp = async () => {
    if (!email.trim()) {
      Alert.alert("Error", "Please enter your email address");
      return;
    }

    if (!isValidEduEmail(email)) {
      Alert.alert(
        "Invalid Email",
        "Please use a valid student email ending in .edu"
      );
      return;
    }

    if (password.length < 8) {
      Alert.alert("Error", "Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    setIsLoading(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      navigation.navigate("SchoolSelection", { email });
    }, 500);
  };

  return (
    <KeyboardAwareScrollViewCompat
      style={[styles.container, { backgroundColor: theme.backgroundRoot }]}
      contentContainerStyle={[
        styles.content,
        {
          paddingTop: headerHeight + Spacing.xl,
          paddingBottom: insets.bottom + Spacing["2xl"],
        },
      ]}
    >
      <View style={styles.header}>
        <ThemedText type="h1" style={styles.title}>
          Create Account
        </ThemedText>
        <ThemedText type="body" style={styles.subtitle}>
          Sign up with your student email to get started
        </ThemedText>
      </View>

      <View style={styles.form}>
        <View style={styles.inputGroup}>
          <ThemedText type="small" style={styles.label}>
            Student Email
          </ThemedText>
          <View style={styles.inputContainer}>
            <Feather
              name="mail"
              size={18}
              color={FlowstateColors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              value={email}
              onChangeText={setEmail}
              placeholder="yourname@university.edu"
              placeholderTextColor={FlowstateColors.textTertiary}
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              testID="input-email"
            />
          </View>
          <ThemedText type="caption" style={styles.hint}>
            Use your student .edu email
          </ThemedText>
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={styles.label}>
            Password
          </ThemedText>
          <View style={styles.inputContainer}>
            <Feather
              name="lock"
              size={18}
              color={FlowstateColors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Create a password"
              placeholderTextColor={FlowstateColors.textTertiary}
              style={styles.input}
              secureTextEntry={!showPassword}
              testID="input-password"
            />
            <Pressable
              onPress={() => setShowPassword(!showPassword)}
              hitSlop={8}
            >
              <Feather
                name={showPassword ? "eye-off" : "eye"}
                size={18}
                color={FlowstateColors.textSecondary}
              />
            </Pressable>
          </View>
        </View>

        <View style={styles.inputGroup}>
          <ThemedText type="small" style={styles.label}>
            Confirm Password
          </ThemedText>
          <View style={styles.inputContainer}>
            <Feather
              name="lock"
              size={18}
              color={FlowstateColors.textSecondary}
              style={styles.inputIcon}
            />
            <TextInput
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              placeholder="Confirm your password"
              placeholderTextColor={FlowstateColors.textTertiary}
              style={styles.input}
              secureTextEntry={!showPassword}
              testID="input-confirm-password"
            />
          </View>
        </View>

        <Button
          onPress={handleSignUp}
          disabled={isLoading}
          style={styles.signUpButton}
        >
          {isLoading ? "Creating Account..." : "Continue"}
        </Button>

      </View>

      <View style={styles.footer}>
        <ThemedText type="small" style={styles.termsText}>
          By continuing, you agree to our{" "}
          <ThemedText type="small" style={styles.termsLink}>
            Terms of Service
          </ThemedText>{" "}
          and{" "}
          <ThemedText type="small" style={styles.termsLink}>
            Privacy Policy
          </ThemedText>
        </ThemedText>
      </View>
    </KeyboardAwareScrollViewCompat>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    paddingHorizontal: Spacing["2xl"],
    flexGrow: 1,
  },
  header: {
    marginBottom: Spacing["3xl"],
  },
  title: {
    marginBottom: Spacing.sm,
    color: FlowstateColors.textPrimary,
  },
  subtitle: {
    color: FlowstateColors.textSecondary,
  },
  form: {
    gap: Spacing.xl,
  },
  inputGroup: {
    gap: Spacing.xs,
  },
  label: {
    color: FlowstateColors.textSecondary,
    fontWeight: "500",
    marginLeft: Spacing.xs,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: FlowstateColors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    height: Spacing.inputHeight,
    borderWidth: 1,
    borderColor: FlowstateColors.border,
  },
  inputIcon: {
    marginRight: Spacing.sm,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: FlowstateColors.textPrimary,
  },
  hint: {
    color: FlowstateColors.textTertiary,
    marginLeft: Spacing.xs,
  },
  signUpButton: {
    marginTop: Spacing.sm,
    backgroundColor: FlowstateColors.primary,
  },
  footer: {
    marginTop: "auto",
    paddingTop: Spacing["2xl"],
  },
  termsText: {
    color: FlowstateColors.textTertiary,
    textAlign: "center",
  },
  termsLink: {
    color: FlowstateColors.primary,
  },
});
