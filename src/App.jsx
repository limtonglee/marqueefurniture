import logo from "./logo.svg";
import PreLogin from "./PreLogin";
import rootStore from "./stores/RootStore";
import React from "react";
import { useRef } from "react";
import { PropTypes } from "prop-types";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';

const App = () => {
  //const previousLocation = useRef(location);

  return (
    <ThemeConfig>
    <>
      <Container maxWidth="xl">
        <PreLogin/>
      </Container>
    </>
    </ThemeConfig>
  );
};

export default App;
