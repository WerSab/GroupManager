import AsyncStorage from '@react-native-async-storage/async-storage';
import {firebase} from '@react-native-firebase/firestore';
import React from 'react';
import {FIRESTORE_COLLECTION, TICKET_PAYMENT_STATUS} from '../config';
import {
  getCollection,
  getDocumentReferenceById,
  getFirestoreTimestampFromMillis,
} from '../firebase/firestore-helpers';
import {
  bulkDeleteTicket,
  deleteTicket,
} from '../firebase/firestore-ticket-methods';

const THREE_DAYS_MILLIS = 259_200_000;

export function getCurrentDate(nowMillis = Date.now()) {
  return nowMillis;
}

export function getDayFromMillis(millis) {
  const day = millis / (60 * 60 * 24 * 10000000);
  return day;
}

const getLatestCleanupDate = () => {
  return new Promise(resolve => {
    AsyncStorage.getItem('ticketLatestCleanUpDate')
      .then(latestCleanupDate => {
        resolve(latestCleanupDate);
      })
      .catch(error => {
        console.log('getLatestCleanupDate', error);
        resolve(null);
      });
  });
};

export const setNewCleanUpDate = presentDate => {
  return new Promise(resolve => {
    const jsonPresentDate = JSON.stringify(presentDate);
    AsyncStorage.setItem('ticketLatestCleanUpDate', jsonPresentDate).then(
      () => {
        resolve();
      },
    );
  }).catch(error => {
    console.log('setNewCleanUpDate', error);
    resolve(null);
  });
};

const deleteOldUserTickets = (userId, nowMillis) => {
  return new Promise((resolve, reject) => {
    const timestampFromCurrentDate = getFirestoreTimestampFromMillis(
      nowMillis - THREE_DAYS_MILLIS,
    );
    console.log('timestampFromMilis', timestampFromCurrentDate);
    const userRef = getDocumentReferenceById(
      `${FIRESTORE_COLLECTION.USERS}/${userId}`,
    );
    getCollection(FIRESTORE_COLLECTION.TICKETS)
      .where('user', '==', userRef)
      .where('status', '==', TICKET_PAYMENT_STATUS.UNPAID)
      .where('createdAt', '<=', timestampFromCurrentDate)
      .get()
      .then(querySnapshot => {
        const allDocuments = querySnapshot.docs;
        console.log('all documents:', allDocuments);
        const documentReferences = allDocuments.map(element => element.ref);
        return resolve(bulkDeleteTicket(documentReferences));
      })
      .catch(error => reject(error));
  });
};

//const allDocuments = [];

// tab[i];
// tab.fn();

export const deleteOutdatedTickets = userID => {
  const nowMillis = new Date().getTime();
  return new Promise((resolve, reject) => {
    console.log('deleteOutdatedTickets ');
    getLatestCleanupDate()
      .then(result => {
        if (!result) {
          return null;
        }
        const deltaTime = nowMillis - result;
        return deltaTime;
      })
      .then(deltaTime => {
        console.log('deltaTime ', deltaTime);
        if (!deltaTime || deltaTime >= THREE_DAYS_MILLIS) {
          deleteOldUserTickets(userID, nowMillis)
            .then(() => {
              return setNewCleanUpDate(nowMillis);
            })
            .then(() => {
              console.log('resolve');
              resolve();
            });
        }
        resolve();
      })
      .catch(reject);
  });
};
