import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  StyleSheet,
  View,
  Pressable,
  TextInput,
  FlatList,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import * as Haptics from "expo-haptics";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
  FadeInUp,
  SlideInDown,
  FadeIn,
  runOnJS,
} from "react-native-reanimated";

import { ThemedText } from "@/components/ThemedText";
import { useApp } from "@/context/AppContext";
import { FlowstateColors, Spacing, BorderRadius } from "@/constants/theme";
import {
  getCoachGreeting,
  getPillarReaction,
  getStreakMessage,
  getScanReaction,
  getRandomLine,
  COACH_LINES,
} from "@/data/coachLines";
import { searchGrocery, getCheapestStore, GROCERY_STORES } from "@/data/groceryData";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

interface CoachMessage {
  id: string;
  text: string;
  sender: "coach" | "user";
  timestamp: number;
}

interface CoachPanelProps {
  visible: boolean;
  onClose: () => void;
}

function TypingIndicator() {
  return (
    <Animated.View entering={FadeIn.duration(200)} style={styles.typingContainer}>
      <View style={styles.coachAvatar}>
        <Feather name="zap" size={14} color="#FFFFFF" />
      </View>
      <View style={styles.typingBubble}>
        <View style={styles.typingDots}>
          <View style={[styles.typingDot, { opacity: 0.4 }]} />
          <View style={[styles.typingDot, { opacity: 0.7 }]} />
          <View style={[styles.typingDot, { opacity: 1 }]} />
        </View>
      </View>
    </Animated.View>
  );
}

