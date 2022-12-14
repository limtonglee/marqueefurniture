import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import CheckBoxIcon from "@mui/icons-material/CheckBox";

import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";

// import { itemData } from "../../../data/itemData";

import * as listingsAPI from "../../../services/Listings";
import * as socialMediaAPI from "../../../services/SocialMedia";

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

const TagProductsModal = ({
  open,
  closeProductsModal,
  selectedProductsValues,
  setSelectedProductsValues,
}) => {
  const modalStyles = {
    wrapper: {
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      bgcolor: "background.paper",
      boxShadow: 24,
      p: 4,
      width: 450,
      minHeight: 500,
      borderRadius: 2,
    },
    contents: {
      display: "flex",
      flexDirection: "column",
      marginTop: "20px",
      marginBottom: "15px",
      justifyContent: "flex-start",
    },
    buttons: {
      display: "flex",
      justifyContent: "end",
    },
  };

  const [listingsData, setListingsData] = useState([]);

  const getAllListings = async () => {
    try {
      const res = await listingsAPI.getListings();
      const data = JSON.parse(JSON.stringify(res)).data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getUsernameById = async (userId) => {
    try {
      const res = await socialMediaAPI.getUsernameById(userId);
      let data = JSON.parse(JSON.stringify(res)).data[0]["username"];
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const getCompleteListingData = async () => {
    const allListings = await getAllListings();

    var promises = allListings.map(async (listing) => {
      const shopUsername = await getUsernameById(listing.shopid);

      const completeListing = {
        ...listing,
        shopusername: shopUsername,
      };
      return completeListing;
    });

    await promises.reduce((m, o) => m.then(() => o), Promise.resolve());

    Promise.all(promises).then((values) => {
      console.log("cleaned listing data", values);
      setListingsData(values);
      return values;
    });
  };

  useEffect(() => {
    getCompleteListingData();
  }, []);

  const handleChangeForSelectedProducts = (event, value) => {
    setSelectedProductsValues(value);
  };

  const deselectItem = (itemId) => {
    const newSelectedProducts = [...selectedProductsValues].filter(
      (item) => item.id !== itemId
    );
    setSelectedProductsValues(newSelectedProducts);
  };

  return (
    <>
      <Modal
        open={open}
        onClose={() => {
          closeProductsModal();
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyles.wrapper}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Products featured
            </Typography>
            <IconButton aria-label="delete" onClick={closeProductsModal}>
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ my: 2 }}>
            <Autocomplete
              value={selectedProductsValues}
              isOptionEqualToValue={(option, value) => option.id === value.id}
              onChange={handleChangeForSelectedProducts}
              limitTags={2}
              multiple
              id="checkboxes-tags-demo"
              options={listingsData}
              disableCloseOnSelect
              getOptionLabel={(option) => option.name}
              renderOption={(props, option, { selected }) => (
                <li {...props} key={option.id}>
                  <Checkbox
                    icon={icon}
                    checkedIcon={checkedIcon}
                    style={{ marginRight: 8 }}
                    checked={selected}
                  />

                  <Card sx={{ width: "100%", p: 1 }}>
                    <Box
                      sx={{
                        flexGrow: 1,
                      }}
                    >
                      <Grid
                        container
                        spacing={2}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                        }}
                      >
                        <Grid item xs={8}>
                          <Box>
                            <Typography
                              variant="caption text"
                              gutterBottom
                              component="div"
                            >
                              {option.name}
                            </Typography>
                            <Typography
                              variant="caption"
                              display="block"
                              gutterBottom
                            >
                              {`${option.listingprice}, ${option.shopusername}`}
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={4}>
                          <CardMedia
                            component="img"
                            height="100"
                            // image={option.image}
                            image={`/api/image/${option.image}`}
                            alt="green iguana"
                            sx={{
                              borderRadius: 1,
                            }}
                          />
                        </Grid>
                      </Grid>
                    </Box>
                  </Card>
                </li>
              )}
              style={{ width: "100%" }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Products"
                  placeholder="Search for products..."
                />
              )}
            />
          </Box>
          <Box sx={{ my: 2 }}>
            <Typography variant="caption text" gutterBottom component="div">
              {`Selected products (${selectedProductsValues.length})`}
            </Typography>
            <Grid
              container
              spacing={2}
              sx={{ height: 300, overflow: "scroll", my: 1 }}
            >
              {selectedProductsValues.map((item, index) => (
                <Grid item xs={6} md={6} key={item.id}>
                  <Link
                    to={`/marketplace/${item.id}`}
                    target="_blank"
                    style={{ textDecoration: "none" }}
                  >
                    <Card
                      sx={{
                        width: "100%",
                        position: "relative",
                      }}
                    >
                      <IconButton
                        aria-label="delete"
                        onClick={() => deselectItem(item.id)}
                        sx={{
                          position: "absolute",
                          right: 0,
                        }}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                      <Box
                        sx={{
                          flexGrow: 1,
                        }}
                      >
                        <CardMedia
                          component="img"
                          height="100"
                          // image={item.image}
                          image={`/api/image/${item.image}`}
                          alt="green iguana"
                        />
                        <Grid
                          container
                          spacing={2}
                          sx={{
                            display: "flex",
                            alignItems: "center",
                          }}
                        >
                          <Grid item xs={8}>
                            <Box
                              sx={{
                                p: 1,
                              }}
                            >
                              <Typography variant="subtitle2" component="div">
                                {item.name}
                              </Typography>
                              <Typography variant="caption" display="block">
                                {item.shopusername}
                              </Typography>
                              <Typography variant="caption" display="block">
                                {item.listingprice}
                              </Typography>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default TagProductsModal;
