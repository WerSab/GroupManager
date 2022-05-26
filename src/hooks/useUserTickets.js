//const [userTickets, loading, error] = useUserTickets(userID);//stwqorzyć nowego hooka i tam wrzucić metodę
import React, { useState, useEffect } from 'react';
import { getUserTickets } from '../ticket-examples';
export function useUserTickets(){
    const [userTickets, setUserTickets] = useState();
    const [isLoaded, setisLoaded] = useState(false);
    const [error, setError] = useState();
    
    
    const requeryUsertickets = (userID) =>{
        getUserTickets(userID)
        .then((result)=> {

        })
    }
}