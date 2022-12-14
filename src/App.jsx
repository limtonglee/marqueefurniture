import { Container } from "@mui/material";
import { Observer } from "mobx-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import Admin from "./pages/Admin";
import PostLogin from "./PostLogin";
import PreLogin from "./PreLogin";
import { useStores } from "./stores/RootStore";
// theme
import ThemeConfig from "./theme";
import GlobalStyles from "./theme/globalStyles";
import Box from "@mui/material/Box";
import "/node_modules/react-image-gallery/styles/css/image-gallery.css";

const App = () => {
  //const previousLocation = useRef(location);

  const { switchStore, userStore } = useStores();

  let navigate = useNavigate();

  const [checked, setChecked] = React.useState(switchStore.checked);

  const handleChange = (event) => {
    setChecked(event.target.checked);
    switchStore.setCheck(event.target.checked);
    if (event.target.checked === false) {
      navigate("/marketplace");
    }
    if (event.target.checked === true) {
      navigate("/ideas");
    }
  };

  return (
    <Observer>
      {() => (
        <ThemeConfig>
          <>
            <GlobalStyles />
            {/* <Container maxWidth="xxl" sx={{position:"absolute"}}> */}
            <Box sx={{position:"absolute", left: 0, right: 0, ml: "auto", mr:"auto"}}>
              <>
                {userStore.isLoggedIn ? (
                  !userStore.isAdmin && (
                    <PostLogin
                      checked={checked}
                      setChecked={setChecked}
                      handleChange={handleChange}
                    />
                  )
                ) : (
                  <PreLogin
                    checked={checked}
                    setChecked={setChecked}
                    handleChange={handleChange}
                  />
                )}
                {userStore.isLoggedIn && userStore.isAdmin && (
                  <Admin
                    checked={checked}
                    setChecked={setChecked}
                    handleChange={handleChange}
                  />
                )}
              </>
              </Box>
            {/* </Container> */}
          </>
        </ThemeConfig>
      )}
    </Observer>
  );
};

export default App;
