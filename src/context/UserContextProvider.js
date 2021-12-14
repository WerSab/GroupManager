import React from 'react';
import { createContext, useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { FIRESTORE_COLLECTION } from '../config';

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
  
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (user) {
        firestore()
          .collection(FIRESTORE_COLLECTION.USERS)
          .doc(user.uid)
          .get()
          .then(documentSnapshot => {
            
            if (documentSnapshot.exists) {
              
              setUserState({
                user: user,
                initializing: false,
                data: documentSnapshot.data()
              });

            }
            else {
              console.log('Document doesnt exist');
            }
          })
          .catch((error) => {
            console.log('Blad: ', error);
          });

      }
      else {
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

  return (

    <UserContext.Provider value={userState}>
      {props.children}
    </UserContext.Provider>


  )


}
export default UserContextProvider;