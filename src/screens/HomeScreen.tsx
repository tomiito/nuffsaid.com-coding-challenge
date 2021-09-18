import React, {useEffect, useState} from 'react';
import {Button, Container, Snackbar, SnackbarContent, Stack} from "@mui/material";
import MessagePanel from "../components/messages/MessagePanel";
import useMessages from "../hooks/useMessages";
import {Message} from "../Api";
import MessageCard from "../components/messages/MessageCard";

const HomeScreen: React.FC<{}> = () => {
    const {started, errorMessages, warnMessages, infoMessages, clearAllMessages, toggleMessagesStream} = useMessages();
    const [snackbarOpen, setSnackbarOpen] = useState(false);

    const [snackbarMessage, setSnackbarMessage] = useState<Message | null>(null);

    useEffect(() => {
        if (errorMessages.length > 0) {
            setSnackbarOpen(true);
            setSnackbarMessage(errorMessages[0]);
        }
    },[errorMessages]);

    return (<>
        <Stack direction="row" justifyContent="center" marginBottom="4em">
            <Button variant="contained" sx={{marginRight: "0.3em"}} size="large" onClick={toggleMessagesStream}>
                { started ? 'STOP' : 'START' }
            </Button>
            <Button variant="contained" size="large" onClick={clearAllMessages}>
                CLEAR
            </Button>
        </Stack>
        <Container>
            <Stack direction="row" justifyContent="space-between" spacing={2}>
                <MessagePanel title={"Error Type 1"} messages={errorMessages}/>
                <MessagePanel title={"Warning Type 2"} messages={warnMessages}/>
                <MessagePanel title={"Info Type 3"} messages={infoMessages}/>
            </Stack>
        </Container>
        <Snackbar
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            key={snackbarMessage ? snackbarMessage.message : undefined}
            open={snackbarOpen}
            autoHideDuration={2000}
            TransitionProps={{ onExited: () => setSnackbarMessage(null) }}
            onClose={() => setSnackbarOpen(false)}

        >
            <SnackbarContent message={<>{snackbarMessage && <MessageCard message={snackbarMessage} />}</>} />
        </Snackbar>
    </>);
}

export default HomeScreen;
