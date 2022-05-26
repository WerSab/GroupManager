
import React from 'react';
import { getFirestoreTimestampFromDate } from '../fireBase/firestore-Helper';

const THREE_DAYS_MILLIS = 259_200_000;

const getLatestCleanupDate = () => {
    return new Promise((resolve) => {
        AsyncStorage.getItem('ticketLatestCleanUpDate')
            .then(latestCleanupDate => {
                resolve(latestCleanupDate);
            })
            .catch((error) => {
                console.log('getLatestCleanupDate', error);
                resolve(null);
            })
    });

}

//pobieramy listę biletów z bazy (gettickets), filtruję (where) 1. czy bilety opłacone, 2. Czy róznica dat jest wieksza nić trzy dni
//sparsować timeStamp na datę java script - sprawdzić w dokumentacji jak się to robi 
//funkcja deleteOldtickets ma byc opakowana w promisa
//Zapisac nowa datę do storage

const deleteOldTickets = () =>{

}

export const deleteOutdatedTickets = () => {
    return new Promise((resolve, reject) => {
        getLatestCleanupDate()
            .then(result => {
                const now = new Date().getTime();
                if (!result) {
                    return null;
                }
                const deltaTime = now - result;
                return deltaTime;

            })
            .then(deltaTime => {
                if (deltaTime && deltaTime >= THREE_DAYS_MILLIS) {
                    resolve(deleteOldTickets());
                }
            }
            )
            .catch(reject);
    })
}


