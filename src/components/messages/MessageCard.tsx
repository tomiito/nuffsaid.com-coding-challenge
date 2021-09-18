import React from 'react';
import {Button, Paper, Stack, Typography} from "@mui/material";
import {Message} from "../../Api";
import useMessages from "../../hooks/useMessages";

type Props = {
    message: Message;
}

const MessageCard: React.FC<Props> = ({message}: Props) => {
    const {dispatch} = useMessages();
    return (
        <>
            <Paper variant="message" color={`priority_${message.priority}`} data-testid={`message_${message.message}`}>
                <Stack padding={2}>
                    <Typography variant="subtitle1">{message.message}</Typography>
                    <Stack direction="row" justifyContent="flex-end">
                        <Button size="large" sx={{textTransform: 'none', color: 'inherit', fontWeight:"500"}}
                                onClick={() => dispatch({type:'remove-message', message: message})}>
                            Clear
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </>
    );
}

export default MessageCard;
