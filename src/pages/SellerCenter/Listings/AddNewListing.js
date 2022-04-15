import { Layout } from "../Layout";
import React, { useReducer, useState } from "react";
import { Button, Card, TextField, MenuItem, Box, Typography } from "@mui/material";
import { useStores } from "../../../stores/RootStore";
import axios from "axios";

const style = {
  cardStyle: {
    "& .MuiTextField-root": { m: 1, width: "36ch" },
    display: "flex",
    flexDirection: "column",
    padding: 2,
    marginBottom: 2,
    marginRight: 2,
    width: "400px",
  },
  buttons: {
    display: "flex",
    justifyContent: "end",
  },
};

const type = [
  {
    value: "Furniture",
    label: "Furniture",
  },
  {
    value: "Service",
    label: "Service",
  },
  {
    value: "Design",
    label: "Design",
  },
];

const formReducer = (state, event) => {
  if (event.reset) {
    return {
      type: "",
      name: "",
      image: "",
      description: "",
      category: "",
      brand: "",
      warrantyInfo: "",
      shippingProvider: "",
      parcelSize: "",
      weight: "",
      stockAvailable: "",
      listingPrice: "",
      variations: "",
      dimensions: "",
      status: "",
      shopId: "",
    };
  }
  return {
    ...state,
    [event.name]: event.value,
  };
};

