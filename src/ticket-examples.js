import { FIRESTORE_COLLECTION, TICKET_PAYMENT_STATUS } from './config';
import { getCollection, getFirestoreBatch, getFirestoreTimestampFromDate } from './fireBase/firestore-Helper';
import { getDocumentReferenceById } from './fireBase/firestore-Helper';
import { setDateTicketClearedAt } from './store/localStore';
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
                    }

                })
                resolve(ticketOrdersList)

            })
            .catch((error) => reject(error))
    });
}
export function getUserTickets(userId) {
    return new Promise((resolve, reject) => {
        console.log(`${FIRESTORE_COLLECTION.USERS}/${userId}`);
        const userRef = getDocumentReferenceById(`${FIRESTORE_COLLECTION.USERS}/${userId}`);
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
                    }

                })
                    
                resolve(ticketList)

            })
            .catch((error) => reject(error))

    });
}

export function getUserOrders(userId) {
    return new Promise((resolve, reject) => {
        console.log(`${FIRESTORE_COLLECTION.USERS}/${userId}`);
        const userRef = getDocumentReferenceById(`${FIRESTORE_COLLECTION.USERS}/${userId}`);
                getCollection(FIRESTORE_COLLECTION.TICKETS)
            .where('user', '==', userRef)
            .where('status', '==', TICKET_PAYMENT_STATUS.UNPAID)
            .get()
            .then(querySnapshot => {
                const allDocuments = querySnapshot.docs;
                const ticketList = allDocuments.map(function (collectionElement) {
                    return {
                        id: collectionElement.id,
                        ...collectionElement.data(),
                    }

                })
                    
                resolve(ticketList)

            })
            .catch((error) => reject(error))

    });
}


export function bulkDeleteTicket(documentReferences) {
    return new Promise((reject) => {
        const batch = getFirestoreBatch();
        documentReferences.forEach(element => {
            batch.delete(element);
        });
        batch.commit()
            .then(
                console.log('ticket order deleted')
            )
            .catch((error) => {
                console.log('deleting ticket order error ocured');
                reject(error);
            })
    })
}

export function extractTicketsInfo(tickets) {
    const ticketPromises = tickets.map(function (element) {
        return new Promise((resolve, reject) => {
            element.ticket.get()
                .then(ticketTypeResult => {
                    resolve({
                        ...element,
                        ticket: ticketTypeResult.data(),
                    })
                })
                .catch(error => {
                    reject(error);
                })

        })


    });
    return Promise.all(ticketPromises);
}


export function deleteTicket(ticketId) {
    // tworzysz batcha
    // batch.delete(ref)
    // batch.commit();
    return getCollection(FIRESTORE_COLLECTION.TICKETS).doc(ticketId).delete();
}




// Object.assign() i spread operator

// const add = {

//         // tutaj

//     createdAt: timestamp,
// }

//odczytywanie promisa: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise


export function addNewTicketOrderToCollection(data) {
    const createdAt = getFirestoreTimestampFromDate();

    return new Promise((resolve, reject) => {

        getCollection(FIRESTORE_COLLECTION.TICKETS)
            .add({
                ...data,
                createdAt: createdAt,

            }, console.log('AddcreatedAt', createdAt)
            )
            .then((documentReference) => {
                resolve(documentReference);
            })
            .catch((error) => reject(error));
    })
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




