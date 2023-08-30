import {FIRESTORE_COLLECTION} from '../config';
import {FirestoreDataContext} from './context/FirestoreDataProvider';
import {
  addToArray,
  getCollection,
  getDateFromTimestamp,
  getDocumentReferenceById,
  getFirestoreTimestampFromDate,
} from './/firestore-helpers';
import firestore from '@react-native-firebase/firestore';
import {mapFirestoreTournament} from './firestore-mappers';

export const getTournamentReferenceById = tournamentId => {
  return getDocumentReferenceById(
    `${FIRESTORE_COLLECTION.TOURNAMENTS}/${tournamentId}`,
  );
};
// unpackReference[0].ticket.get().then((result) => {
//     setTicketList(result);
// })
//     .catch((error) => {
//         setError(error);
//     })
export function extractTournamentInfo(tournamentRef) {
  const tournamentPromise = new Promise((resolve, reject) => {
    tournamentRef
      .get()
      .then(tournamentResult => {
        resolve({
          id: tournamentResult.id,
          ...tournamentResult.data(),
        });
      })
      .catch(error => {
        reject(error);
      });
  });
  return tournamentPromise;
}

export function getTournaments() {
  return new Promise((resolve, reject) => {
    getCollection(FIRESTORE_COLLECTION.TOURNAMENTS)
      .get() //asynchronicznie pobieramy wszystkie dane o kolekcji
      .then(querySnapshot => {
        const allDocuments = querySnapshot.docs;
        const tournamentsList = allDocuments.map(function (
          collectionElement, //metoda zwraca nam wyselekcjonowane dane bez zbędnych np metadanych
        ) {
          const mappedTournament = mapFirestoreTournament(
            collectionElement.data(),
          );
          return {
            id: collectionElement.id,
            ...mappedTournament,
          };
          // return collectionElement.data();
        });
        resolve(tournamentsList);
        console.log('ccccccccccc', tournamentsList);
      })
      .catch(error => reject(error));
  });
}

export function getTicketTypesForTournamentId(tournamentId) {
  return new Promise((resolve, reject) => {
    getCollection(FIRESTORE_COLLECTION.TOURNAMENTS)
      .doc(tournamentId)
      .collection(FIRESTORE_COLLECTION.SUB_COLLECTION.TICKET_TYPES)
      .get()
      .then(querySnapshot => {
        const ticketTypes = querySnapshot.docs;
        console.log('getTicketTypesForTournamentId_ticketTypes', ticketTypes);
        const ticketTypesList = ticketTypes.map(function (document) {
          return {
            id: document.id,
            ...document.data(),
          };
        });
        console.log('ticketTypesList', ticketTypesList);
        resolve(ticketTypesList);
      })
      .catch(error => reject(error));
  });
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
      .catch(error => reject(error));
  });
}

export function deleteTournament(tournamentId) {
  // deletedAt: timestamp firestore
  return getCollection(FIRESTORE_COLLECTION.TOURNAMENTS)
    .doc(tournamentId)
    .delete();
}

class Logger {
  log(message) {
    if (__DEV__) {
      console.log(message);
      return;
    }
    crashlytics().log(message);
  }
}

// crashlytics().recordError();

function getTournamentTicketTypesCollection(tournamentId) {
  const tournamentCollection = getCollection(FIRESTORE_COLLECTION.TOURNAMENTS);
  const tournament = tournamentCollection.doc(tournamentId);
  const tournamentTicketTypes = tournament.collection(
    FIRESTORE_COLLECTION.SUB_COLLECTION.TICKET_TYPES,
  );
  return tournamentTicketTypes;
}

export async function addTicketType(tournamentId, ticketType) {
  const tournamentTicketTypes =
    getTournamentTicketTypesCollection(tournamentId);
  try {
    return await tournamentTicketTypes.add({
      ...ticketType,
      slotsTaken: 0,
    });
  } catch (error) {
    console.log('addTicketType error:', error);
  }
}

