import {
  Text,
  View,
  Pressable,
  TextInput,
  Keyboard,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import * as Speech from "expo-speech";
import IoIcon from "react-native-vector-icons/Ionicons";
import * as Haptics from "expo-haptics";

export default function TextToSpeech() {
  const [text, setText] = useState("");
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const speak = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    if (isSpeaking && !isPaused) {
      Speech.pause();
      setIsPaused(true);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      return;
    }
    if (isPaused) {
      Speech.resume();
      setIsPaused(false);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      return;
    }
    if (text === "") {
      setIsSpeaking(true);
      Speech.speak("Bitte schreibe etwas zum Vorlesen", {
        onDone: () => {
          setIsSpeaking(false);
          Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
        },
      });
      Keyboard.dismiss();
      return;
    }
    setIsSpeaking(true);
    Keyboard.dismiss();
    Speech.speak(text, {
      onDone: () => {
        setIsSpeaking(false);
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
      },
    });
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const stop = () => {
    Speech.stop();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const deleteText = () => {
    setText("");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  return (
    <TouchableWithoutFeedback
      onPress={Keyboard.dismiss}
      accessible={false}
    >
      <View className=" flex-1 items-center justify-center bg-[#292929]">
        <Text className="text-red-800 text-6xl shadow-md shadow-black">T2S</Text>
        {isSpeaking && (
          <View className=" absolute bg-transparent z-10 flex-1 items-center justify-center ">
            <IoIcon name="volume-high-outline" size={240} color="#991b1b" />
          </View>
        )}
        <View className=" h-1/3 w-4/5 mt-10 bg-[#1f1f1f] rounded shadow-md shadow-black">
          <TextInput
            placeholder="Schreibe hier zum Vorlesen.."
            multiline={true}
            placeholderTextColor="gray"
            className=" rounded-lg text-white pr-10 pl-2 py-4"
            value={text}
            onChangeText={(text) => setText(text)}
          />
          <Pressable className=" absolute top-1 right-1" onPress={deleteText}>
            <IoIcon name="trash-outline" size={34} color="#991b1b" />
          </Pressable>
        </View>
        <View className="mt-10 flex flex-row ">
          <Pressable onPress={speak}>
            {isPaused || !isSpeaking ? (
              <IoIcon name="play-outline" size={80} color="#991b1b" />
            ) : (
              <IoIcon name="pause-outline" size={80} color="#991b1b" />
            )}
          </Pressable>
          {isSpeaking && (
            <Pressable onPress={stop}>
              <IoIcon name="stop-outline" size={80} color="#991b1b" />
            </Pressable>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}
