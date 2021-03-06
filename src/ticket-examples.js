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
    return new Promise((resolve, reject) => {
        const batch = getFirestoreBatch();
        documentReferences.forEach(element => {
            batch.delete(element);
        });
        batch.commit()
            .then(
                () => {

                    const documentIds = documentReferences.map(element => element.id);
                    console.log('Bulk delete ticket order', documentIds);
                    resolve();
                }

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
                    }

                })

                resolve(ticketList)

            })
            .catch((error) => reject(error))

    });
}


export function deleteTicket(ticketId) {
    // tworzysz batcha
    // batch.delete(ref)
    // batch.commit();
    return getCollection(FIRESTORE_COLLECTION.TICKETS).doc(ticketId).delete();
}
export function updateTicketPaymentStatusToPaid(ticketOrderID) {
    return getCollection(FIRESTORE_COLLECTION.TICKETS)
        .doc(ticketOrderID)
        .update({
            status: 'paid',
        })

}

export function updateTicketPaymentStatusToUnPaid(ticketOrderID) {
    return getCollection(FIRESTORE_COLLECTION.TICKETS)
        .doc(ticketOrderID)
        .update({
            status: 'unpaid',
        })

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
    //parametr data to tablica z obiektami gdzie obiekt to np. 3 bilety ulgowe lub dwa normalne
    //tworzymy dokumenty biletowe, kt??re zapisujemy najpierw w kolekcji tickets, 
    //referencje do zapisanych bilet??w zapisuj?? w kolekcji orders
    //wszystko co dodajemy to dodajemy na poziome transakcji

    // plyta 10zl 50 - x
    // cena ulgowa = podaj cene
    // ilosc miejsc = podaj dostepna ilosc miejsc
    // tworze obiekt y na podstawie x
    // [x,y]

    const createdAt = getFirestoreTimestampFromDate();
// const map = new Map();
// // const obj = {
//     key: 'v',
// };
    return new Promise((resolve, reject) => {
        const batch = getFirestoreBatch();

        const ticketsCollectionReference = getCollection(FIRESTORE_COLLECTION.TICKETS);
        const ordersCollectionReference = getCollection(FIRESTORE_COLLECTION.ORDERS);//tworzymy referencj?? do kolekcji
        const orderReference = ordersCollectionReference.doc();//tworzymy referencj?? do dokumentu
        const ticketReferences = [];//deklarujemy tablic?? referencji do tickets
        data.tickets.forEach(ticket => {
            const ticketReference = ticketsCollectionReference.doc();
            ticketReferences.push(ticketReference);//wype??niamy tablic?? referencjami do tickets
            // array[ticketReference]
            // Object.assign();
            batch.set(ticketReference,
                {
                    user: data.user,
                    tournament: data.tournament,
                    ...ticket,
                    createdAt: createdAt,
                });
        });
        batch.set(orderReference, {
            user: data.user,
            tickets: ticketReferences,
            createdAt: createdAt,
            status: data.status,
        });
        batch.commit()
        .then(() => {
            resolve();
        })
        .catch((error)=>{
            console.log('order creation failed', error)
            reject(error)
        })
        //napisa?? transakcj??( u??yc batcha)
        //jak stworzy?? kolejny dokument do kolekcji orders w kt??rym bedzie tablica z referencjami do ticket??w
    })
}

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




