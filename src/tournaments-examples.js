import { FIRESTORE_COLLECTION } from './config';
import { FirestoreDataContext } from './context/FirestoreDataProvider';
import { addToArray, getCollection, getFirestoreTimestampFromDate } from './fireBase/firestoreHelper';
import { firestore } from '@react-native-firebase/firestore';

//lista turniejów - tournaments FlatList
export function getTournaments() {
    return new Promise((resolve, reject) => {
        getCollection(FIRESTORE_COLLECTION.TOURNAMENTS)
            .get()//asynchronicznie pobieramy wszystkie dane o kolekcji
            .then(querySnapshot => {
                const allDocuments = querySnapshot.docs;
                const tournamentsList = allDocuments.map(function (collectionElement)//metoda zwraca nam wyselekcjonowane dane bez zbędnych np metadanych
                {
                    return {
                        id: collectionElement.id,
                        ...collectionElement.data(),
                    }
                    // return collectionElement.data();
                })
                resolve(tournamentsList)

            })
            .catch((error) => reject(error))
    })
}

export function addParticipantToTournament(tournamentId, userId) {
    return new Promise((resolve, reject) => {
        getCollection(FIRESTORE_COLLECTION.TOURNAMENTS)
            .doc(tournamentId)
            .update({
                participants: addToArray(userId),
            })
            .then(() => {
                resolve();
            })
            .catch((error) => reject(error));
    })

}

export function deleteTournament(tournamentId) {
    return getCollection(FIRESTORE_COLLECTION.TOURNAMENTS).doc(tournamentId).delete();
}
// dopisać funkcję zliczania rezerwacji
export function updateBookingsToTournament(tournamentId, bookings) {
    return getCollection(FIRESTORE_COLLECTION.TOURNAMENTS)
        .doc(tournamentId)
        .update({
            numberOfBookings: bookings
        })

}

/*
interface ITicketType: {
    id: string!
    name: string!
    price: number!
    slots: number!
    description: string,
}

const x: ITicketType = {
    id: '100',
    name: 'halo',
    price: 100,
    slots: 100,
}
*/

export function addNewTournamentToCollection(tournament, ticketTypes) {
    return new Promise((resolve, reject) => {
        let addedTournamentReference;
        const batch = firestore.batch()
        getCollection(FIRESTORE_COLLECTION.TOURNAMENTS)
            .add(tournament)
            .then((tournament) => {
                addedTournamentReference = tournament;
                return tournament.collection(FIRESTORE_COLLECTION.SUB_COLLECTION.TICKET_TYPES);
            })
            .then((ticketTypesCollectionReference) => {
                // const ticketTypePromises = ticketTypes.map(ticketType => {
                //    return ticketTypesCollectionReference.add(ticketType);
                // });
                // return Promise.all(ticketTypePromises);
                
                const ticketTypesLength = ticketTypes.length;

                const result=[];
                for (let i = 0; i < ticketTypesLength; i++) {
                    const ticketTypePromise = ticketTypesCollectionReference.add(ticketTypes[i]);

                    result.push(ticketTypePromise);
                            //dodawanie elementów do tablicy                   
                            // [].push(element);
                            // [...a, {}]
                }
                return Promise.all(result);

            })
            .then((ticketTypeDocumentReferences)=>{
                resolve({
                    tournament: addedTournamentReference,
                    ticketTypeReferences: ticketTypeDocumentReferences
                });
            }
            
            )
            .catch((error) => reject(error));
    })
}

const x = {
    doc: () => {

    }
}

export function bookingsCounter(participants, bookings) {
    return participants - bookings;
};


const sampleTournament = {
    startTime: getFirestoreTimestampFromDate(new Date('December 17, 2022 03:24:00')),
    intervalInMinutes: 60,//czas w minutach,
    name: 'Koncert Galowy',
    slots: 100,
    place: 'Hala Widowiskowa',
};

const sampleTicketTypes = [
    {
        id: '12egvregtv',
        name: 'premium',
        price: 150,
        slots: 200,
        description: 'płyta główna',
    },
    {
        id: '15ftgrhthn',
        name: 'basic',
        price: 90,
        slots: 300,
        description: 'trybuny',
    }


]

const createTicketTypes = () => [];

const sampleTournamentWithTicketTypes = {
    ...sampleTournament,
    ticketTypes: createTicketTypes(sampleTournament),
}


//do nowego pliku zdefiniowac dwie funkcje remove from array & add to array

/*
    inputs:
        1. [1, 3, 4, 8, 24, 91, 512, -43, 21, -31]
                   / const tab = [1, 3, 4, 8, 24, 91, 512, -43, 21, -31];
                    const tab1 = tab.map(x => x * 8);
                    console.log(tab1);/
        2. [
            {
                id: '134',
                name: 'asdasd',
                age: 34
            }
        ]
        /const map1 = array1.map(x => x.age);/
        -----------------filtr-------------------
        3. [10, 40, 20, -20, -34]
        /const map1 = tab.filter(x => x%3==0);
            console.log(map1);/
        4. [
            {
                id: '134',
                name: 'asdasd',
                age: 34
            }
        ]
        /const map1 = tab.filter(x => x.age>18)/
        5. [
            {
                id: '134',
                name: 'asdasd',
                age: 34,
                pets: ['dog', 'cat']
            }
        ]
        /const map1 = tab.filter(x => x.pets!=='dog');/

    outputs:
        1. [] <-- kazdy element ma zostac przemnozony przez 8
        2. [ 34, 24, 18, 13 ] <-- wyciagnac  wiek z kazdego obiektu
        3.

        -----------------filtr-------------------
        3. [] <-- Tablica ma zawierac elementy tylko podzielne przez 3
        4. [] <-- Tablica obiektow, ktorych wiek > 18 (tylko dorosle obiekty)
        5. [] <-- Tablica obiektow gdzie osoba ma psa (bez kotow)

    .some, every (array functions)
*/

// output: [{tournament1Data}, {tournament2Data}]

/*
{
    id: asdkkasdkajsd
    data()
}
*/
//szczegóły turnieju-tournament card
/*export function getTournment(id) {
    return new Promise((resolve, reject) => {
        getCollection(FIRESTORE_COLLECTION.TOURNAMENTS)
        firestore()
            .doc(id)
            .get()
            .then(documentSnapshot => {
                const tournamentDetails = documentSnapshot.doc
                {
                    if (documentSnapshot.exists) {
                        return documentSnapshot.data();
                    }
                }
                resolve(tournamentDetails)
            })
            .catch((error) => reject(error))
    })

}

//lista rund do danego turnieju
export function getRounds(id) {//id tournament
    return new Promise((resolve, reject) => {
        getCollection(FIRESTORE_COLLECTION.TOURNAMENTS)
        firestore()
            .doc(id)
            .collection('rounds')
            .get()
            .then(querySnapshot => {
                const allDocuments = querySnapshot.docs;
                const roundList = allDocuments.map(function (firestoreDocument) {
                    return firestoreDocument.data().rounds;
                })
                resolve(roundList)

            })
            .catch((error) => reject(error))
    })


}

//szczegóły rundy - round card
export function getRound(id, idRound) {
    return new Promise((resolve, reject) => {
        getCollection(FIRESTORE_COLLECTION.TOURNAMENTS)
        firestore()
            .doc(id)
            .collection('rounds')
            .doc(idRound)
            .get()
            .then(documentSnapshot => {
                const roundDetails = documentSnapshot.doc
                {
                    if (documentSnapshot.exists) {
                        return documentSnapshot.data();
                    }
                }
                resolve(roundDetails)
            })
            .catch((error) => reject(error))
    })

}*/
