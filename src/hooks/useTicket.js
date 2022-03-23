import React, { useState, useEffect } from 'react';
import { getTicket } from '../ticket-examples';

export function useTicket() {
    const [ticketList, setTicketList] = useState();
    const [error, setError] = useState();

    useEffect(() => {
        getTicket()
        .then((result) => {
            setTicketList(result);
        })
        .catch((error) => {
            setError(error);
        })
        
    },[]);
    return [ticketList, error];

};