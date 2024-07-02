import { Text, View, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import MaIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { Audio } from "expo-av";
import { setAudioModeAsync } from "expo-av/build/Audio";

export default function Voicememo() {
  const [recording, setRecording] = useState(false);
  const [recordings, setRecordings] = useState([]);
  const [newRecording, setNewRecording] = useState("");
  const [message, setMessage] = useState("");

  async function playSound() {
    const sound = new Audio.Sound();
    await sound.loadAsync(require("../assets/ding.wav"));
    await sound.playAsync();
  }

  async function startRecording() {
    try {
      const permission = await Audio.requestPermissionsAsync();

      if (permission.status === "granted") {
        setTimeout(async () => {
        await Audio.setAudioModeAsync({allowsRecordingIOS: true, playsInSilentModeIOS: true});

        const { recording } = await Audio.Recording.createAsync(
          Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY
        );

        setRecording(recording);
      }, 1000);
      } else {
        setMessage("Please grant permission to record audio");
      }
    } catch (error) {
      console.error("Failed to start recording", error);
    }
  }

  async function stopRecording() {
    await setAudioModeAsync({ allowsRecordingIOS: false, playsInSilentModeIOS: false});
    setRecording(undefined);
    await recording.stopAndUnloadAsync();

    let updatedRecordings = [...recordings];
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    updatedRecordings.push({
      sound: sound,
      duration: getDurationFormatted(status.durationMillis),
      file: recording.getURI(),
    });

    setRecordings(updatedRecordings);
  }

  function getDurationFormatted(millis) {
    const minutes = (millis / 1000) / 60;
    const minutesDisplay = Math.floor(minutes);
    const seconds = Math.round((minutes - minutesDisplay) * 60);
    const secondsDisplay = seconds < 10 ? `0${seconds}` : seconds;
    return `${minutesDisplay}:${secondsDisplay}`;
  }

  function getRecordingLines() {
    return recordings.map((recordingLine, index) => {
      return (
        <View
          key={index}
          className="flex flex-row items-center justify-between w-full px-4 py-2"
        >
          <Text className="text-lg text-white">
            Recording {index + 1} - {recordingLine.duration}
          </Text>
          <Pressable onPress={() => {recordingLine.sound.replayAsync()
          }}>
            <MaIcon name="pause" size={24} color="white" />
          </Pressable>
        </View>
      );
    });
  }

  useEffect(() => {
    setRecording(false);
  }, []);

  return (
    <View className="flex-1 items-center justify-center bg-[#292929]">
      <Text className="text-white text-2xl mt-4">{message}</Text>
      <Pressable
        className="bg-[#1f1f1f] px-4 py-2 rounded-full mt-4 w-56 h-56 flex justify-center items-center shadow shadow-black "
        onPress={recording ? stopRecording : () => {
          playSound();
          startRecording()}}
      >
        <Text>
          {recording ? (
            <MaIcon name="stop-circle-outline" size={120} color="#0000cc" />
          ) : (
            <MaIcon name="play-circle-outline" size={120} color="#0000cc" />
          )}
        </Text>
      </Pressable>
      {getRecordingLines()}
    </View>
  );
}
