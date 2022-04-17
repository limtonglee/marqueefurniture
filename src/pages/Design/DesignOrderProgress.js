import React, { useState, useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import {
  useNavigate,
  useNavigationType,
  useLocation,
  Link,
} from "react-router-dom";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import Button from "@mui/material/Button";

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
import { useStores } from "../../stores/RootStore";
import AddIcon from "@mui/icons-material/Add";
import * as designEngagementAPI from "../../services/DesignEngagement";

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
  const location = useLocation();

  const designOrderStatus = location.state
    ? location.state.designOrderStatus
    : null;

  const buyerId = location.state ? location.state.buyerId : null;
  const sellerId = location.state ? location.state.sellerId : null;

  let navigate = useNavigate();
  const { userStore } = useStores();

  const [tabValue, setTabValue] = useState(0);
  const handleSetTabValue = (event, newValue) => {
    setTabValue(newValue);
    userStore.setPrevTabOnDesignOrder(newValue);
  };

  const navigationType = useNavigationType();

  useEffect(() => {
    console.log("navigationType", navigationType);
    if (navigationType === "POP") {
      setTabValue(userStore.prevTabOnDesignOrder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const [logs, setLogs] = useState([
    {
      id: 1,
      datetime: "2022-03-19 02:58:55.425662",
      description: "Requested for consultation",
      role: "Customer",
    },
    {
      id: 2,
      datetime: "2022-03-19 02:58:55.425662",
      description: "Issued quotation",
      role: "Designer",
    },
    {
      id: 3,
      datetime: "2022-03-19 02:58:55.425662",
      description: "Edited quotation",
      role: "Designer",
    },
    {
      id: 4,
      datetime: "2022-03-19 02:58:55.425662",
      description: "Paid for quotation",
      role: "Customer",
    },
    {
      id: 5,
      datetime: "2022-03-19 02:58:55.425662",
      description: "Issued quotation for design package",
      role: "Designer",
    },
    {
      id: 6,
      datetime: "2022-03-19 02:58:55.425662",
      description: "Paid for quotation",
      role: "Customer",
    },
  ]);

  const getDesignLogs = async (designOrderId) => {
    try {
      const res = await designEngagementAPI.getDesignLogs(designOrderId);
      const data = JSON.parse(JSON.stringify(res)).data;
      console.log("getDesignLogs data", data);
      setLogs(data);
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log("designOrderStatus", designOrderStatus);
    console.log("designOrderStatus.id", designOrderStatus.id);
    getDesignLogs(designOrderStatus.id);
  }, []);

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
                          {logs.reverse().map((log, i) => (
                            <LogItem log={log} completed={false} key={i} />
                          ))}
                        </Box>
                      </TabPanel>
                      <TabPanel value={1}>
                        <Box sx={{ pt: 1 }}>
                          {logs
                            .reverse()
                            .filter((log) => log.role === "Customer")
                            .map((log, i) => (
                              <LogItem log={log} completed={false} key={i} />
                            ))}
                        </Box>
                      </TabPanel>
                      <TabPanel value={2}>
                        <Box sx={{ pt: 1 }}>
                          {logs
                            .reverse()
                            .filter((log) => log.role === "Designer")
                            .map((log, i) => (
                              <LogItem log={log} completed={false} key={i} />
                            ))}
                          {logs
                            .reverse()
                            .filter((log) => log.role === "Designer").length ===
                            0 && (
                            <Box
                              sx={{
                                width: "100%",
                                height: 100,
                                border: "1px solid #DFE3E8",
                                borderRadius: 3,
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                              }}
                            >
                              <Typography
                                variant="h5"
                                gutterBottom
                                component="div"
                                sx={{
                                  fontWeight: "normal",
                                  fontStyle: "italic",
                                }}
                              >
                                No logs for designer
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      </TabPanel>
                    </TabsUnstyled>
                  </Box>
                </>
              )}
              {tabValue === 1 && (
                <>
                  <DesignRequirements
                    designOrderStatus={designOrderStatus}
                    buyerId={buyerId}
                  />
                </>
              )}
              {tabValue === 2 && (
                <>
                  <Box sx={{ mt: 3 }}>
                    {userStore.isDesigner &&
                      (designOrderStatus.design_order_status === "Designing" ||
                        designOrderStatus.design_order_status ===
                          "Rejected") && (
                        // <Button
                        //   startIcon={<AddIcon />}
                        //   variant="contained"
                        //   sx={{ mb: 2 }}
                        // >
                        //   Add Design Package
                        // </Button>
                        <Link
                          to="/designOrder/newDesign"
                          state={{
                            designOrderStatus: designOrderStatus, //todo: update
                            buyerId: buyerId,
                            sellerId: sellerId,
                          }}
                        >
                          <Button
                            startIcon={<AddIcon />}
                            variant="contained"
                            sx={{ mb: 2 }}
                          >
                            Add Design Package
                          </Button>
                        </Link>
                      )}
                    {designOrderStatus.designItems
                      .reverse()
                      .map((design, i) => (
                        <DesignItemCard
                          design={design}
                          completed={false}
                          key={i}
                        />
                      ))}
                    {designOrderStatus.designItems.length === 0 && (
                      <Box
                        sx={{
                          width: "100%",
                          height: 200,
                          border: "1px solid #DFE3E8",
                          borderRadius: 3,
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Typography
                          variant="h5"
                          gutterBottom
                          component="div"
                          sx={{ fontWeight: "normal", fontStyle: "italic" }}
                        >
                          No designs yet
                        </Typography>
                      </Box>
                    )}
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
