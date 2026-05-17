import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import { Image, StyleSheet } from 'react-native';

import Colors, { FourtecColors } from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={22} style={{ marginBottom: -3 }} {...props} />;
}

function HeaderLogo() {
  return (
    <Image
      source={{ uri: 'https://fourtec.dk/assets/images/Logo_1_finaal.JPG' }}
      style={styles.headerLogo}
      resizeMode="contain"
    />
  );
}

const styles = StyleSheet.create({
  headerLogo: {
    width: 90,
    height: 32,
    marginLeft: 12,
  },
});

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: FourtecColors.teal,
        tabBarInactiveTintColor: isDark ? FourtecColors.lightGray : '#8a9bb0',
        tabBarStyle: {
          backgroundColor: isDark ? FourtecColors.navyDark : FourtecColors.white,
          borderTopColor: isDark ? FourtecColors.navyMid : '#e0e8f0',
        },
        headerStyle: {
          backgroundColor: isDark ? FourtecColors.navyDark : FourtecColors.white,
        },
        headerTintColor: isDark ? FourtecColors.white : FourtecColors.navyDark,
        headerTitleStyle: { fontWeight: '700' },
        headerLeft: () => <HeaderLogo />,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="customers"
        options={{
          title: 'Customers',
          tabBarIcon: ({ color }) => <TabBarIcon name="users" color={color} />,
        }}
      />
      <Tabs.Screen
        name="items"
        options={{
          title: 'Items',
          tabBarIcon: ({ color }) => <TabBarIcon name="cube" color={color} />,
        }}
      />
      <Tabs.Screen
        name="vendors"
        options={{
          title: 'Vendors',
          tabBarIcon: ({ color }) => <TabBarIcon name="truck" color={color} />,
        }}
      />
      <Tabs.Screen name="two" options={{ href: null }} />
    </Tabs>
  );
}
