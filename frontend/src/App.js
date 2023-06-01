import React, { useContext, useState, useEffect } from "react";
import Routes from "./routes";
import "react-toastify/dist/ReactToastify.css";

import { createTheme, ThemeProvider } from "@material-ui/core/styles";
import { ptBR } from "@material-ui/core/locale";
import EventEmitter from "eventemitter3";

import {
  CssBaseline,
  Switch,
  FormGroup,
  FormControlLabel,
  makeStyles
} from "@material-ui/core";
import lightBackground from "../src/assets/wa-background-light.png";
import darkBackground from "../src/assets/wa-background-dark.jpg";

const useStyles = makeStyles(() => ({
  switch: {
    margin: "2px",
    position: "absolute",
    right: "0",
  },
  visible: {
    display: "none",
  },
}));

export const mainEvents = new EventEmitter();

const App = () => {
  const [locale, setLocale] = useState();
  const [checked, setChecked] = React.useState(false);
  const classes = useStyles();

  const lightTheme = createTheme(
    {
      palette: {
        primary: { main: '#111111' },
        secondary: { main: "#757575" },
        error: { main: '#ff0000' }, // cor dos icones
      },
      backgroundImage: `url(${lightBackground})`,
    },
    locale
  );

  const darkTheme = createTheme(
    {
      overrides: {
        MuiCssBaseline: {
          '@global': {
            body: {
              backgroundColor: "#1d2230",
            }
          }
        }
      },
      palette: {
        primary: { main: "#7d9bfa" },
        divider: "#464a5c",
        secondary: { main: "#eee" },
        error: { main: '#ff0000' }, // cor dos icones
        background: {
          default: "#1d2230",
          paper: "#2c3145",
        },
        text: {
          primary: "#eee",
          secondary: "#fff",
        },
      },
      backgroundImage: `url(${darkBackground})`,
    },
    locale
  );

  const cacheTheme = localStorage.getItem("layout-theme") || "light";

  const [theme, setTheme] = useState(cacheTheme);

  const themeToggle = () => {
    const updatedTheme = theme === "light" ? "dark" : "light";
    setTheme(updatedTheme);
    localStorage.setItem("layout-theme", updatedTheme);
  };

  const handleChange = () => {
    themeToggle();
  };

  mainEvents.on("toggle-theme", handleChange);

  useEffect(() => {
    const i18nlocale = localStorage.getItem("i18nextLng");
    const browserLocale = i18nlocale.substring(0, 2) + i18nlocale.substring(3, 5);

    if (browserLocale === "ptBR") {
      setLocale(ptBR);
    }
  }, []);

  return (
    <ThemeProvider theme={theme === "light" ? lightTheme : darkTheme}>
      <Routes />
      <CssBaseline />
    </ThemeProvider>
  );
};

export default App;