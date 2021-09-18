import React from 'react';
import {Priority} from "../../../Api";
import {render, screen} from "@testing-library/react";
import MessageCard from "../MessageCard";
import {MessagesProvider} from "../../../hooks/useMessages";

test('render an info message card', () => {
  const comp = render(<MessagesProvider><MessageCard message={{message: "Message Text", priority: Priority.Info}} /></MessagesProvider>);
  expect(comp).toBeTruthy();
  //
  expect(screen.getByText('Message Text')).toBeInTheDocument();
  expect(screen.getByText('Clear')).toBeInTheDocument();

  expect(screen.getByTestId('message_Message Text')).toHaveAttribute("color",`priority_${Priority.Info}`);
});

test('render an warn message card', () => {
  const comp = render(<MessagesProvider><MessageCard message={{message: "Warn Text", priority: Priority.Warn}} /></MessagesProvider>);
  expect(comp).toBeTruthy();
  //
  expect(screen.getByText('Warn Text')).toBeInTheDocument();
  expect(screen.getByText('Clear')).toBeInTheDocument();

  expect(screen.getByTestId('message_Warn Text')).toHaveAttribute("color",`priority_${Priority.Warn}`);
});

test('render an error message card', () => {
  const comp = render(<MessagesProvider><MessageCard message={{message: "Error Text", priority: Priority.Error}} /></MessagesProvider>);
  expect(comp).toBeTruthy();
  //
  expect(screen.getByText('Error Text')).toBeInTheDocument();
  expect(screen.getByText('Clear')).toBeInTheDocument();

  expect(screen.getByTestId('message_Error Text')).toHaveAttribute("color",`priority_${Priority.Error}`);
});
