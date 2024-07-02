import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import FaIcon from "react-native-vector-icons/FontAwesome";

import VoicememoScreen from "../app/voicememo";

const Tab = createBottomTabNavigator();

export default function TabBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#0000cc",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "black",
          borderTopWidth: 0,
          paddingTop: 10,
        },
      }}
    >
      <Tab.Screen
        name="Audio"
        component={VoicememoScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FaIcon name="microphone" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
