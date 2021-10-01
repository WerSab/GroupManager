import { createContext, useState, useEffect } from "react";
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { FIRESTORE_COLLECTION } from "../config";

export const FirestoreDataContext = createContext(null);

const FirestoreDataProvider = ({children, authUser, updateInitializing}) => {

    const [data, setData] = useState(null);
    useEffect(() => {
     
    console.log('authUser useeffect: ', authUser?.uid);
        if (authUser) {
          firestore()
            .collection(FIRESTORE_COLLECTION.USERS)
            .doc(authUser.uid)
            .get()
            .then(documentSnapshot => {
              console.log('snapshot: ', documentSnapshot);
              if (documentSnapshot.exists) {
                // pobieram dane uzytkownika z bazy danych i przypisuje do stanu [data]
                setData(documentSnapshot.data());
                
              }
              else{
                console.log('Document doesnt exist');
              }
              updateInitializing(false);
            })
            .catch((error) => {
                console.log('Blad: ' + JSON.stringify(error));
            }); 
        }else{
            setData(null);
            updateInitializing(false);
        }
      }, [authUser]);

      // dostarczam dane o uzytkowniku ze stanu [data] do calej aplikacji (context)
    return (
        <FirestoreDataContext.Provider value={data}>
            {children}
        </FirestoreDataContext.Provider>
    )
};

export default FirestoreDataProvider;