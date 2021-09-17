import React from 'react';
import {createContext, useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';
import FirestoreDataProvider from './FirestoreDataProvider';

export const FirebaseUserContext = createContext([null, true]);

const FirebaseUserProvider = (props) => {
  const children = props.children;
  
  const [authUser, setAuthUser] = useState();
  const [initializing, setInitializing] = useState(true);

  /*
    
  */
  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setAuthUser(user);
      console.log('User', JSON.stringify(user));//wypisze zawartośc w postaci stringa
    });//ta metoda wywołuje użytkownika po zalogowaniu (lub nie)
    /* 
      Odpowiednik metody componentWillUnmount()
    */
    return () => {
      // tutaj mozemy dac co chcemy
      unsubscribe();
    };
  }, []);

  return (
    <FirebaseUserContext.Provider value={[authUser, initializing]}>
      <FirestoreDataProvider updateInitializing={setInitializing}>
        {children}
      </FirestoreDataProvider>
    </FirebaseUserContext.Provider>
  );
};
export default FirebaseUserProvider;
