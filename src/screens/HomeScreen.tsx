import React from 'react';
import {Button, Container, Snackbar, SnackbarContent, Stack} from "@mui/material";
import MessagePanel from "../components/messages/MessagePanel";
import useMessages from "../hooks/useMessages";
import MessageCard from "../components/messages/MessageCard";

const HomeScreen: React.FC<{}> = () => {
    const {state, dispatch} = useMessages();
    const {started, snackbarOpen, snackbarMessage, errorMessages, warnMessages, infoMessages} = state;

    return (<>
        <Stack direction="row" justifyContent="center" marginBottom="4em">
            <Button variant="contained" sx={{marginRight: "0.3em"}} size="large"
                    onClick={() => dispatch({type: 'toggle-messages-stream'})}>
                {started ? 'STOP' : 'START'}
            </Button>
            <Button variant="contained" size="large" onClick={() => dispatch({type: 'clear-all-messages'})}>
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
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            key={snackbarMessage ? snackbarMessage.message : undefined}
            open={snackbarOpen}
            autoHideDuration={2000}
            disableWindowBlurListener={true}
            onClose={() => dispatch({type: 'close-snackbar'})}
        >
            <SnackbarContent message={<>{snackbarMessage && <MessageCard message={snackbarMessage}/>}</>}/>
        </Snackbar>
    </>);
}

export default HomeScreen;