export const AddNewListing = () => {
  const [formData, setFormData] = useReducer(formReducer, {});
  const { userStore } = useStores();

  const handleChange = (event) => {
    setFormData({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const [file, setFile] = useState();

  const fileSelected = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiFormData = new FormData();
    apiFormData.append("image", file);
    apiFormData.append("type", formData.type);
    apiFormData.append("name", formData.name);
    apiFormData.append("description", formData.description);
    apiFormData.append("category", formData.category);
    apiFormData.append("brand", formData.brand);
    apiFormData.append("warrantyInfo", formData.warrantyInfo);
    apiFormData.append("shippingProvider", formData.shippingProvider);
    apiFormData.append("parcelSize", formData.parcelSize);
    apiFormData.append("weight", formData.weight);
    apiFormData.append("stockAvailable", formData.stockAvailable);
    apiFormData.append("listingPrice", formData.listingPrice);
    apiFormData.append("variations", formData.variations);
    apiFormData.append("dimensions", formData.dimensions);
    apiFormData.append("status", 'LIVE');
    apiFormData.append("shopId", userStore.shop.id);

    const result = await axios.post(
      "http://localhost:8080/api/merchant/createListing",
      apiFormData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    setTimeout(() => {
      setFormData({
        reset: true,
      });
    }, 3000);
  };
  return (
    <Layout>
      <Typography variant="h4" gutterBottom>
        Add New Listing
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="outlined-select-product-type"
          select
          label="Product type"
          name="type"
          onChange={handleChange}
          value={formData.type || ""}
          helperText=""
          sx={{ width: '200px', marginTop: '24px', marginBottom: '12px' }}
        >
          {type.map((option) => (
            <MenuItem value={option.value}>{option.label}</MenuItem>
          ))}
        </TextField>
        {formData.type === "Furniture" &&
          <Box>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Card
                component="form"
                sx={style.cardStyle}
                noValidate
                autoComplete="off"
              >
                Basic Information

                <TextField
                  required
                  id="outlined-required"
                  name="name"
                  label="Product name"
                  onChange={handleChange}
                  value={formData.name || ""}
                />
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  name="description"
                  label="Product description"
                  onChange={handleChange}
                  value={formData.description || ""}
                />
                <input
                  onChange={fileSelected}
                  type="file"
                  accept="image/*"
                  style={{ paddingLeft: '8px' }}
                ></input>
              </Card>
              <Card
                component="form"
                sx={style.cardStyle}
                noValidate
                autoComplete="off"
              >
                Specification
                <TextField
                  required
                  id="outlined-required"
                  name="category"
                  label="Category"
                  onChange={handleChange}
                  value={formData.category || ""}
                ></TextField>
                <TextField
                  required
                  id="outlined-required"
                  name="brand"
                  label="Brand"
                  onChange={handleChange}
                  value={formData.brand || ""}
                ></TextField>
                <TextField
                  required
                  id="outlined-required"
                  name="dimensions"
                  label="Dimensions"
                  onChange={handleChange}
                  value={formData.dimensions || ""}
                ></TextField>
                <TextField
                  required
                  id="outlined-required"
                  name="warrantyInfo"
                  label="Warranty"
                  onChange={handleChange}
                  value={formData.warrantyInfo || ""}
                ></TextField>
              </Card>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Card
                component="form"
                sx={style.cardStyle}
                noValidate
                autoComplete="off"
              >
                Sales Information
                <TextField
                  required
                  id="outlined-required"
                  name="variations"
                  label="Variation"
                  onChange={handleChange}
                  value={formData.variations || ""}
                ></TextField>
                <TextField
                  required
                  id="outlined-required"
                  name="listingPrice"
                  label="Price"
                  onChange={handleChange}
                  value={formData.listingPrice || ""}
                ></TextField>
                <TextField
                  required
                  id="outlined-required"
                  name="stockAvailable"
                  label="Stock"
                  onChange={handleChange}
                  value={formData.stockAvailable || ""}
                ></TextField>
              </Card>
              <Card
                component="form"
                sx={style.cardStyle}
                noValidate
                autoComplete="off"
              >
                Shipping
                <TextField
                  required
                  id="outlined-required"
                  name="weight"
                  label="Weight"
                  onChange={handleChange}
                  value={formData.weight || ""}
                ></TextField>
                <TextField
                  required
                  id="outlined-required"
                  name="parcelSize"
                  label="Parcel size"
                  onChange={handleChange}
                  value={formData.parcelSize || ""}
                ></TextField>
                <TextField
                  required
                  id="outlined-required"
                  name="shippingProvider"
                  label="Shipping provider"
                  onChange={handleChange}
                  value={formData.shippingProvider || ""}
                ></TextField>
              </Card>
            </div>
            <Box sx={style.buttons}>
              <Button type="submit" value="Submit" variant="contained" sx={{ marginBottom: '24px' }}>
                Save and Publish
              </Button>
            </Box>
          </Box>
        }

        {formData.type === "Service" &&
          <Box>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Card
                component="form"
                sx={style.cardStyle}
                noValidate
                autoComplete="off"
              >
                Basic Information

                <TextField
                  required
                  id="outlined-required"
                  name="name"
                  label="Product name"
                  onChange={handleChange}
                  value={formData.name || ""}
                />
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  name="description"
                  label="Product description"
                  onChange={handleChange}
                  value={formData.description || ""}
                />
                <input
                  onChange={fileSelected}
                  type="file"
                  accept="image/*"
                  style={{ paddingLeft: '8px' }}
                ></input>
              </Card>
              <Card
                component="form"
                sx={style.cardStyle}
                noValidate
                autoComplete="off"
              >
                Specification
                <TextField
                  required
                  id="outlined-required"
                  name="category"
                  label="Category"
                  onChange={handleChange}
                  value={formData.category || ""}
                ></TextField>
              </Card>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Card
                component="form"
                sx={style.cardStyle}
                noValidate
                autoComplete="off"
              >
                Sales Information
                <TextField
                  required
                  id="outlined-required"
                  name="listingPrice"
                  label="Price"
                  onChange={handleChange}
                  value={formData.listingPrice || ""}
                ></TextField>
              </Card>
            </div>
            <Box sx={style.buttons}>
              <Button type="submit" value="Submit" variant="contained" sx={{ marginBottom: '24px' }}>
                Save and Publish
              </Button>
            </Box>
          </Box>
        }
        {formData.type === "Design" &&
          <Box>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Card
                component="form"
                sx={style.cardStyle}
                noValidate
                autoComplete="off"
              >
                Basic Information

                <TextField
                  required
                  id="outlined-required"
                  name="name"
                  label="Product name"
                  onChange={handleChange}
                  value={formData.name || ""}
                />
                <TextField
                  id="outlined-multiline-static"
                  multiline
                  rows={4}
                  name="description"
                  label="Product description"
                  onChange={handleChange}
                  value={formData.description || ""}
                />
                <input
                  onChange={fileSelected}
                  type="file"
                  accept="image/*"
                  style={{ paddingLeft: '8px' }}
                ></input>
              </Card>
              <Card
                component="form"
                sx={style.cardStyle}
                noValidate
                autoComplete="off"
              >
                Specification
                <TextField
                  required
                  id="outlined-required"
                  name="category"
                  label="Category"
                  onChange={handleChange}
                  value={formData.category || ""}
                ></TextField>
              </Card>
            </div>
            <div style={{ display: "flex", flexDirection: "row" }}>
              <Card
                component="form"
                sx={style.cardStyle}
                noValidate
                autoComplete="off"
              >
                Sales Information
                <TextField
                  required
                  id="outlined-required"
                  name="listingPrice"
                  label="Price"
                  onChange={handleChange}
                  value={formData.listingPrice || ""}
                ></TextField>
              </Card>
            </div>
            <Box sx={style.buttons}>
              <Button type="submit" value="Submit" variant="contained" sx={{ marginBottom: '24px' }}>
                Save and Publish
              </Button>
            </Box>
          </Box>
        }
      </form>
    </Layout>
  );
};
