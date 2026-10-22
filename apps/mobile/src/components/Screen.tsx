import { ReactNode } from 'react';
import { ScrollView, StyleSheet, View, ViewStyle } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors } from '../theme';

type Props = {
  children: ReactNode;
  scroll?: boolean;
  style?: ViewStyle;
};

type ScreenProps = Props & {
  /** When a navigation header is already shown, skip top safe-area inset. */
  withHeader?: boolean;
};

export function Screen({
  children,
  scroll = false,
  style,
  withHeader = false,
}: ScreenProps) {
  const edges = withHeader
    ? (['left', 'right'] as const)
    : (['top', 'left', 'right'] as const);

  if (scroll) {
    return (
      <SafeAreaView style={styles.safe} edges={edges}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, style]}
          keyboardShouldPersistTaps="handled"
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe} edges={edges}>
      <View style={[styles.body, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  body: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 8,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 24,
    flexGrow: 1,
  },
});
