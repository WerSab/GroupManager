import {FIRESTORE_COLLECTION, TICKET_PAYMENT_STATUS} from './config';
import {
  getCollection,
  getFirestoreBatch,
  getFirestoreTimestampFromDate,
  incrementBy,
} from './fireBase/firestore-Helper';
import {getDocumentReferenceById} from './fireBase/firestore-Helper';
import {setDateTicketClearedAt} from './store/localStore';

///tickets/1c3KBRLcK085IUOdhOfg

export function getTicketsOrdersList() {
  return new Promise((resolve, reject) => {
    getCollection(FIRESTORE_COLLECTION.TICKETS)
      .where('status', '==', TICKET_PAYMENT_STATUS.UNPAID)
      .get()
      .then(querySnapshot => {
        const allDocuments = querySnapshot.docs;
        const ticketOrdersList = allDocuments.map(function (collectionElement) {
          return {
            id: collectionElement.id,
            ...collectionElement.data(),
          };
        });
        resolve(ticketOrdersList);
      })
      .catch(error => reject(error));
  });
}
export function getUserTickets(userId) {
  return new Promise((resolve, reject) => {
    console.log(`${FIRESTORE_COLLECTION.USERS}/${userId}`);
    const userRef = getDocumentReferenceById(
      `${FIRESTORE_COLLECTION.USERS}/${userId}`,
    );
    getCollection(FIRESTORE_COLLECTION.TICKETS)
      .where('user', '==', userRef)
      .where('status', '==', TICKET_PAYMENT_STATUS.PAID)
      .get()
      .then(querySnapshot => {
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

export function bulkDeleteTicket(documentReferences) {
  return new Promise((resolve, reject) => {
    const batch = getFirestoreBatch();
    documentReferences.forEach(element => {
      batch.delete(element);
    });
    batch
      .commit()
      .then(() => {
        const documentIds = documentReferences.map(element => element.id);
        console.log('Bulk delete ticket order', documentIds);
        resolve();
      })
      .catch(error => {
        console.log('deleting ticket order error ocured');
        reject(error);
      });
  });
}

export function extractTicketsInfo(tickets) {
  const ticketPromises = tickets.map(function (element) {
    return new Promise((resolve, reject) => {
      element.ticket
        .get()
        .then(ticketTypeResult => {
          resolve({
            ...element,
            ticket: ticketTypeResult.data(),
          });
        })
        .catch(error => {
          reject(error);
        });
    });
  });
  return Promise.all(ticketPromises);
}

export function getPaidTickets() {
  return new Promise((resolve, reject) => {
    getCollection(FIRESTORE_COLLECTION.TICKETS)
      .where('status', '==', TICKET_PAYMENT_STATUS.PAID)
      .get()
      .then(querySnapshot => {
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

export function deleteTicket(ticketId) {
  // tworzysz batcha
  // batch.delete(ref)
  // batch.commit();
  return getCollection(FIRESTORE_COLLECTION.TICKETS).doc(ticketId).delete();
}
export function updateTicketPaymentStatusToPaid(ticketOrderID) {
  return getCollection(FIRESTORE_COLLECTION.TICKETS).doc(ticketOrderID).update({
    status: 'paid',
  });
}

export function updateTicketPaymentStatusToUnPaid(ticketOrderID) {
  return getCollection(FIRESTORE_COLLECTION.TICKETS).doc(ticketOrderID).update({
    status: 'unpaid',
  });
}

// Object.assign() i spread operator

// const add = {

//         // tutaj

//     createdAt: timestamp,
// }

//odczytywanie promisa: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise

/**
 * @param data - 
 * @return 
* const {
* user,
* tournament,
* tickets:[ticket1, ticket2]
}  
*/
export function addNewTicketOrderToCollection(data) {
  console.log('data:', data);

  const createdAt = getFirestoreTimestampFromDate();
  console.log('createdAt:', createdAt);
  const getTicketTypeDocumentReferenceByTicketTypeId = (
    tournamentId,
    ticketTypeId,
  ) => {
    return getDocumentReferenceById(
      `${FIRESTORE_COLLECTION.TOURNAMENTS}/${tournamentId}/${FIRESTORE_COLLECTION.SUB_COLLECTION.TICKET_TYPES}/${ticketTypeId}`,
    );
  };

  return new Promise((resolve, reject) => {
    const batch = getFirestoreBatch();
    const ticketsCollectionReference = getCollection(
      FIRESTORE_COLLECTION.TICKETS,
    );
    const ordersCollectionReference = getCollection(
      FIRESTORE_COLLECTION.ORDERS,
    );
    const orderReference = ordersCollectionReference.doc();
    const ticketReferences = [];
    const ticketTypesPromises = data.tickets.map(element =>
      getTicketTypeDocumentReferenceByTicketTypeId(
        data.tournamentId,
        element.ticketTypeId,
      ).get(),
    );

    Promise.all(ticketTypesPromises)
      .then(ticketTypesSnapshots => {
        const result = ticketTypesSnapshots.map(snapshot => {
          return {
            id: snapshot.id,
            ...snapshot.data(),
          };
        });
        return result;
      })
      .then(ticketTypesData => {
        data.tickets.forEach(ticket => {
          const ticketType = ticketTypesData.find(
            ticketType => ticketType.id === ticket.ticketTypeId,
          );
          if (ticketType.slotsTaken + ticket.amount > ticketType.slots) {
            console.log('test0');
            throw new Error('Niewystarczająca ilość miejsc');
          }
          console.log('test1');
          const ticketReference = ticketsCollectionReference.doc();
          ticketReferences.push(ticketReference);
          console.log('obj1:', {
            name: ticket.name,
            ticketType: ticket.ticketTypeId,
            amount: ticket.amount,
            type: ticket.type,
          });
          batch.set(ticketReference, {
            name: ticket.name,
            ticketType: ticket.ticketTypeId,
            amount: ticket.amount,
            type: ticket.type,
          });
          const tempid = getTicketTypeDocumentReferenceByTicketTypeId(
            data.tournamentId,
            ticket.ticketTypeId,
          );
          console.log('getTicketTypeDocumentReferenceByTicketTypeId', tempid);
          batch.update(
            getTicketTypeDocumentReferenceByTicketTypeId(
              data.tournamentId,
              ticket.ticketTypeId,
            ),
            {
              slotsTaken: 1, // slotsToken += ticket.amount
            }, // https://rnfirebase.io/reference/firestore/fieldvalue
          );
        });
        console.log('test2');
        // to tworzy zamowienie (dokument)
        console.log({
          user: data.user,
          //tickets: ticketReferences,
          createdAt: createdAt,
          status: data.status,
        });
        console.log('save.user', data.user);
        batch.set(orderReference, {
          //14.11. - dorzucić tutaj price do obiektu
          price: data.price,
          user: getDocumentReferenceById(
            `${FIRESTORE_COLLECTION.USERS}/${data.user.uid}`,
          ),
          tickets: ticketReferences,
          createdAt: createdAt,
          status: data.status,
        });
        batch
          .commit()
          .then(() => {
            resolve();
          })
          .catch(error => {
            console.log('order creation failed', error);
            throw error;
          });
        //napisać transakcję( użyc batcha)
        //jak stworzyć kolejny dokument do kolekcji orders w którym bedzie tablica z referencjami do ticketów
      })
      .catch(error => {
        reject(error);
      });
  });
}
// TODO 24.10.2022
// 1. wpisuje pewna ilosc biletow np. ulgowy 4
// kasuje "4" i nic nie wpisuje
// obserwuje co sie stanie (czy bedzie okej) - zapisuje się ticket z amount 4
// 2. wpisuje pewna ilosc biletow np. ulgowy
// kasuje "4"
// wpisuje 0
// obserwuje co sie stanie po wpisaniu zera i zapisaniu - zapisuje się ulgowy z liczbą zero

export function calculateAvailableSlots(ticket, tournament) {
  //const ticketOrders=
}

//firestore_reference -> promise -> pending -> fullfilled -> ticket_type

// const sumuj = (a, b) => a + b;

// const sumuj2 = (a,b) => {
//     return a + b;
// }

// const mapujObiekt = (obj) => {
//     return {
//         ...obj,
//         a: 'x',
//     }
// }

// const mapujObiektv2 = (obj) => ({
//     ...obj,
//     a: 'x',
// });

// const element = {
//     amount: 10,
//     b: 9
// };

// // v = 'ticketType'

// const y = {
// ...element,
// v,
// }

// const y = {
//     ...element,
//     v: v,
// }

// //zbiorcze rozpakowanie referencji
// const y = [ref, ref, ref, ref]; // np. ticket (referencja do biletu)
// const v = y.map(el => el.get());
// const z = Promise.all(v);
// z.then(results => {
//     // results reprezentuje rozpakowane referencje
// });

// Promise.all();
// [].reduce();

// userTicketInfo: {
//     id: ,
//         price: ,
//     amount:,
// }

/*
   {
      amount: 3,
      ticket: ref,
      tournmanet: ref,
      user: ref,
    }
*/
//const userTickets = getUserTickets();
//const extractedUserTickets = extractTicketsInfo(userTickets).catch(er => console.log('blad', er));

// unpackReference[0].ticket.get().then((result) => {
//     setTicketList(result);
// })
//     .catch((error) => {
//         setError(error);
//     })
