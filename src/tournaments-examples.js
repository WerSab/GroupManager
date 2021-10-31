import firestore from '@react-native-firebase/firestore';
import { FIRESTORE_COLLECTION } from './config';
export function getTournaments() {
    return new Promise((resolve, reject) => {
        getCollection(FIRESTORE_COLLECTION.TOURNAMENTS)
            .get()//asynchronicznie pobieramy wszystkie dane o kolekcji
            .then(querySnapshot =>  {
                const allDocuments = querySnapshot.docs;
                const tournamentsList= allDocuments.map(function (firestoreDocument)//metoda zwraca wszystkie pola dokumentu
                {
                    return firestoreDocument.data();
                })
                resolve (tournamentsList)
                //console.log('Total users: ', querySnapshot.size);

                //querySnapshot.forEach(documentSnapshot => {
                //console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
            })
    })
        .catch((error) => reject(error))
    //promise

}
// output: [{tournament1Data}, {tournament2Data}]

/*
{
    id: asdkkasdkajsd
    data()
}
*/

function getTournment(id) => new Promise((resolve, reject) =>

)
}

//
// output: {tournamentData}

/*firestore()
  .collection('Users')
  .get()
  .then(querySnapshot => {
    console.log('Total users: ', querySnapshot.size);

    querySnapshot.forEach(documentSnapshot => {
      console.log('User ID: ', documentSnapshot.id, documentSnapshot.data());
    });
  });*/