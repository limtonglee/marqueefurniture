import logo from "./logo.svg";
import PreLogin from "./PreLogin";
import rootStore from "./stores/RootStore";
import React from "react";
import { useRef } from "react";
import { PropTypes } from "prop-types";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";

const App = () => {
  //const previousLocation = useRef(location);

  return (
    <>
      <Container maxWidth="lg">
        <PreLogin> </PreLogin>
      </Container>
    </>
  );
};

export default App;
