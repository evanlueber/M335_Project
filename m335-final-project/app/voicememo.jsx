import { Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import MaIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Audio } from "expo-av";
import { setAudioModeAsync } from "expo-av/build/Audio";
import { storeData } from "../utils/LocalStorage";
import * as Haptics from "expo-haptics";
import { getData } from "../utils/LocalStorage";

export default function Voicememo() {
  const [recording, setRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [message, setMessage] = useState("");

  // Start recording
  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );
        setRecording(recording);
      } else {
        setMessage("Please grant permission to record audio");
      }
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  }

  // Stop recording
  async function stopRecording() {
    await setAudioModeAsync({
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
    });
    setRecording(undefined);
    await recording.stopAndUnloadAsync();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      id: recordings.length + 1,
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
      name: `Recording ${recordings.length + 1}`,
    });

    setRecordings(updatedRecordings);
    await storeData("recordings", JSON.stringify(updatedRecordings));
  }

  // Format duration of Recording
  function getDurationFormatted(millis) {
    const minutes = millis / 1000 / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }
  useEffect(() => {
    setRecording(false);
    const getRecordings = async () => {
      await getData("recordings").then((data) => {
        if (data) {
          setRecordings(JSON.parse(data));
        }
      });
    };
    getRecordings();
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-[#292929]">
      <Text className="text-white text-2xl mt-4">{message}</Text>
      <Text className={"text-red-800 text-6xl shadow-md shadow-black mb-20 " + (recording ? "shadow-red-800" : "")}>yAPP</Text>
      <Pressable
        className={"bg-[#1f1f1f] px-4 py-2 rounded-full mt-4 w-56 h-56 flex justify-center items-center shadow-md shadow-black " + (recording ? "bg-red-800 shadow-red-900" : "")}
        onPress={
          recording
            ? stopRecording
            : startRecording
        }
      >
        <Text>
          {recording ? (
            <MaIcon name="stop-circle-outline" size={120} color="#292929" />
          ) : (
            <MaIcon name="play-circle-outline" size={120} color="#991b1b" />
          )}
        </Text>
      </Pressable>
    </View>
  );
}
