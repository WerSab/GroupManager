import { FIRESTORE_COLLECTION } from './config';
import { getCollection } from './fireBase/firestoreHelper';

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

/*

    inputs: 
        1. [1, 3, 4, 8, 24, 91, 512, -43, 21, -31]
        2. [
            {
                id: '134',
                name: 'asdasd',
                age: 34
            }
        ]
        -----------------filtr-------------------
        3. [10, 40, 20, -20, -34]
        4. [
            {
                id: '134',
                name: 'asdasd',
                age: 34
            }
        ]
        5. [
            {
                id: '134',
                name: 'asdasd',
                age: 34,
                pets: ['dog', 'cat']
            }
        ]

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
