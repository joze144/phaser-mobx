import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme({
  palette: {
    background: {
      default: "#ffffff"
    },
    primary: {
      light: "#ffffff",
      main: "#cfd8dc",
      dark: "#9ea7aa",
      contrastText: "#000000",
    },
    secondary: {
      light: "#fffff6",
      main: "#f0f4c3",
      dark: "#bdc192",
      contrastText: "#ffffff",
    },
  },
  typography: {
    button: {
      textTransform: 'none'
    }
  }
});

export default theme;
