import firestore, { firebase } from '@react-native-firebase/firestore';

export function getCollection(collectionName) {
  console.log('Collection Name', collectionName)

  return firestore()
    .collection(collectionName)
};
export function addToArray(element) {
  return firestore.FieldValue.arrayUnion(element);
}

export function removeFromArray(element) {
  return firestore.FieldValue.arrayRemove(element);
}

export function getDocumentReferenceById(documentPath) {
  return firestore().doc(documentPath);
}

export function getFirestoreTimestampFromDate(date = new Date()) {
  return firebase.firestore.Timestamp.fromDate(date);
}

export function getFirestoreTimestampFromMillis(millis = Date.now()) {
  return firebase.firestore.Timestamp.fromMillis(millis);
}
export function getDateFromTimestamp(timestamp){
    return timestamp.toDate();
}


export function getFirestoreBatch() {
  return firestore().batch();
}