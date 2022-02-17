import logo from "./logo.svg";
import PreLogin from "./PreLogin";
import PostLogin from "./PostLogin";
import rootStore from "./stores/RootStore";
import React, { useEffect } from "react";
import { useRef } from "react";
import { PropTypes } from "prop-types";
import Button from "@mui/material/Button";
import { Container } from "@mui/material";
import { useStores } from "./stores/RootStore";
import { useObserver } from "mobx-react";

// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";

const App = () => {
  //const previousLocation = useRef(location);

  const { userStore } = useStores();

  //userStore.isLoggedIn = true;
  const setLogout = (e) => {
    userStore.setIsLoggedOut();
  };

  const setLogin = (e) => {
    userStore.setIsLoggedIn();
  };

  return useObserver(() => (
    <ThemeConfig>
      <>
        <Container maxWidth="xl">
          <Button
            onClick={() => {
              setLogin();
            }}
          >
            Login
          </Button>
          <Button
            onClick={() => {
              setLogout();
            }}
          >
            Logout
          </Button>
          {userStore.isLoggedIn ? <PostLogin /> : <PreLogin />}
        </Container>
      </>
    </ThemeConfig>
  ));
};

export default App;
