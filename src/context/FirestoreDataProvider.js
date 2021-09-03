import { createContext, useContext, useState, useEffect } from "react";
import React from 'react';
import firestore from '@react-native-firebase/firestore';
import { FIRESTORE_COLLECTION } from "../config";
import { FirebaseUserContext } from "./FireBaseUserProvider";

export const FirestoreDataContext = createContext(null);

const FirestoreDataProvider = ({children, updateInitializing}) => {

    const authUser = useContext(FirebaseUserContext);//uzyskanie id usera

    const [data, setData] = useState(null);

    useEffect(() => {
        if (authUser) {
          firestore()
            .collection(FIRESTORE_COLLECTION.USERS)
            .doc(authUser.uid)
            .get()
            .then(documentSnapshot => {
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