import firestore from '@react-native-firebase/firestore';

export function getCollection (collectionName) {
  return  firestore()
    .collection(collectionName)
    .get()
};
//pobieramy referencję do naszej kolekcji

