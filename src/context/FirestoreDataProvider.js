import { createContext, useContext, useState, useEffect } from "react";
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { FIRESTORE_COLLECTION } from "../config";
import { FirebaseUserContext } from "./FireBaseUserProvider";

export const FirestoreDataContext = createContext(null);

const FirestoreDataProvider = ({children, updateInitializing}) => {

    const authUser = useContext(FirebaseUserContext);

    const [data, setData] = useState(null);

    useEffect(() => {
        if (authUser) {
          firestore()
            .collection(FIRESTORE_COLLECTION.USERS)
            .doc(authUser.uid)
            .get()
            .then(documentSnapshot => {
              if (documentSnapshot.exists) {
                setData(documentSnapshot.data());
                updateInitializing(false);
              }
            })
            .catch((error) => {
                console.log('Blad: ' + JSON.stringify(error));
            });
        }else{
            setData(null);
            updateInitializing(false);
        }
      }, [authUser]);

    return (
        <FirestoreDataContext.Provider value={data}>
            {children}
        </FirestoreDataContext.Provider>
    )
};

export default FirestoreDataProvider;