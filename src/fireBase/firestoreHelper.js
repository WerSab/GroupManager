import firestore from '@react-native-firebase/firestore';

export function getCollection (collectionName) {
  console.log('Collection Name',collectionName)
  //opakowac w promisa i zrobić cacha
  return  firestore()
    .collection(collectionName)
};
//pobieramy referencję do naszej kolekcji


export function addToArray(element) {
  return firestore.FieldValue.arrayUnion(element);
}

export function removeFromArray(element){
  return firestore.FieldValue.arrayRemove(element);
}

//zrobić array remove analigicznie