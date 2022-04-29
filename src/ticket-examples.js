import { FIRESTORE_COLLECTION } from './config';
import { getCollection, getFirestoreTimestampFromDate } from './fireBase/firestore-Helper';
import { getDocumentReferenceById } from './fireBase/firestore-Helper';
///tickets/1c3KBRLcK085IUOdhOfg
export function getUserTickets(userId) {
    return new Promise((resolve, reject) => {
        console.log(`${FIRESTORE_COLLECTION.USERS}/${userId}`);
        const userRef = getDocumentReferenceById(`${FIRESTORE_COLLECTION.USERS}/${userId}`);

        getCollection(FIRESTORE_COLLECTION.TICKETS)
            .where('user', '==', userRef) // SELECT * FROM users WHERE user = ?
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
    return getCollection(FIRESTORE_COLLECTION.TICKETS).doc(ticketId).delete();
}


const data = {
    ticketType: route.params.ticketType,
    tournamentId: route.params.tournamentId,
    userId: userContext.user.uid,
    slots: parsedSlots,
}

// Object.assign() i spread operator

const add = {
  
        // tutaj

    createdAt: timestamp,
}
export function addNewTicketOrderToCollection(data) {
    
    return new Promise((resolve, reject) => {
        getCollection(FIRESTORE_COLLECTION.TICKETS)
            .add({
                ...data,
                createdAt: getFirestoreTimestampFromDate(),
            })
            .then(() => {
                resolve();
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




