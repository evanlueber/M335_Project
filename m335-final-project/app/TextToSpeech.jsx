import { Text, View, Pressable, TextInput } from "react-native";
import React, { useState } from "react";

export default function TextToSpeech() {
  const [text, setText] = useState("");

  const speak = () => {
    Speech.speak(text);
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Text className="text-red-800 text-6xl shadow-md shadow-black pt-32 h-1/3">
        TextToSpeech
      </Text>
      <TextInput placeholder="Write a text you want to hear" multiline={true}  />
    </View>
  );
}
