import {createContext, useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

export const FirebaseUserContext = createContext({
  user: {
    authUser: null,
    firestoreUser: null,
  },
  initializing: true,
});

const FirebaseUserProvider = ({children}) => {
  const [authUser, setAuthUser] = useState();
  const [firestoreUser, setFirestoreUser] = useState();
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    auth().onAuthStateChanged(user => {
      setAuthUser(user);
    });
  }, []);

  useEffect(() => {
    if (authUser) {
      const userDocument = firestore()
        .collection('users')
        .doc(authUser.uid)
        .get()
        .then(documentSnapshot => {
          if (documentSnapshot.exists) {
            setFirestoreUser(documentSnapshot.data());
            setInitializing(false);
          }
        });
    }
  }, [authUser]);

  return (
    <FirebaseUserContext.Provider
      value={{
        user: {
          authUser: authUser,
          firestoreUser: firestoreUser,
          initializing: initializing,
        },
      }}>
      {children}
    </FirebaseUserContext.Provider>
  );
};
export default FirebaseUserProvider;
