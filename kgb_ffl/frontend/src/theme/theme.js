import createMuiTheme from "@material-ui/core/styles/createMuiTheme";

const theme = createMuiTheme({
  typography: {
    h2: {
      fontSize: "2rem"
    }
  },
  palette: {
    primary: {
      main: "#333333"
    }
  },
  overrides: {
    MuiButton: {
      root: {},
      text: {}
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  }
});

export default theme;
