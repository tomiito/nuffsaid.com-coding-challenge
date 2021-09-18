// @ts-ignore
import React, {useEffect, useState} from 'react';
import generateMessage, {Message, Priority} from "../Api";
import _ from "lodash";

export interface State {
  started: boolean;
  errorMessages: Message[];
  infoMessages: Message[];
  warnMessages: Message[];
  toggleMessagesStream: () => void;
  clearAllMessages: () => void;
  removeMessage: (message: Message) => void;
}


export const MessagesContext = React.createContext<State | undefined>(undefined);
type Props = {
  children: any
}

export const MessagesProvider = ({ children }: Props) => {
  const [started, setStarted] = useState<boolean>(true);
  const [errorMessages, setErrorMessages] = useState<Message[]>([]);
  const [infoMessages, setInfoMessages] = useState<Message[]>([]);
  const [warnMessages, setWarnMessages] = useState<Message[]>([]);

  useEffect(() => {
    // TODO check this conditional effect
    if (started) {
      const cleanUp = generateMessage((message: Message) => {
        switch(message.priority){
          case Priority.Error:
            setErrorMessages(oldMessages => [message, ...oldMessages]);
            break;
          case Priority.Warn:
            setWarnMessages(oldMessages => [message, ...oldMessages]);
            break;
          case Priority.Info:
            setInfoMessages(oldMessages => [message,...oldMessages]);
            break;
          default:
            // Ignore
        }
      });
      return cleanUp;
    }
  }, [started]);
  // }, [setMessages]);
  // React guarantees that setState function identity is stable and won’t change on re-renders.
  // This is why it’s safe to omit from the useEffect or useCallback dependency list.
  // https://reactjs.org/docs/hooks-reference.html#usestate
  //

  const removeMessage = async(message: Message) => {
    switch(message.priority) {
      case Priority.Error:
        setErrorMessages(oldMessages => _.remove(oldMessages, (n) => n.message !== message.message));
        break;
      case Priority.Warn:
        setWarnMessages(oldMessages => _.remove(oldMessages, (n) => n.message !== message.message));
        break;
      case Priority.Info:
        setInfoMessages(oldMessages => _.remove(oldMessages, (n) => n.message !== message.message));
        break;
      default:
        // Ignore
    }
  }

  const toggleMessagesStream = async () => {
    setStarted(!started);
  }

  const clearAllMessages = async () => {
    setErrorMessages([]);
    setInfoMessages([]);
    setWarnMessages([]);
  }
  const value = {
      errorMessages,
      warnMessages,
      infoMessages,
      started,
      //
      clearAllMessages,
      toggleMessagesStream,
      removeMessage,
    };

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
