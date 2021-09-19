import React from 'react';
import {Stack, Typography} from "@mui/material";
import {Message} from "../../Api";
import MessageCard from "./MessageCard";

type Props = {
    title: string;
    messages: Message[];
}

const MessagePanel: React.FC<Props> = ({title, messages}) => {
    return (
        <>
            <Stack flexGrow={1} flexBasis="33%">
                <Typography variant="h2" marginBottom={0}>{title}</Typography>
                <Typography variant="h3" marginBottom={4} data-testid={`${title}_count`}>Count: {messages.length}</Typography>
                <Stack width="100%" spacing={2} data-testid={`${title}_messages`}>
                    {messages.map(m => (
                        <MessageCard key={m.message} message={m} />
                    ))}
                </Stack>
            </Stack>
        </>
    );
}

export default MessagePanel;