export function deleteTicketType(tournamentId, ticketTypeId) {
  // deletedAt: timestamp firestore
  const tournamentTicketTypes =
    getTournamentTicketTypesCollection(tournamentId);
  const foundTicketType = tournamentTicketTypes.doc(ticketTypeId);
  const promise = foundTicketType.delete().catch(error => {
    console.log('deleteTicketType error:', error);
  });
  return promise;

  // return getCollection(FIRESTORE_COLLECTION.TOURNAMENTS)
  //   .doc(tournamentId)
  //   .collection(FIRESTORE_COLLECTION.SUB_COLLECTION.TICKET_TYPES)
  //   .doc(ticketTypeId)
  //   .delete();
}
// dopisać funkcję zliczania rezerwacji
export function updateTicketOrdersToTournament(tournamentId, orders) {
  return getCollection(FIRESTORE_COLLECTION.TOURNAMENTS)
    .doc(tournamentId)
    .update({
      numberOfOrders: orders,
    });
}
export function modifyTournament(tournamentId, tournament) {
  return getCollection(FIRESTORE_COLLECTION.TOURNAMENTS)
    .doc(tournamentId)
    .update(tournament);
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
//Typy generyczne dla useState z wykorzystaniem typeScript
// type MyData {
//     title: string;
//     price: number;
// }

// const [state, setState] = useState<MyData>();

// setState({
//     xxx: 10,
// })
//05.12.2022 - mozliwość niewpisania adresu do strony- przesyłanie pustej wartości zamiast pustego stringa (zabezpieczyć ifami)
export function addNewTournamentToCollection(tournament, ticketTypes) {
  console.log('Test_addNewTournamentToCollection', ticketTypes);
  return new Promise((resolve, reject) => {
    const ticketTypesLength = ticketTypes.length;
    const batch = firestore().batch(); //pozwala na zapisywanie kolejnych dokumentów
    const newTournamentReference = getCollection(
      FIRESTORE_COLLECTION.TOURNAMENTS,
    ).doc();

    batch.set(newTournamentReference, tournament);
    const ticketTypesCollectionReference = newTournamentReference.collection(
      FIRESTORE_COLLECTION.SUB_COLLECTION.TICKET_TYPES,
    );
    const ticketTypeResponse = [];

    for (let i = 0; i < ticketTypesLength; i++) {
      const ticketTypeReference = ticketTypesCollectionReference.doc();
      const ticketType = {
        ...ticketTypes[i],
        slotsTaken: 0,
      };

      batch.set(ticketTypeReference, ticketType);

      const parsedTicketType = {
        id: ticketTypeReference.id,
        ...ticketType,
      };

      ticketTypeResponse.push(parsedTicketType);

      //2 opcja - ticketTypeResponse = [...ticketTypeResponse, parsedTicketType];

      //dodawanie elementów do tablicy
      // [].push(element);
      // [...a, {}]
    }

    batch
      .commit()
      .then(() => {
        resolve({
          id: newTournamentReference.id,
          ...tournament,
          ...ticketTypeResponse,
        });
        console.log(
          `Added document with id ${newTournamentReference.id} to tournaments collection`,
        );
      })
      .catch(error => {
        console.log(
          'Add new tournament with ticketTypes error occured:',
          error,
        );
        reject(error);
      });
    /*
            {
                id: id_nowo_dodanego_turnieju
                // + pola turnieju
                ticketTypes: [
                    {
                        id: id_dodanego_rodzaju_biletu,
                        // + pola rodzaju biletu
                    }
                ],
            }
        */
    // .then((ticketTypeDocumentReferences)=>{
    //     resolve({
    //         tournament: addedTournamentReference,
    //         ticketTypeReferences: ticketTypeDocumentReferences
    //     });
    // }

    // )
    // .catch((error) => reject(error));
  });
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
