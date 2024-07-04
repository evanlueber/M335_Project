import { View, Text, Pressable, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import MaIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { getData, storeData } from "../utils/LocalStorage";
import { Audio } from "expo-av";

export default function Recordings() {
  const [recordings, setRecordings] = useState([]);
  const [localStorageEmpty, setLocalStorageEmpty] = useState(false);

  const getRecordings = async () => {
    await getData("recordings").then((data) => {
      if (data) {
        if (JSON.parse(data).length === 0) {
          setLocalStorageEmpty(true);
        } else {
          setLocalStorageEmpty(false);
        }
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
      <Text className="text-red-800 text-5xl shadow-md shadow-black pt-32 h-1/3">
        Aufnahmen
      </Text>
      <ScrollView className="w-full h-full">
        {recordings.map((recordingLine, index) => {
          return (
            <View
              key={index}
              className="flex flex-col w-full items-center px-4 py-2 border-2 rounded-2xl border-red-950 bg-red-800 shadow-sm shadow-black mb-4"
            >
              <View className=" flex flex-row justify-evenly w-full items-center mb-2 ">
                <Text className="text-2xl text-white">
                  {recordingLine.name}
                </Text>
                <Text className="text-2xl text-white">
                  {recordingLine.duration}
                </Text>
              </View>
              <View className="flex flex-row ">
                <Pressable
                  className="mr-8"
                  onPress={() => {
                    const sound = new Audio.Sound();
                    sound.loadAsync({ uri: recordingLine.file }).then(() => {
                      sound.playAsync();
                    });
                  }}
                >
                  <MaIcon name="play" size={40} color="white" />
                </Pressable>
                <Pressable onPress={() => deleteRecording(recordingLine.id)}>
                  <MaIcon name="delete" size={34} color="red" />
                </Pressable>
              </View>
            </View>
          );
        })}
        {localStorageEmpty ? (
          <View className=" w-4/5 self-center mt-20 flex flex-col items-center jusity-center bg-[#1f1f1f] shadow-md p-4 shadow-black rounded-3xl  ">
            <Text className="text-gray-500 text-xl w-full text-center mb-8">Deine Aufnahmen werden hier erscheinen</Text>
            <MaIcon name="waveform" color="#991b1b" size={100} />
          </View>
        ) : null}
      </ScrollView>
    </View>
  );
}
