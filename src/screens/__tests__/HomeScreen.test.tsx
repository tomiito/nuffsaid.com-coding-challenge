import React, {useReducer} from 'react';
import {cleanup, render, screen, within} from "@testing-library/react";
import {initialMessagesState, MessagesContext, MessagesProvider, messagesReducer} from "../../hooks/useMessages";
import HomeScreen from "../HomeScreen";
import userEvent from "@testing-library/user-event";
import {Message, Priority} from "../../Api";
import {Button} from "@mui/material";
import faker from "faker";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const TestMessagesProvider = ({children}: any) => {
  const [state, dispatch] = useReducer(messagesReducer, initialMessagesState);
  const generateMessage = (mockedMessage: Message) => {
    dispatch({type: 'add-message', message: mockedMessage})
  }
  const value = {state, dispatch, generateMessage};

  return (
      <MessagesContext.Provider value={value}>
        {children}
        <Button data-testid={"add-error-message"} onClick={() => generateMessage({message: "Message: " + faker.lorem.sentence(), priority: Priority.Error})}>Add Error Message</Button>
        <Button data-testid={"add-warn-message"} onClick={() => generateMessage({message: "Message: " + faker.lorem.sentence(), priority: Priority.Warn})}>Add Warn Message</Button>
        <Button data-testid={"add-info-message"} onClick={() => generateMessage({message: "Message: " + faker.lorem.sentence(), priority: Priority.Info})}>Add Info Message</Button>
      </MessagesContext.Provider>
  );
}

jest.useFakeTimers();

test('render home screen should have the message stream started by default', () => {

  const comp = render(<MessagesProvider><HomeScreen /></MessagesProvider>);
  expect(comp).toBeTruthy();
  //
  expect(screen.getByText('STOP')).toBeInTheDocument();
  expect(screen.getByText('CLEAR')).toBeInTheDocument();

  expect(screen.getByText('Error Type 1')).toBeInTheDocument();
  //
  expect(screen.getByText('Warning Type 2')).toBeInTheDocument();
  //
  expect(screen.getByText('Info Type 3')).toBeInTheDocument();
});

test('stops streaming messages after stop button is clicked', () => {

  const comp = render(<MessagesProvider><HomeScreen /></MessagesProvider>);
  expect(comp).toBeTruthy();
  //
  expect(screen.getByText('STOP')).toBeInTheDocument();
  userEvent.click(screen.getByText("STOP"));
  expect(screen.getByText('CLEAR')).toBeInTheDocument();
  //
  expect(screen.getByText('START')).toBeInTheDocument();
});

test('shows one message after run once', () => {

  const comp = render(<MessagesProvider><HomeScreen /></MessagesProvider>);
  expect(comp).toBeTruthy();
  //
  const errors = screen.getByTestId('Error Type 1_messages').children.length;
  expect(screen.getByTestId('Error Type 1_count')).toHaveTextContent(`Count: ${errors}`);
  //
  const warns = screen.getByTestId('Warning Type 2_messages').children.length;
  expect(screen.getByTestId('Warning Type 2_count')).toHaveTextContent(`Count: ${warns}`);
  //
  const infos = screen.getByTestId('Info Type 3_messages').children.length;
  expect(screen.getByTestId('Info Type 3_count')).toHaveTextContent(`Count: ${infos}`);

  expect(errors + warns + infos).toBe(1);
});

test('clear all messages should set the count in 0 for all lists', () => {
  const comp = render(<MessagesProvider><HomeScreen /></MessagesProvider>);
  expect(comp).toBeTruthy();
  userEvent.click(screen.getByText("CLEAR"));
  //
  const errors = screen.getByTestId('Error Type 1_messages').children.length;
  expect(screen.getByTestId('Error Type 1_count')).toHaveTextContent(`Count: 0`);
  //
  const warns = screen.getByTestId('Warning Type 2_messages').children.length;
  expect(screen.getByTestId('Warning Type 2_count')).toHaveTextContent(`Count: 0`);
  //
  const infos = screen.getByTestId('Info Type 3_messages').children.length;
  expect(screen.getByTestId('Info Type 3_count')).toHaveTextContent(`Count: 0`);

  expect(errors + warns + infos).toBe(0);
});

test('adding messages should render them in the correct panels ', () => {
  // Using a dumb message provider to avoid the randomness of the messages
  const comp = render(<TestMessagesProvider><HomeScreen /></TestMessagesProvider>);
  expect(comp).toBeTruthy();
  //
  expect(screen.getByTestId('Error Type 1_count')).toHaveTextContent(`Count: 0`);
  expect(screen.getByTestId('Warning Type 2_count')).toHaveTextContent(`Count: 0`);
  expect(screen.getByTestId('Info Type 3_count')).toHaveTextContent(`Count: 0`);
  //
  // Simulate addition by click on dumb buttons
  // Adding 3 error events
  userEvent.click(screen.getByTestId("add-error-message"));
  userEvent.click(screen.getByTestId("add-error-message"));
  userEvent.click(screen.getByTestId("add-error-message"));
  // Adding 2 warns
  userEvent.click(screen.getByTestId("add-warn-message"));
  userEvent.click(screen.getByTestId("add-warn-message"));
  //
  // Adding 1 infos
  userEvent.click(screen.getByTestId("add-info-message"));
  //
  expect(screen.getByTestId('Error Type 1_count')).toHaveTextContent(`Count: 3`);
  const errors = screen.getByTestId('Error Type 1_messages').children.length;
  expect(errors).toBe(3);

  expect(screen.getByTestId('Warning Type 2_count')).toHaveTextContent(`Count: 2`);
  const warns = screen.getByTestId('Warning Type 2_messages').children.length;
  expect(warns).toBe(2);

  expect(screen.getByTestId('Info Type 3_count')).toHaveTextContent(`Count: 1`);
  const infos = screen.getByTestId('Info Type 3_messages').children.length;
  expect(infos).toBe(1);
});

test('add an error messages should render a snackbar ', () => {
  // Using a dumb message provider to avoid the randomness of the messages
  const comp = render(<TestMessagesProvider><HomeScreen /></TestMessagesProvider>);
  expect(comp).toBeTruthy();
  //
  expect(screen.getByTestId('Error Type 1_count')).toHaveTextContent(`Count: 0`);
  //
  // Simulate addition by click on dumb buttons
  // Adding 3 error events
  userEvent.click(screen.getByTestId("add-error-message"));
  //
  const snackbar = screen.getByTestId('message-snackbar');
  expect(snackbar).toBeInTheDocument();
  expect( within(snackbar).getByText("Clear")).toBeInTheDocument();
});
