import {FIRESTORE_COLLECTION} from '../config';
import {getCollection} from '../firebase/firestore-helpers';
import firestore from '@react-native-firebase/firestore';

export function getMessages() {
  return new Promise((resolve, reject) => {
    getCollection(FIRESTORE_COLLECTION.MESSAGES)
      .get()
      .then(querySnapshot => {
        const allDocuments = querySnapshot.docs;
        const messageList = allDocuments.map(function (collectionElement) {
          return {
            id: collectionElement.id,
            ...collectionElement.data(),
          };
        });
        resolve(messageList);
      })
      .catch(error => reject(error));
  });
}

export function deleteMessage(messageId) {
  return getCollection(FIRESTORE_COLLECTION.MESSAGES).doc(messageId).delete();
}

export function addNewMessageToCollection(message) {
  return new Promise((resolve, reject) => {
    const batch = firestore().batch();
    const newMessageReference = getCollection(
      FIRESTORE_COLLECTION.MESSAGES,
    ).doc();
    batch.set(newMessageReference, message);
    batch
      .commit()
      .then(() => {
        resolve({
          id: newMessageReference.id,
          ...message,
        });
        console.log(
          `Added document with id ${newMessageReference.id} to message collection`,
        );
      })
      .catch(error => {
        console.log('Add new message error occured:', error);
        reject(error);
      });
  });
}
