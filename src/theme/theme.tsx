import {createTheme} from "@mui/material";

declare module '@mui/material/Paper' {
    interface PaperPropsVariantOverrides {
        message: true;
        color: string;
    }
}

const theme = createTheme({
    typography: {
        fontFamily: "Times",
        h1: {
            fontSize: "2.5em",
            fontWeight: 600
        },
        h2: {
            fontSize: "2.4em",
            fontWeight: 700
        },
        h3: {
            fontSize: "1.5em",
            fontWeight: 500
        },
        subtitle1: {
            fontSize: "1.3em",
            fontWeight: 600
        }
    },
    palette: {
        primary: { main: '#88FCA3' },
        info: { main: '#88FCA3' },
        warning: { main: '#FCE788' },
        error: { main: '#F56236' },
    },
    components: {
        MuiPaper: {
          variants: [
              {
                  props: {variant: 'message'},
                  style: {
                      maxWidth: '370px',
                      width: '100%'
                  },
              },
              {
                  props: {variant: 'message', color: 'priority_2'},
                  style: {
                      backgroundColor: '#88FCA3',
                  },
              },
              {
                  props: {variant: 'message', color: 'priority_1'},
                  style: {
                      backgroundColor: '#FCE788',
                  },
              },
              {
                  props: {variant: 'message', color: 'priority_0'},
                  style: {
                      backgroundColor: '#F56236',
                  },
              },
          ]
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    fontFamily: "Verdana",
                    fontSize: "1.2em",
                    textTransform: "uppercase",
                    fontWeight: 600
                }
            }
        },
        MuiSnackbarContent: {
            styleOverrides: {
                root: {
                    width: '100%',
                    padding: 0,
                    '& .MuiSnackbarContent-message': {
                        width: '100%',
                        padding: 0 ,
                    }
                },
            }
        }
    }
});

export default theme;
