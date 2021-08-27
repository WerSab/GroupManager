import React from 'react';
import {createContext, useEffect, useState} from 'react';

import auth from '@react-native-firebase/auth';
import FirestoreDataProvider from './FirestoreDataProvider';

export const FirebaseUserContext = createContext([null, true]);

const FirebaseUserProvider = ({children}) => {
  const [authUser, setAuthUser] = useState();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      setAuthUser(user);
    });
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
