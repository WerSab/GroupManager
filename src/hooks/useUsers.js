
import React, { useState, useEffect } from 'react';
import { getUsers } from '../users-examples';

export function useUsers() {
    const [usersList, setUsersList] = useState();
    const [isLoaded, setisLoaded] = useState(false);
    const [error, setError] = useState();

    useEffect(() => {

        getUsers()
        .then((result) => {
            setUsersList(result);
        })
        .catch((error) => {
            setError(error);
        })
        .finally(() => {
            setisLoaded (true);
        });
    },[]);
    return [usersList, isLoaded, error];

};
