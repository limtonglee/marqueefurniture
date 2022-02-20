import { Container } from "@mui/material";
import { Observer } from "mobx-react";
import React from "react";
import PostLogin from "./PostLogin";
import PreLogin from "./PreLogin";
import { useStores } from "./stores/RootStore";
// theme
import ThemeConfig from "./theme";

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

  return (
    <Observer>
      {() => (
        <ThemeConfig>
          <>
            <Container maxWidth="xl">
              {userStore.isLoggedIn ? <PostLogin /> : <PreLogin />}
            </Container>
          </>
        </ThemeConfig>
      )}
    </Observer>
  );
};

export default App;
