import React from 'react';
import {initialMessagesState, messagesReducer, MessagesState} from "../useMessages";
import {Priority} from "../../Api";

test('add a info message should add it to infoMessages', () => {
  const state = messagesReducer(initialMessagesState, {type: 'add-message', message: {message: 'info-text', priority: Priority.Info}})
  expect(state.infoMessages.length).toBe(1);
  expect(state.infoMessages[0].message).toBe("info-text");
  //
  expect(state.snackbarOpen).toBeFalsy();
});

test('add a warn message should add it to warnMessages', () => {
  const state = messagesReducer(initialMessagesState, {type: 'add-message', message: {message: 'warn-text', priority: Priority.Warn}})
  expect(state.warnMessages.length).toBe(1);
  expect(state.warnMessages[0].message).toBe("warn-text");
  //
  expect(state.snackbarOpen).toBeFalsy();
});

test('add a error message should add it to warnMessages and display it on snackbar', () => {
  const state = messagesReducer(initialMessagesState, {type: 'add-message', message: {message: 'error-text', priority: Priority.Error}})
  expect(state.errorMessages.length).toBe(1);
  expect(state.errorMessages[0].message).toBe("error-text");
  //
  expect(state.snackbarOpen).toBeTruthy();
  expect(state.snackbarMessage?.message).toBe("error-text");
});

test('clear messages action should empty all lists', () => {
  const loadedState = {
    errorMessages: [{message: "r1", priority: Priority.Error}],
    infoMessages: [{message: "i1", priority: Priority.Info}],
    warnMessages: [{message: "w1", priority: Priority.Warn}]
  } as MessagesState;
  const state = messagesReducer(loadedState, {type: 'clear-all-messages'})
  expect(state.errorMessages.length).toBe(0);
  expect(state.warnMessages.length).toBe(0);
  expect(state.infoMessages.length).toBe(0);
});

test('remove a message action should remove it from specified list', () => {
  const loadedState = {
    errorMessages: [{message: "r1", priority: Priority.Error}],
    infoMessages: [{message: "i1", priority: Priority.Info}],
    warnMessages: [{message: "w1", priority: Priority.Warn}]
  } as MessagesState;
  const state = messagesReducer(loadedState, {type: 'remove-message', message: {message: "i1", priority: Priority.Info}})
  expect(state.errorMessages.length).toBe(1);
  expect(state.warnMessages.length).toBe(1);
  expect(state.infoMessages.length).toBe(0);
});

test('toggle stream of messages when stopped should start it', () => {
  const loadedState = {
   started: false,
  } as MessagesState;
  const state = messagesReducer(loadedState, {type: 'toggle-messages-stream'})
  expect(state.started).toBeTruthy();
});

test('toggle stream of messages when started should stop it', () => {
  const loadedState = {
    started: true,
  } as MessagesState;
  const state = messagesReducer(loadedState, {type: 'toggle-messages-stream'})
  expect(state.started).toBeFalsy();
});

test('close snackbar should clear current snackbar message', () => {
  const loadedState = {
    snackbarOpen: true,
    snackbarMessage: {message: "i1", priority: Priority.Info}
  } as MessagesState;
  const state = messagesReducer(loadedState, {type: 'close-snackbar'})
  expect(state.snackbarOpen).toBeFalsy();
  expect(state.snackbarMessage).toBeNull();
});
