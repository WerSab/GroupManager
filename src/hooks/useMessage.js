
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { getMessages } from '../fireBase/messages-Helper';


export function useMessages() {
    const [messagesList, setMessagesList] = useState();
    const [isLoaded, setisLoaded] = useState(false);
    const [error, setError] = useState();

    const isMounted = useRef();
    useEffect(() => {
        isMounted.current = true;
        return () => {
            isMounted.current = false;
        };
    }, []);

    const worklet = () => {
        'worklet';
        // jakkis kod
        // setState();
    }

    const requeryMessages = useCallback(() => {
        getMessages()
        .then((result) => {
            setMessagesList(result);
            setisLoaded(true)
        })
        .catch((error) => {
            setError(error);
            setisLoaded(true)
        })
    }, [setMessagesList, setisLoaded, setError]);

    useEffect(() => {
          requeryMessages();
    }, []);
   
    return [messagesList, isLoaded, error, requeryMessages];

};

