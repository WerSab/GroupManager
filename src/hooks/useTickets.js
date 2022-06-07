import React, { useState, useEffect, useCallback } from 'react';
import { getTicketsOrdersList } from '../ticket-examples';


export function useTickets() {
    const [ticketOrdersList, setTicketOrdersList] = useState();
    const [isLoaded, setisLoaded] = useState(false);
    const [error, setError] = useState();

    const requeryTicketOrdersList = useCallback(() => {
        getTicketsOrdersList()
            .then((result) => {
                setTicketOrdersList(result);
                setisLoaded(true)
            })
            .catch((error) => {
                setError(error);
                setisLoaded(true)
            })
    }, [setTicketOrdersList, setisLoaded, setError]);

    useEffect(() => {
        requeryTicketOrdersList();

    }, []);
    return [ticketOrdersList, isLoaded, error, requeryTicketOrdersList];

};