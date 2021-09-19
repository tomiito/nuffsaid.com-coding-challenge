// @ts-ignore
import React, {useEffect, useReducer} from 'react';
import generateMessage, {Message, Priority} from "../Api";
import _ from "lodash";


type Action = { type: 'add-message', message: Message }
    | { type: 'remove-message', message: Message }
    | { type: 'clear-all-messages' }
    | { type: 'toggle-messages-stream' }
    | { type: 'close-snackbar' };
type Dispatch = (action: Action) => void

export interface MessagesState {
    started: boolean;
    snackbarOpen: boolean;
    snackbarMessage: Message | null;
    errorMessages: Message[];
    infoMessages: Message[];
    warnMessages: Message[];
}

export const initialMessagesState: MessagesState = {
    started: true,
    snackbarOpen: false,
    snackbarMessage: null,
    errorMessages: [],
    infoMessages: [],
    warnMessages: [],
}

export const MessagesContext = React.createContext<{ state: MessagesState; dispatch: Dispatch } | undefined>(undefined);
type Props = {
    children: React.ReactNode
}
export function messagesReducer(state: MessagesState, action: Action) {
    switch (action.type) {
        case 'add-message':
            switch (action.message.priority) {
                case Priority.Error:
                    return {...state, errorMessages: [action.message, ...state.errorMessages], snackbarMessage: action.message, snackbarOpen: true}
                case Priority.Warn:
                    return {...state, warnMessages: [action.message, ...state.warnMessages]}
                case Priority.Info:
                    return {...state, infoMessages: [action.message, ...state.infoMessages]}
                default:
                    return {...state}
            }

        case 'remove-message':
            switch (action.message.priority) {
                case Priority.Error:
                    return {
                        ...state,
                        errorMessages: _.remove(state.errorMessages, (n) => n.message !== action.message.message),
                        snackbarOpen: action.message === state.snackbarMessage ? false : state.snackbarOpen
                    }
                case Priority.Warn:
                    return {
                        ...state,
                        warnMessages: _.remove(state.warnMessages, (n) => n.message !== action.message.message)
                    }
                case Priority.Info:
                    return {
                        ...state,
                        infoMessages: _.remove(state.infoMessages, (n) => n.message !== action.message.message)
                    }
                default:
                    return {...state}
            }

        case 'clear-all-messages':
            return {
                ...state,
                errorMessages: [],
                warnMessages: [],
                infoMessages: []
            }
        case 'toggle-messages-stream':
            return {
                ...state,
                started: !state.started
            }
      case 'close-snackbar':
        return {
          ...state,
          snackbarMessage: null,
          snackbarOpen: false
        }

        default:
            throw new Error(`Unhandled action type: ${action}`);
    }
}

export const MessagesProvider = ({children}: Props) => {
    const [state, dispatch] = useReducer(messagesReducer, initialMessagesState);
    const {started} = state;

    useEffect(() => {
        if (started) {
            const cleanUp = generateMessage((message: Message) => {
                dispatch({type: 'add-message', message: message});
            });
            // only clean up if was previously started
            return cleanUp;
        }

    }, [started]);
    //
    // }, [setMessages]); <-- this was not necessary
    // React guarantees that setState function identity is stable and won’t change on re-renders.
    // This is why it’s safe to omit from the useEffect or useCallback dependency list.
    // https://reactjs.org/docs/hooks-reference.html#usestate
    //

    const value = {state, dispatch};

    return (
        <MessagesContext.Provider value={value}>
            {children}
        </MessagesContext.Provider>
    );
};

const useMessages = () => {
    const context = React.useContext(MessagesContext);
    if (!context) {
        throw new Error('useMessages must be used within a MessagesProvider');
    }
    return context;
};
export default useMessages;
