//can remove this page

// import * as React from "react";
// import Avatar from "@mui/material/Avatar";
// import Button from "@mui/material/Button";
// import CssBaseline from "@mui/material/CssBaseline";
// import TextField from "@mui/material/TextField";
// import FormControlLabel from "@mui/material/FormControlLabel";
// import Checkbox from "@mui/material/Checkbox";
// import {Link} from "react-router-dom";
// import Grid from "@mui/material/Grid";
// import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
// import Typography from "@mui/material/Typography";
// import Container from "@mui/material/Container";
// import { createTheme, ThemeProvider } from "@mui/material/styles";
// import { useHistory } from 'react-router-dom'

// export default function EditProfile() {

//   //set states for attributes
//   // const [name, setName] = useState('')
//   // const [bio, setBio] = useState('')
//   // const [url, setUrl] = useState('')

//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const data = new FormData(event.currentTarget);
//     // eslint-disable-next-line no-console
//     console.log({
//       name: data.get("name"),
//       bio: data.get("bio"),
//       url: data.get("url"),
//     });
//     window.history.back()
//   };

//   return (
//       <Container component="main" maxWidth="xs">
//         <CssBaseline />
//         <Box
//           sx={{
//             marginTop: 8,
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
//             <LockOutlinedIcon />
//           </Avatar>
//           <Typography component="h1" variant="h5">
//             Edit Profile
//           </Typography>
//           <Box
//             component="form"
//             noValidate
//             onSubmit={handleSubmit}
//             sx={{ mt: 3 }}
//           >
//             <Grid container spacing={2}>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   // onChange={(e) => setName(e.target.value)}
//                   id="name"
//                   label="Username"
//                   name="name"
//                   autoComplete="name"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   multiline
//                   rows={4}
//                   fullWidth
//                   // onChange={(e) => setBio(e.target.value)}
//                   id="bio"
//                   label="Bio (not more than 100 words)"
//                   name="bio"
//                   autoComplete="bio"
//                 />
//               </Grid>
//               <Grid item xs={12}>
//                 <TextField
//                   required
//                   fullWidth
//                   // onChange={(e) => setUrl(e.target.value)}
//                   id="url"
//                   label="Website"
//                   name="url"
//                   autoComplete="url"
//                 />
//               </Grid>
//             </Grid>
//             <Button
//               type="submit"
//               fullWidth
//               variant="contained"
//               sx={{ mt: 3, mb: 2 }}
//             >
//               Save Changes
//             </Button>
//             <Grid container justifyContent="flex-end">
//               <Grid item>
//                 <Link to="/login" >
//                   Already have an account? Sign in
//                 </Link>
//               </Grid>
//             </Grid>
//           </Box>
//         </Box>
//       </Container>
//   );
// }
