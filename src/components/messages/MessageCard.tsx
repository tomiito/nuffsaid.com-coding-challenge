import React from 'react';
import {Button, Paper, Stack, Typography, useTheme} from "@mui/material";
import {Message, Priority} from "../../Api";
import useMessages from "../../hooks/useMessages";

type Props = {
    message: Message;
}

const MessageCard: React.FC<Props> = ({message}: Props) => {
    const theme = useTheme();
    const {removeMessage} = useMessages();
    let backgroundColor = theme.palette.info.main;
    switch (message.priority){
        case Priority.Error:
            backgroundColor= theme.palette.error.main;
            break;
        case Priority.Warn:
            backgroundColor= theme.palette.warning.main;
            break;
        case Priority.Info:
            backgroundColor= theme.palette.info.main;
            break;
        default:
            break;
    }

    return (
        <>
            <Paper sx={{backgroundColor: backgroundColor, marginBottom: 2}}>
                <Stack padding={2}>
                    <Typography variant="subtitle1">{message.message}</Typography>
                    <Stack direction="row" justifyContent="flex-end">
                        <Button size="large" sx={{textTransform: 'none', color: 'inherit', fontWeight:"500"}}
                                onClick={() => removeMessage(message)}>
                            Clear
                        </Button>
                    </Stack>
                </Stack>
            </Paper>
        </>
    );
}

export default MessageCard;