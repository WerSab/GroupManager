import React, {useMemo} from 'react';
import { createContext } from 'react';
import { useMessages } from '../hooks/useMessage';

export const MessagesContext = createContext({
        messagesList: undefined, 
        isLoaded: false, 
        error: null, 
        actions: {
            requeryMessages: () => undefined,
        }
    });

const MessagesContextProvider = (props) => {
    const [messagesList, isLoaded, error, requeryMessages] = useMessages();
    const providerValue = useMemo(() => {
        return {
            messagesList,
            isLoaded,
            error,
            actions: {
                requeryMessages: requeryMessages,
            }
        }
        
    }, [messagesList, isLoaded, error, requeryMessages])
    return (

        <MessagesContext.Provider value={providerValue}>
            {props.children}
        </MessagesContext.Provider>
    )
}
export default MessagesContextProvider;