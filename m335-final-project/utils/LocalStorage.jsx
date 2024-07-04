import Storage from "react-native-storage";
import AsyncStorage from "@react-native-async-storage/async-storage";

const storage = new Storage({
  size: 1,
  storageBackend: AsyncStorage,
  defaultExpires: null,
  enableCache: false,
});

export const storeData = async (key, value) => {
  try {
    await storage.remove({ key: key });
    storage.save({
      key: key,
      data: value,
    });
  } catch (error) {
    return null;
  }
};

export const getData = async (key) => {
  try {
    return await storage.load({ key: key });
  } catch (error) {
    return null;
  }
};
