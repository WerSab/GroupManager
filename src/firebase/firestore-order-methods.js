import {FIRESTORE_COLLECTION, TICKET_PAYMENT_STATUS} from '../config';
import {getCollection, getDocumentReferenceById} from './firestore-helpers';
import {extractTournamentInfo} from './firestore-tournament-methods';

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

export function getUserOrders(userId, ticketPaymentStatus) {
  return new Promise((resolve, reject) => {
    console.log(`${FIRESTORE_COLLECTION.USERS}/${userId}`);
    const userRef = getDocumentReferenceById(
      `${FIRESTORE_COLLECTION.USERS}/${userId}`,
    );
    const userOrders = getCollection(FIRESTORE_COLLECTION.ORDERS).where(
      'user',
      '==',
      userRef,
    );
    const ordersQuery = ticketPaymentStatus
      ? userOrders.where('status', '==', ticketPaymentStatus)
      : userOrders;

    let extractedOrderList = [];

    ordersQuery
      .orderBy('createdAt', 'desc')
      .get()
      .then(querySnapshot => {
        console.log('querysnapshot.documents:', querySnapshot.docs);
        const allDocuments = querySnapshot.docs;
        const orderList = allDocuments.map(function (collectionElement) {
          const orderFields = collectionElement.data();
          const tournament = extractTournamentInfo(orderFields.tournament);
          return {
            id: collectionElement.id,
            ...orderFields,
            tournament: tournament,
          };
        });
        return orderList;
      })
      .then(orderList => {
        extractedOrderList = orderList;
        const tournaments = orderList.map(order => {
          return order.tournament;
        });
        const result = Promise.all(tournaments);
        return result;
        // return Promise.all(tournaments);
      })
      .then(tournamentList => {
        console.log('resolved tournament list:', tournamentList);
        const result = extractedOrderList.map((extractedOrder, idx) => {
          const extractedTournament = tournamentList[idx];

          // const tournamentReference = extractedOrder.tournament;
          // console.log('Extracted order at', idx, ' =', tournamentReference);
          // const foundExtractedTournament = tournamentList.find(
          //   tournament => tournament.id === tournamentReference.id,
          // );
          return {
            ...extractedOrder,
            tournament: extractedTournament,
          };
        });
        resolve(result);
      })
      .catch(error => {
        console.error('getUserOrders:', error);
        reject(error);
      });
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
