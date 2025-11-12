import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import React from 'react';
import type { PressableStateCallbackType } from 'react-native';
import { StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { ThemedText } from '@/components/themed-text';
import { Colors } from '@/constants/theme';
import { usePreferences } from '@/contexts/preferences-context';
import { useColorScheme } from '@/hooks/use-color-scheme';

export function FloatingTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
  const { bottom } = useSafeAreaInsets();
  const colorScheme = useColorScheme();
  const palette = Colors[colorScheme ?? 'light'];
  const {
    preferences: { hapticFeedback },
  } = usePreferences();
  const tabBarGradient =
    colorScheme === 'dark'
      ? (['rgba(15, 23, 42, 0.94)', 'rgba(30, 41, 59, 0.9)'] as const)
      : (['rgba(255, 255, 255, 0.96)', 'rgba(248, 250, 252, 0.94)'] as const);

  const tabButtonStyle = ({ pressed }: PressableStateCallbackType) => [
    styles.tabButton,
    pressed ? styles.tabButtonPressed : null,
  ];

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.container,
        {
          paddingBottom: Math.max(bottom, 16),
          paddingHorizontal: 20,
        },
      ]}>
      <LinearGradient colors={tabBarGradient} style={[styles.tabBar, { borderColor: palette.stroke }]}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            typeof options.tabBarLabel === 'string'
              ? options.tabBarLabel
              : options.title ?? route.name;
          const isFocused = state.index === index;
          const iconColor = isFocused ? '#ffffff' : palette.tabIconDefault;

          const onPress = () => {
            if (hapticFeedback && process.env.EXPO_OS === 'ios') {
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light).catch(() => {});
            }
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true } as never);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const icon =
            options.tabBarIcon?.({
              focused: isFocused,
              color: iconColor,
              size: 24,
            }) ?? null;

          return (
            <PlatformPressable
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
              style={tabButtonStyle}
            >
              {isFocused ? (
                <LinearGradient
                  colors={palette.gradient}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.tabButtonActive}
                >
                  <View style={styles.tabContent}>
                    <View style={styles.iconContainer}>{icon}</View>
                    <ThemedText
                      numberOfLines={1}
                      style={styles.tabLabel}
                      lightColor="#ffffff"
                      darkColor="#ffffff"
                      type="defaultSemiBold"
                    >
                      {label}
                    </ThemedText>
                  </View>
                </LinearGradient>
              ) : (
                <View
                  style={[
                    styles.tabButtonInactive,
                    {
                      backgroundColor:
                        colorScheme === 'dark'
                          ? 'rgba(148, 163, 184, 0.16)'
                          : 'rgba(148, 163, 184, 0.12)',
                    },
                  ]}
                >
                  <View style={styles.tabContent}>
                    <View style={styles.iconContainer}>{icon}</View>
                    <ThemedText
                      numberOfLines={1}
                      style={styles.tabLabel}
                      lightColor={palette.tabIconDefault}
                      darkColor={palette.tabIconDefault}
                    >
                      {label}
                    </ThemedText>
                  </View>
                </View>
              )}
            </PlatformPressable>
          );
        })}
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
  },
  tabBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    borderRadius: 28,
    padding: 12,
    borderWidth: 1,
    shadowColor: '#0f172a',
    shadowOpacity: 0.14,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 12 },
    elevation: 12,
  },
  tabButton: {
    flex: 1,
    borderRadius: 20,
  },
  tabButtonPressed: {
    transform: [{ scale: 0.97 }],
  },
  tabButtonActive: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  tabButtonInactive: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
  },
  tabContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabLabel: {
    fontSize: 14,
  },
});
