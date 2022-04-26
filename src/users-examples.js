import { FIRESTORE_COLLECTION } from './config';
import { getCollection } from './fireBase/firestore-Helper';

export function getUsers() {
    return new Promise((resolve, reject) => {
        getCollection(FIRESTORE_COLLECTION.USERS)
            .get()//asynchronicznie pobieramy wszystkie dane o kolekcji
            .then(querySnapshot => {
                const allDocuments = querySnapshot.docs;
                const usersList = allDocuments.map(function (collectionElement)//metoda zwraca nam wyselekcjonowane dane bez zbędnych np metadanych
                {
                    return {
                        id: collectionElement.id,
                        ...collectionElement.data(),
                    }
                    // return collectionElement.data();
                })
                resolve(usersList)

            })
            .catch((error) => reject(error))
    })
}

export function updateTicketOrdersToUser(userId, bookings) {
    return getCollection(FIRESTORE_COLLECTION.USERS)
        .doc(userId)
        .update({
            numberOfBookings: bookings
        })

}

