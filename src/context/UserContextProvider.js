import React from 'react';
import {createContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {FIRESTORE_COLLECTION} from '../config';

export const UserContext = createContext({
  user: null,
  initializing: true,
  data: null,
  isDuringAuthProcess: false,
});

const UserContextProvider = props => {
  const [userState, setUserState] = useState({
    user: null,
    initializing: true,
    data: null,
    isDuringAuthProcess: false,
  });

  const setIsDuringAuthProcess = isDuringAuthProcess => {
    setUserState(prevState => ({
      ...prevState,
      isDuringAuthProcess,
    }));
  };

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(user => {
      if (!user) {
        setUserState(prevState => ({
          user: null,
          initializing: false,
          data: null,
          isDuringAuthProcess: prevState.isDuringAuthProcess,
        }));
        return;
      }
      firestore()
        .collection(FIRESTORE_COLLECTION.USERS)
        .doc(user.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            setUserState(prevState => ({
              user: user,
              initializing: false,
              data: documentSnapshot.data(),
              isDuringAuthProcess: prevState.isDuringAuthProcess,
            }));
          } else {
            console.log('Document doesnt exist');
          }
        })
        .catch(error => {
          console.log('Blad: ', error);
        });
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const contextValue = {
    ...userState,
    methods: {
      setIsDuringAuthProcess,
    },
  };

  return (
    <UserContext.Provider value={contextValue}>
      {props.children}
    </UserContext.Provider>
  );
};
export default UserContextProvider;
