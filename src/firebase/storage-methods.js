import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {FirebaseStorageFileUploadError} from '../errors/FirebaseStorageFileUploadError';

export const getFirebaseFileURL = async (directoryName, fileId) => {
  try {
    return await storage().ref(`${directoryName}/${fileId}`).getDownloadURL();
  } catch (error) {
    console.error(`getFirebaseFileURL: ${error}`);
    return;
  }
};
export const selectImage = async options => {
  const result = await launchImageLibrary(options);
  return result.assets;
};

export const putFirebaseFile = async (directoryName, filePath, fileName) => {
  try {
    const reference = storage().ref(`${directoryName}/${fileName}`);
    const task = reference.putFile(filePath);
    return await task;
  } catch (error) {
    throw new FirebaseStorageFileUploadError(error);
  }
};

// Uwagi w kontekscie zarzadzania plikami i zasobami (korzystać z dokumentacji Androida, wrzucanie permisów do manifestu)
// 1. Problem z zapisem pliku i zasobu jednoczesnie - (co jezeli uda sie zapisac zasob a pliku nie i vice versa)
// 2. Permissions: Aplikacja prawdopodobnie bedzie musiala posiadac uprawnienie do zarzadzania external-storagem(run time permission)
// 3. Dorobić metodę do usuwania zdjęć
