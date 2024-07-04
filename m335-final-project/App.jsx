import { StatusBar } from "expo-status-bar";
import "react-native-gesture-handler";
import { NavigationContainer } from "@react-navigation/native";
import TabBar from "./components/TabBar";
import { useEffect } from "react";
import { storeData } from "./utils/LocalStorage";

export default function App() {
  useEffect(() => {
    storeData("recordings", []);
  })
  return (
    <NavigationContainer>
      <TabBar />
      <StatusBar style="auto" />
    </NavigationContainer>
  );
}
