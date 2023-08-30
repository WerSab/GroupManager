import {Linking} from 'react-native';

export const openLinkfromURL = async urlAdress => {
  try {
    return await Linking.openURL(urlAdress);
  } catch (error) {
    console.error(`getFirebaseFileURL: ${error}`);
    throw error;
  }
};
