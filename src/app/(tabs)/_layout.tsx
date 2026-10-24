import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Tabs } from 'expo-router';
import { View, Platform } from 'react-native';
import { LayoutDashboard, CheckSquare, CalendarDays, User } from 'lucide-react-native';

// Standardized colors for the Tab Bar (We will formalize these in Step 3)
const ACTIVE_COLOR = '#4F46E5'; // Indigo 600 - Great for AI products
const INACTIVE_COLOR = '#9CA3AF'; // Gray 400
const TAB_BAR_BACKGROUND = '#FFFFFF'; // Dark mode could be #111827

export default function TabLayout() {
   const insets = useSafeAreaInsets();
  return (
    <Tabs
      screenOptions={{
        headerShown: true, // We show headers by default, but customize them per screen
        tabBarActiveTintColor: ACTIVE_COLOR,
        tabBarInactiveTintColor: INACTIVE_COLOR,
        tabBarStyle: {
          backgroundColor: TAB_BAR_BACKGROUND,
          borderTopWidth: 1,
          borderTopColor: '#F3F4F6', // Gray 100
          paddingBottom: insets.bottom + 8,
          paddingTop: 12,
          height: 56 + insets.bottom,
          elevation: 0, // Removes Android shadow for a flatter, modern look
          shadowOpacity: 0, // Removes iOS shadow
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter_600SemiBold',
          fontSize: 11,
          marginTop: 4,
        },
        // Global header styling for all tab screens
        headerStyle: {
          backgroundColor: '#FFFFFF',
          elevation: 0,
          shadowOpacity: 0,
          borderBottomWidth: 1,
          borderBottomColor: '#F3F4F6',
        },
        headerTitleStyle: {
          fontFamily: 'Inter_700Bold',
          fontSize: 18,
          color: '#111827', // Gray 900
        },
      }}>
      
      {/* 1. Dashboard / Today's Overview */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Today',
          tabBarIcon: ({ color, size }) => (
            <LayoutDashboard size={size} color={color} strokeWidth={2.5} />
          ),
        }}
      />

      {/* 2. AI Auto-Schedule */}
      <Tabs.Screen
        name="schedule"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, size }) => (
            <CalendarDays size={size} color={color} strokeWidth={2.5} />
          ),
        }}
      />

      {/* 3. Task Management */}
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <CheckSquare size={size} color={color} strokeWidth={2.5} />
          ),
        }}
      />

      {/* 4. User Profile & Settings */}
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <User size={size} color={color} strokeWidth={2.5} />
          ),
        }}
      />
    </Tabs>
  );
}