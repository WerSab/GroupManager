import React, {useEffect} from 'react';
import StackContainer from './src/navigation/StackContainer';
import UserContextProvider from './src/context/UserContextProvider';
import {
  addNewTournamentToCollection,
  addParticipantToTournament,
  getTicketTypesFromTournament,
  getTournaments,
  sampleTicketTypes,
  sampleTournament,
} from './src/tournaments-examples';
import TournamentContextProvider from './src/context/TournamentContextProvider';
import {getUsers} from './src/users-examples';
import UserListContextProvider from './src/context/UserListContextProvider';
import firestore from '@react-native-firebase/firestore';
import {
  addNewTicketOrderToCollection,
  getUserTickets,
} from './src/ticket-examples';
import {extractTicketsInfo} from './src/ticket-examples';
//import { getCollection, getFirestoreTimestampFromDate, getFirestoreTimestampFromMillis } from './src/fireBase/firestoreHelper';
import {FIRESTORE_COLLECTION} from './src/config';
import MessagesContextProvider from './src/context/MessageContextProvider';
import {getCollection} from './src/fireBase/firestore-Helper';
import OrderContextProvider from './src/context/OrderContextProvider';

// getCollection(FIRESTORE_COLLECTION.TICKETS).get()
// .then(snapshots => {
//     snapshots.forEach(snapshot => {
//       snapshot.ref.delete();
//     })
// })

const App = () => {
  const testFn = () => {
    const tournamentReference = getCollection(
      FIRESTORE_COLLECTION.TOURNAMENTS,
    ).doc('1LFKSrf1f3T9tPNOLYIA');
    const data = {
      user: getCollection(FIRESTORE_COLLECTION.USERS).doc('12'),
      tournament: tournamentReference,
      tickets: [
        {
          name: 'Płyta',
          ticketTypeRef: tournamentReference
            .collection(FIRESTORE_COLLECTION.SUB_COLLECTION.TICKET_TYPES)
            .doc('Gu9hHfCLliRndDRyTkp5'),
          amount: 3,
          type: 'normalny',
        },
        // {
        //   name: 'Trybuny',
        //   ticketTypeRef: tournamentReference.collection(FIRESTORE_COLLECTION.SUB_COLLECTION.TICKET_TYPES).doc('C67R7O1UNQXQjFXFTjN4'),
        //   amount: 10,
        //   type: 'ulgowy',
        // }
      ],
      status: 'unpaid',
    };

    addNewTicketOrderToCollection(data)
      .then(() => {
        console.log('zapisano zamowienie');
      })
      .catch(error => console.log('test fn error:', error));
  };

  useEffect(function () {
    //testFn();
  }, []);
  //kolejne kroki:
  //1. Rozpoczynanie transakcji - tournaments-examples
  //2. Stworzenie turniejowego dokumentu( dta,miejsce itd)  - tournaments-examples
  //3. Dorzucenie do dokumentu turniejowego subkolekcji- tournaments-examples
  //4. Commitowanie zmian - zamykamy i potwierdzamy transakcję - wrzucenie wszystkich operacji do bazy danych

  // setState();
  // tournament.get().then(result => {
  //   setTournament(result);
  //   setState(false);
  // });

  return (
    <UserContextProvider>
      <TournamentContextProvider>
        <UserListContextProvider>
          <MessagesContextProvider>
            <StackContainer />
          </MessagesContextProvider>
        </UserListContextProvider>
      </TournamentContextProvider>
    </UserContextProvider>
  );
};
export default App;
