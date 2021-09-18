import React from 'react';
import {Button, Container, Stack} from "@mui/material";
import MessagePanel from "../components/messages/MessagePanel";
import useMessages from "../hooks/useMessages";

const HomeScreen: React.FC<{}> = () => {
    const {started, errorMessages, warnMessages, infoMessages, clearAllMessages, toggleMessagesStream} = useMessages();
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
    </>);
}

export default HomeScreen;
