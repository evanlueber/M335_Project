import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import FaIcon from "react-native-vector-icons/FontAwesome";
import MaIcon from "react-native-vector-icons/MaterialCommunityIcons";

import VoicememoScreen from "../app/voicememo";
import RecordingsScreen from "../app/recordings";
import TextToSpeechScreen from "../app/TextToSpeech";

const Tab = createBottomTabNavigator();

export default function TabBar() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#991b1b",
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
      <Tab.Screen
        name="Aufnahmen"
        component={RecordingsScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaIcon name="waveform" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TextToSpeech"
        component={TextToSpeechScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaIcon
              name="robot-excited"
              color={color}
              size={size}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
