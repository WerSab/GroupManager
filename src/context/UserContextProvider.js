import React from 'react';
import { createContext, useEffect, useState } from 'react';

import auth from '@react-native-firebase/auth';

export const UserContext = createContext({
    user: null,
    initializing: true,
    data: null,
})

const UserContextProvider = (props) => {

    const [userState, setUserState] = useState({

        user: null,
        initializing: true,
        data: null,
    });
//wzorzec obserwatora to metoda onAuthStateChanged (wartosc user jest wartoscia obserwowana)
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged(user => {
          if(user){
              firestore()
              .collection(FIRESTORE_COLLECTION.USERS)
            .doc(user.uid)
            .get()
            .then(documentSnapshot => {
              //console.log('snapshot: ', documentSnapshot);
              if (documentSnapshot.exists) {
                // pobieram dane uzytkownika z bazy danych i przypisuje do stanu [data]
                setUserState({
                    user: user,
                    initializing: false,
                    data: documentSnapshot.data()
                });
                
              }
              else{
                console.log('Document doesnt exist');
              }
            })
            .catch((error) => {
                console.log('Blad: ' + JSON.stringify(error));
            }); 

          }
          else{
              setUserState({
                user: null,
                initializing: false,
                data: null,
              })
          }
          console.log('state: ', userState);
        })
        return () => {
          unsubscribe();
        };
      }, []);

    return(
       
<UserContext.Provider value={userState}>
    {props.children}
</UserContext.Provider>


    )


}
export default UserContextProvider;