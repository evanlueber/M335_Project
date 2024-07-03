import { View, Text, Pressable } from "react-native";
import React, { useEffect, useState } from "react";
import MaIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getData, storeData } from "../utils/LocalStorage";
import { Audio } from "expo-av";

export default function Recordings() {
  const [recordings, setRecordings] = useState([]);

  const getRecordings = async () => {
    await getData("recordings").then((data) => {
      if (data) {
        setRecordings(JSON.parse(data));
      }
    });
  };
  useEffect(() => {
    getRecordings();
  });

  const deleteRecording = async (index) => {
    let updatedRecordings = recordings.filter(
      (recording, i) => recording.id !== index
    );
    setRecordings(updatedRecordings);
    await storeData("recordings", JSON.stringify(updatedRecordings));
  };
  return (
    <View className="flex-1 items-center justify-center bg-[#292929]">
      <Text
        className=
          "text-red-800 text-6xl shadow-md shadow-black absolute top-40 " 
     
      >
        yAPP
      </Text>
      {recordings.map((recordingLine, index) => {
        return (
          <View
            key={index}
            className="flex flex-row items-center justify-between w-full px-4 py-2"
          >
            <Text className="text-lg text-white">
              {recordingLine.name} - {recordingLine.duration}
            </Text>
            <Pressable
              onPress={() => {
                const sound = new Audio.Sound();
                sound.loadAsync({ uri: recordingLine.file }).then(() => {
                  sound.playAsync();
                });
              }}
            >
              <MaIcon name="pause" size={24} color="white" />
            </Pressable>
            <Pressable onPress={() => deleteRecording(recordingLine.id)}>
              <MaIcon name="delete" size={24} color="red" />
            </Pressable>
          </View>
        );
      })}
    </View>
  );
}
