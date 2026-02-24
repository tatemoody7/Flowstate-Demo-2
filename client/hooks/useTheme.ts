import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/useColorScheme";

export function useTheme() {
  const isDark = false;
  const theme = Colors["light"];

  return {
    theme,
    isDark,
  };
}
