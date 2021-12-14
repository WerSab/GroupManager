import firestore from '@react-native-firebase/firestore';

export function getCollection (collectionName) {
    console.log('Collection Name',collectionName)
  
  return  firestore()
    .collection(collectionName)
};
export function addToArray(element) {
  return firestore.FieldValue.arrayUnion(element);
}

export function removeFromArray(element){
  return firestore.FieldValue.arrayRemove(element);
}
