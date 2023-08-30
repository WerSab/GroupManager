import storage from '@react-native-firebase/storage';
import {launchImageLibrary} from 'react-native-image-picker';

export const getFirebaseFileURL = async (directoryName, fileId) => {
  try {
    return await storage().ref(`${directoryName}/${fileId}`).getDownloadURL();
  } catch (error) {
    console.error(`getFirebaseFileURL: ${error}`);
    throw error;
  }
};
export const selectImage = async () => {
  const result = await launchImageLibrary({
    selectionLimit: 1,
  });
  console.log(result.assets.map(el => el.uri));
};

const wrapTaskWithPromise = task => {
  return new Promise((resolve, reject) => {
    task
      .then(taskSnapshot => {
        resolve(taskSnapshot);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const putFirebaseFile = async (directoryName, filePath, fileName) => {
  try {
    const reference = storage().ref(`${directoryName}/${fileName}`);
    const task = await reference.putFile(filePath);
    const taskResult = await wrapTaskWithPromise(task);
    console.log('taskResult:', taskResult);
  } catch (error) {
    console.error(`putFirebaseFile: ${error}`);
    throw error;
  }
};

// Uwagi w kontekscie zarzadzania plikami i zasobami (korzystać z dokumentacji Androida, wrzucanie permisów do manifestu)
// 1. Problem z zapisem pliku i zasobu jednoczesnie - (co jezeli uda sie zapisac zasob a pliku nie i vice versa)
// 2. Permissions: Aplikacja prawdopodobnie bedzie musiala posiadac uprawnienie do zarzadzania external-storagem(run time permission)
// 3. Dorobić metodę do usuwania zdjęć
