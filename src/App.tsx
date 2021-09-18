import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import {Box, ThemeProvider, Typography} from "@mui/material";
import theme from "./theme/theme";
import HomeScreen from "./screens/HomeScreen";
import {MessagesProvider} from "./hooks/useMessages";

const App: React.FC<{}> = () => {

    return (
        <>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <MessagesProvider>
                    <Box sx={{
                        marginTop: "1em",
                        marginLeft: "1em",
                    }}>
                        <Typography variant="h1" sx={{
                            width: "100%",
                            borderBottom: "2px solid gray",
                            paddingBottom: "0.3em",
                            marginBottom: "0.3em"
                        }}>nuffsaid.com Coding Challenge</Typography>
                        <HomeScreen/>
                    </Box>
                </MessagesProvider>
            </ThemeProvider>
        </>
    );
}

export default App;
