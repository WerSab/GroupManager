import firestore from '@react-native-firebase/firestore';

export function getCollection (collectionName) {
  console.log(collectionName)
  //opakowac w promisa i zrobić cacha
  return  firestore()
    .collection(collectionName)
};
//pobieramy referencję do naszej kolekcji

