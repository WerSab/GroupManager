import React, { useEffect } from 'react';
import StackContainer from './src/navigation/StackContainer';
import UserContextProvider from './src/context/UserContextProvider';
import { addNewTournamentToCollection, addParticipantToTournament, getTicketTypesFromTournament, getTournaments, sampleTicketTypes, sampleTournament } from './src/tournaments-examples';
import TournamentContextProvider from './src/context/TournamentContextProvider';
import { getUsers } from './src/users-examples';
import UserListContextProvider from './src/context/UserListContextProvider';
import firestore from '@react-native-firebase/firestore';
import { addNewTicketOrderToCollection, getUserTickets } from './src/ticket-examples';
import { extractTicketsInfo } from './src/ticket-examples';
//import { getCollection, getFirestoreTimestampFromDate, getFirestoreTimestampFromMillis } from './src/fireBase/firestoreHelper';
import { FIRESTORE_COLLECTION } from './src/config';
import MessagesContextProvider from './src/context/MessageContextProvider';


const App = () => {

  // useEffect(function () {
  //   setTimeout(function () {
  //     addNewTicketOrderToCollection({
  //       createdAt: getFirestoreTimestampFromDate()
  //     })
  //       .then(result => {
  //         console.log('zapisane dane:', result);
  //       })

  //   }, 1500)
  // }, []);
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