export function CoachPanel({ visible, onClose }: CoachPanelProps) {
  const insets = useSafeAreaInsets();
  const { flowToday, isInFlow, currentStreak, schoolColors } = useApp();
  const [messages, setMessages] = useState<CoachMessage[]>([]);
  const [inputText, setInputText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const slideAnim = useSharedValue(SCREEN_HEIGHT);

  const pillarsComplete =
    (flowToday.nourish ? 1 : 0) +
    (flowToday.move ? 1 : 0) +
    (flowToday.rest ? 1 : 0);

  useEffect(() => {
    if (visible) {
      slideAnim.value = withSpring(0, { damping: 20, stiffness: 200 });
      if (messages.length === 0) {
        sendCoachMessage(getCoachGreeting(pillarsComplete, schoolColors.mascotGreeting));
        if (currentStreak > 0) {
          setTimeout(() => {
            sendCoachMessage(getStreakMessage(currentStreak));
          }, 1200);
        }
      }
    } else {
      slideAnim.value = withTiming(SCREEN_HEIGHT, { duration: 300 });
    }
  }, [visible]);

  const sendCoachMessage = useCallback((text: string) => {
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      const msg: CoachMessage = {
        id: `coach-${Date.now()}-${Math.random()}`,
        text,
        sender: "coach",
        timestamp: Date.now(),
      };
      setMessages((prev) => [...prev, msg]);
    }, 600 + Math.random() * 800);
  }, []);

  const handleUserMessage = useCallback(() => {
    const text = inputText.trim();
    if (!text) return;

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    const userMsg: CoachMessage = {
      id: `user-${Date.now()}`,
      text,
      sender: "user",
      timestamp: Date.now(),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText("");

    const lower = text.toLowerCase();
    const groceryResult = searchGrocery(lower);
    if (groceryResult) {
      const cheapest = getCheapestStore(groceryResult);
      let response = "";
      if (!groceryResult.healthy && groceryResult.alternative) {
        response = `${groceryResult.name}? ${getScanReaction(30, groceryResult.alternative)}`;
      } else if (cheapest) {
        response = `${groceryResult.name} — cheapest at ${cheapest.store} ($${cheapest.price.toFixed(2)}, ${cheapest.distance}).`;
        if (groceryResult.healthy) {
          response += " Solid pick.";
        }
      }
      setTimeout(() => sendCoachMessage(response), 400);
      return;
    }

    if (lower.includes("streak")) {
      sendCoachMessage(
        currentStreak > 0
          ? getStreakMessage(currentStreak)
          : "No streak yet. Check off all three essentials today to start one."
      );
    } else if (lower.includes("flow") || lower.includes("status")) {
      sendCoachMessage(getCoachGreeting(pillarsComplete, schoolColors.mascotGreeting));
    } else if (lower.includes("help") || lower.includes("what")) {
      sendCoachMessage(
        "Ask me about grocery prices, your streak, or just check in. I'm here to keep you locked in."
      );
    } else if (lower.includes("nourish") || lower.includes("eat") || lower.includes("food")) {
      sendCoachMessage(
        flowToday.nourish
          ? "Nourish is already checked. You fueled up today."
          : "Haven't nourished yet. What are you waiting for?"
      );
    } else if (lower.includes("move") || lower.includes("workout") || lower.includes("gym")) {
      sendCoachMessage(
        flowToday.move
          ? "Movement: done. Your body's grateful."
          : "Haven't moved yet. Even a walk counts. No excuses."
      );
    } else if (lower.includes("rest") || lower.includes("sleep")) {
      sendCoachMessage(
        flowToday.rest
          ? "Rest is handled. Recovery matters."
          : "Rest pillar is still open. Don't burn out."
      );
    } else {
      const fallbacks = [
        "Try asking about a grocery item — I'll find the cheapest spot.",
        "Check your streak or ask about your flow status.",
        "I keep it simple: nourish, move, rest. What do you need?",
        "Ask me about chicken breast, spinach, or protein powder — I know the prices.",
      ];
      sendCoachMessage(getRandomLine(fallbacks));
    }
  }, [inputText, currentStreak, pillarsComplete, flowToday, schoolColors]);

  const containerStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: slideAnim.value }],
  }));

  const renderMessage = ({ item }: { item: CoachMessage }) => {
    const isCoach = item.sender === "coach";
    return (
      <Animated.View
        entering={FadeInUp.duration(300)}
        style={[
          styles.messageRow,
          isCoach ? styles.messageRowCoach : styles.messageRowUser,
        ]}
      >
        {isCoach ? (
          <View style={styles.coachAvatar}>
            <Feather name="zap" size={14} color="#FFFFFF" />
          </View>
        ) : null}
        <View
          style={[
            styles.messageBubble,
            isCoach ? styles.coachBubble : styles.userBubble,
          ]}
        >
          <ThemedText
            type="small"
            style={[
              styles.messageText,
              isCoach ? styles.coachText : styles.userText,
            ]}
          >
            {item.text}
          </ThemedText>
        </View>
      </Animated.View>
    );
  };

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, containerStyle]}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardView}
        keyboardVerticalOffset={0}
      >
        <View style={[styles.panel, { paddingBottom: insets.bottom + Spacing.sm }]}>
          <View style={styles.handleBar}>
            <View style={styles.handle} />
          </View>

          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <LinearGradient
                colors={[FlowstateColors.primary, FlowstateColors.secondary]}
                style={styles.coachIcon}
              >
                <Feather name="zap" size={18} color="#FFFFFF" />
              </LinearGradient>
              <View>
                <ThemedText type="h4" style={styles.headerTitle}>
                  Flow Coach
                </ThemedText>
                <ThemedText type="caption" style={styles.headerSubtitle}>
                  {isInFlow ? "You're locked in" : "Here to keep you sharp"}
                </ThemedText>
              </View>
            </View>
            <Pressable onPress={onClose} style={styles.closeButton} testID="coach-close">
              <Feather name="x" size={20} color={FlowstateColors.textSecondary} />
            </Pressable>
          </View>

          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id}
            renderItem={renderMessage}
            contentContainerStyle={styles.messagesList}
            showsVerticalScrollIndicator={false}
            onContentSizeChange={() => {
              flatListRef.current?.scrollToEnd({ animated: true });
            }}
            ListFooterComponent={isTyping ? <TypingIndicator /> : null}
          />

          <View style={styles.inputRow}>
            <TextInput
              style={styles.input}
              placeholder="Ask about prices, streak, flow..."
              placeholderTextColor={FlowstateColors.textTertiary}
              value={inputText}
              onChangeText={setInputText}
              onSubmitEditing={handleUserMessage}
              returnKeyType="send"
              testID="coach-input"
            />
            <Pressable
              onPress={handleUserMessage}
              style={[
                styles.sendButton,
                inputText.trim().length > 0 ? null : styles.sendButtonDisabled,
              ]}
              testID="coach-send"
            >
              <Feather name="send" size={18} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 100,
    justifyContent: "flex-end",
  },
  keyboardView: {
    flex: 1,
    justifyContent: "flex-end",
  },
  panel: {
    backgroundColor: FlowstateColors.surface,
    borderTopLeftRadius: BorderRadius.xl,
    borderTopRightRadius: BorderRadius.xl,
    maxHeight: SCREEN_HEIGHT * 0.7,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.15,
    shadowRadius: 16,
    elevation: 20,
  },
  handleBar: {
    alignItems: "center",
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.xs,
  },
  handle: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: FlowstateColors.border,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: FlowstateColors.borderLight,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.md,
  },
  coachIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: {
    color: FlowstateColors.textPrimary,
    fontWeight: "700",
  },
  headerSubtitle: {
    color: FlowstateColors.textSecondary,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: FlowstateColors.background,
    alignItems: "center",
    justifyContent: "center",
  },
  messagesList: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  messageRowCoach: {
    justifyContent: "flex-start",
  },
  messageRowUser: {
    justifyContent: "flex-end",
  },
  coachAvatar: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: FlowstateColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  messageBubble: {
    maxWidth: "75%",
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
  },
  coachBubble: {
    backgroundColor: FlowstateColors.background,
    borderBottomLeftRadius: BorderRadius.xs,
  },
  userBubble: {
    backgroundColor: FlowstateColors.primary,
    borderBottomRightRadius: BorderRadius.xs,
  },
  messageText: {
    lineHeight: 20,
  },
  coachText: {
    color: FlowstateColors.textPrimary,
  },
  userText: {
    color: "#FFFFFF",
  },
  typingContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    gap: Spacing.sm,
    marginBottom: Spacing.sm,
  },
  typingBubble: {
    backgroundColor: FlowstateColors.background,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.md,
    borderBottomLeftRadius: BorderRadius.xs,
  },
  typingDots: {
    flexDirection: "row",
    gap: 4,
  },
  typingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: FlowstateColors.textTertiary,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
    gap: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: FlowstateColors.borderLight,
  },
  input: {
    flex: 1,
    height: 44,
    backgroundColor: FlowstateColors.background,
    borderRadius: BorderRadius.sm,
    paddingHorizontal: Spacing.lg,
    fontSize: 14,
    color: FlowstateColors.textPrimary,
  },
  sendButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: FlowstateColors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
});
