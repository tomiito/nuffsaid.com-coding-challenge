import React from 'react';
import {Priority} from "../../../Api";
import {render, screen} from "@testing-library/react";
import {MessagesProvider} from "../../../hooks/useMessages";
import MessagePanel from "../MessagePanel";

test('render a list of message cards', () => {
  const messages = [
    {message: "I1 Text", priority: Priority.Info},
    {message: "I2 Text", priority: Priority.Info},
    {message: "I3 Text", priority: Priority.Info},
  ];
  const comp = render(<MessagesProvider><MessagePanel title="Info title" messages={messages} /></MessagesProvider>);
  expect(comp).toBeTruthy();
  //
  expect(screen.getByText('Info title')).toBeInTheDocument();
  expect(screen.getByText('Count: 3')).toBeInTheDocument();
  //
  messages.forEach(m => {
    expect(screen.getByText(m.message)).toBeInTheDocument();
  });
});
