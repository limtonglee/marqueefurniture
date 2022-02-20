// react-router-dom components
import { Button, Typography } from "@mui/material";
// Soft UI Dashboard PRO React components
import Box from "@mui/material/Box";
// @mui material components
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
// prop-types is a library for typechecking of props
import PropTypes from "prop-types";
import { Link } from "react-router-dom";


function Moodboard({ image, label, title, description, action }) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor: "transparent",
        boxShadow: "none",
        overflow: "visible",
      }}
    >
      <Box position="relative" width="100.25%" shadow="xl" borderRadius="xl">
        <CardMedia
          src={image}
          component="img"
          title={title}
          sx={{
            maxWidth: "100%",
            margin: 0,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Box>
      <Box pt={3} px={0.5}>
        <Box mb={1}>
          <Typography
            variant="button"
            fontWeight="regular"
            textTransform="capitalize"
            textGradient
          >
            {label}
          </Typography>
        </Box>
        <Box mb={1}>
          {action.type === "internal" ? (
            <Typography
              component={Link}
              to={action.route}
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </Typography>
          ) : (
            <Typography
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="h5"
              textTransform="capitalize"
            >
              {title}
            </Typography>
          )}
        </Box>
        <Box mb={3} lineHeight={0}>
          <Typography variant="button" fontWeight="regular" color="text">
            {description}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
        >
          {action.type === "internal" ? (
            <Button
              component={Link}
              to={action.route}
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </Button>
          ) : (
            <Button
              component="a"
              href={action.route}
              target="_blank"
              rel="noreferrer"
              variant="outlined"
              size="small"
              color={action.color}
            >
              {action.label}
            </Button>
          )}
        </Box>
      </Box>
    </Card>
  );
}

// Typechecking props for the DefaultProjectCard
Moodboard.propTypes = {
  image: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  action: PropTypes.shape({
    type: PropTypes.oneOf(["external", "internal"]),
    route: PropTypes.string.isRequired,
    color: PropTypes.oneOf([
      "primary",
      "secondary",
      "info",
      "success",
      "warning",
      "error",
      "light",
      "dark",
      "white",
    ]).isRequired,
    label: PropTypes.string.isRequired,
  }).isRequired,
};

export default Moodboard;
