import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";

import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";

import { styled } from "@mui/system";
import TabsUnstyled from "@mui/base/TabsUnstyled";
import TabsListUnstyled from "@mui/base/TabsListUnstyled";
import TabPanelUnstyled from "@mui/base/TabPanelUnstyled";
import { buttonUnstyledClasses } from "@mui/base/ButtonUnstyled";
import TabUnstyled, { tabUnstyledClasses } from "@mui/base/TabUnstyled";

import DesignItemCard from "./DesignItemCard";
import LogItem from "./LogItem";
import DesignRequirements from "./DesignRequirements";

const primary = {
  50: "#f0fcf9",
  100: "#D5EAE4",
  200: "#649FA9",
  300: "#2E6B75",
  400: "#4D8993",
  500: "#324B4F",
};

const Tabb = styled(TabUnstyled)`
  font-family: IBM Plex Sans, sans-serif;
  color: grey;
  cursor: pointer;
  font-size: 0.875rem;
  font-weight: bold;
  background-color: transparent;
  width: 100%;
  padding: 12px 16px;
  margin: 6px 6px;
  border: none;
  border-radius: 5px;
  display: flex;
  justify-content: center;

  &:hover {
    background-color: ${primary[50]};
    color: ${primary[300]};
  }

  &:focus {
    border-radius: 3px;
    outline-offset: 2px;
  }

  &.${tabUnstyledClasses.selected} {
    background-color: ${primary[50]};
    color: ${primary[300]};
  }

  &.${buttonUnstyledClasses.disabled} {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const TabPanel = styled(TabPanelUnstyled)`
  width: 100%;
  font-family: IBM Plex Sans, sans-serif;
  font-size: 0.875rem;
`;

const TabsList = styled(TabsListUnstyled)`
  min-width: 320px;
  background-color: transparent;
  border-radius: 8px;
  margin-bottom: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  align-content: space-between;
`;

const DesignOrderProgress = () => {
  let navigate = useNavigate();

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={1}>
            <IconButton
              onClick={() => navigate(-1)}
              sx={{ position: "fixed", backgroundColor: "white" }}
              size="small"
            >
              <ArrowBackIosNewIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12} md={11}>
            <Box sx={{ pt: 3, pb: 18 }}>
              <Typography variant="h3" gutterBottom component="div">
                Design Order Progress
              </Typography>
              <Box sx={{ width: "100%", mt: 2 }}>
                <Tabs
                  value={tabValue}
                  onChange={handleSetTabValue}
                  centered
                  variant="fullWidth"
                  sx={{ background: "white" }}
                >
                  <Tab label="Logs" />
                  <Tab label="Requirements" />
                  <Tab label="Designs" />
                </Tabs>
                <Divider />
              </Box>
              {tabValue === 0 && (
                <>
                  <Box sx={{ mt: 3 }}>
                    <TabsUnstyled defaultValue={0}>
                      <Box sx={{ width: 300 }}>
                        <TabsList>
                          <Tabb>All</Tabb>
                          <Tabb>Customer</Tabb>
                          <Tabb>Designer</Tabb>
                        </TabsList>
                      </Box>
                      <TabPanel value={0}>
                        <Box sx={{ pt: 1 }}>
                          <LogItem completed={false} />
                          <LogItem completed={true} />
                        </Box>
                      </TabPanel>
                      <TabPanel value={1}>
                        <>
                          <h3>customer</h3>
                          do ltr after, easy to do, builds on from All tab
                        </>
                      </TabPanel>
                      <TabPanel value={2}>
                        <>
                          <h3>designer</h3>
                          do ltr after, easy to do, builds on from All tab
                        </>
                      </TabPanel>
                    </TabsUnstyled>
                  </Box>
                </>
              )}
              {tabValue === 1 && (
                <>
                  <DesignRequirements />
                </>
              )}
              {tabValue === 2 && (
                <>
                  <Box sx={{ mt: 5 }}>
                    <DesignItemCard completed={false} />
                    <DesignItemCard completed={true} />
                  </Box>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Container>
    </>
  );
};

export default DesignOrderProgress;
