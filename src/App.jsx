import { Container } from "@mui/material";
import { Observer } from "mobx-react";
import React from "react";
import Admin from "./pages/Admin";
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
              <>
                {userStore.isLoggedIn ? (
                  !userStore.isAdmin &&
                  <PostLogin />
                ) : (
                  <PreLogin />
                )}
                {userStore.isLoggedIn && userStore.isAdmin && <Admin />}
              </>
            </Container>
          </>
        </ThemeConfig>
      )}
    </Observer>
  );
};

export default App;
