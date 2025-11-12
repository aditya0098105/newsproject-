import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { PlatformPressable } from '@react-navigation/elements';
import * as Haptics from 'expo-haptics';
import React from 'react';
import type { PressableStateCallbackType } from 'react-native';
import { ScrollView, StyleSheet, View } from 'react-native';
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
      <View
        style={[
          styles.tabBar,
          { backgroundColor: palette.card, borderColor: palette.stroke },
        ]}
      >
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.tabBarContent}
        >
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
                <View
                  style={[
                    styles.tabContentWrapper,
                    {
                      backgroundColor: isFocused
                        ? palette.tint
                        : colorScheme === 'dark'
                          ? 'rgba(148, 163, 184, 0.12)'
                          : 'rgba(148, 163, 184, 0.1)',
                      borderColor: isFocused ? 'transparent' : palette.stroke,
                    },
                  ]}
                >
                  <View style={styles.tabContent}>
                    <View style={styles.iconContainer}>{icon}</View>
                    <ThemedText
                      numberOfLines={1}
                      style={[
                        styles.tabLabel,
                        { color: isFocused ? '#ffffff' : palette.tabIconDefault },
                      ]}
                      type="defaultSemiBold"
                    >
                      {label}
                    </ThemedText>
                  </View>
                </View>
              </PlatformPressable>
            );
          })}
        </ScrollView>
      </View>
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
    overflow: 'hidden',
    borderRadius: 24,
    padding: 12,
    borderWidth: 1,
    shadowColor: '#0f172a',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
  tabBarContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  tabButton: {
    borderRadius: 20,
    marginHorizontal: 6,
  },
  tabButtonPressed: {
    transform: [{ scale: 0.97 }],
  },
  tabContentWrapper: {
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderWidth: 1,
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
