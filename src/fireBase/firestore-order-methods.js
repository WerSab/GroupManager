import {FIRESTORE_COLLECTION, TICKET_PAYMENT_STATUS} from '../config';
import {getCollection, getDocumentReferenceById} from './firestore-helpers';

export function getTicketsOrdersList() {
  return new Promise((resolve, reject) => {
    console.log('before getCollection getTicketsOrderList()');
    //.where('status', '==', TICKET_PAYMENT_STATUS.UNPAID)
    getCollection(FIRESTORE_COLLECTION.ORDERS)
      .get()
      .then(querySnapshot => {
        console.log('snapshots:', querySnapshot.docs);
        const allDocuments = querySnapshot.docs;
        const ticketOrdersList = allDocuments.map(function (collectionElement) {
          return {
            id: collectionElement.id,
            ...collectionElement.data(),
          };
        });
        console.log('Resolving ticket order list:', ticketOrdersList);
        resolve(ticketOrdersList);
      })
      .catch(error => {
        console.log('getTicketsOrdersList:', error);
        reject(error);
      });
  });
}

export function getUserOrders(userId) {
  return new Promise((resolve, reject) => {
    console.log(`${FIRESTORE_COLLECTION.USERS}/${userId}`);
    const userRef = getDocumentReferenceById(
      `${FIRESTORE_COLLECTION.USERS}/${userId}`,
    );
    console.log('userRef:', userRef);
    getCollection(FIRESTORE_COLLECTION.ORDERS)
      .where('user', '==', userRef)
      .where('status', '==', TICKET_PAYMENT_STATUS.UNPAID)
      .get()
      .then(querySnapshot => {
        console.log('querysnapshot.documents:', querySnapshot.docs);
        const allDocuments = querySnapshot.docs;
        const ticketList = allDocuments.map(function (collectionElement) {
          return {
            id: collectionElement.id,
            ...collectionElement.data(),
          };
        });

        resolve(ticketList);
      })
      .catch(error => reject(error));
  });
}

export function updateOrderPaymentStatusToPaid(ticketOrderID) {
  return getCollection(FIRESTORE_COLLECTION.ORDERS).doc(ticketOrderID).update({
    status: 'paid',
  });
}

export function updateOrderPaymentStatusToUnPaid(ticketOrderID) {
  return new Promise((resolve, reject) => {
    getCollection(FIRESTORE_COLLECTION.ORDERS)
      .doc(ticketOrderID)
      .update({
        status: 'unpaid',
      })
      .then(() => {
        resolve();
      })
      .catch(error => reject(error));
  });
}

export function getPaidOrders() {
  return new Promise((resolve, reject) => {
    getCollection(FIRESTORE_COLLECTION.ORDERS)
      .where('status', '==', TICKET_PAYMENT_STATUS.PAID)
      .get()
      .then(querySnapshot => {
        const allDocuments = querySnapshot.docs;
        const ordersList = allDocuments.map(function (collectionElement) {
          return {
            id: collectionElement.id,
            ...collectionElement.data(),
          };
        });
        resolve(ordersList);
      })
      .catch(error => reject(error));
  });
}
