import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { AddItemScreen } from "../screens/AddItemScreen";
import { OutfitScreen } from "../screens/OutfitScreen";
import { WardrobeScreen } from "../screens/WardrobeScreen";
import { colors, spacing } from "../theme";

type RootTabParamList = {
  Wardrobe: undefined;
  Add: undefined;
  Outfit: undefined;
};

const Tab = createBottomTabNavigator<RootTabParamList>();

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    primary: colors.primary,
    text: colors.text,
    card: colors.surface,
    border: colors.border,
  },
};

export const RootNavigator: React.FC = () => (
  <NavigationContainer theme={theme}>
    <Tab.Navigator
      initialRouteName="Wardrobe"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarStyle: {
          backgroundColor: colors.surface,
          height: 64,
          paddingBottom: spacing.sm,
          paddingTop: spacing.xs,
        },
        tabBarLabelStyle: {
          fontSize: 13,
          fontWeight: "600",
        },
      }}
    >
      <Tab.Screen
        name="Wardrobe"
        component={WardrobeScreen}
        options={{ title: "Wardrobe" }}
      />
      <Tab.Screen
        name="Add"
        component={AddItemScreen}
        options={{ title: "Add" }}
      />
      <Tab.Screen
        name="Outfit"
        component={OutfitScreen}
        options={{ title: "Outfit" }}
      />
    </Tab.Navigator>
  </NavigationContainer>
);
