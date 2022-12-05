import {FIRESTORE_COLLECTION, TICKET_PAYMENT_STATUS} from '../config';
import {getCollection, getDocumentReferenceById} from './firestore-Helper';

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
