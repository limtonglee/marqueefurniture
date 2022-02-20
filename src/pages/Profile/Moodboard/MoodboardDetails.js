//This is the Moodboard Details page, currently not working

// import Button from "@mui/material/Button";
// import { Container, ImageList } from "@mui/material";
// import { ImageListItem } from "@mui/material";
// import { ImageListItemBar } from "@mui/material";
// import { IconButton } from "@mui/material";
// import ShareIcon from "@mui/icons-material/Share";
// import { useParams } from "react-router-dom";
// import { moodboardData } from "../../../data/moodboardData";


// export const MoodboardDetails = () => {
//   const param = useParams();
//   const moodboard = moodboardData[param.moodboardId];

//   return (
//     <>
//     <Container>
//         <ImageListItem key={moodboard.img}>
//           <Button variant="outlined">
//             <img
//               src={`${moodboard.img}?w=248&fit=crop&auto=format`}
//               srcSet={`${moodboard.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
//               alt={moodboard.title}
//               loading="lazy"
//             />
//           </Button>
//           <ImageListItemBar
//             sx={{ backgroundColor: "primary", fontWeight: "bold" }}
//             title={moodboard.title}
//             subtitle={moodboard.description}
//             actionIcon={
//               <IconButton sx={{ color: "secondary" }}>
//                 <ShareIcon />
//               </IconButton>
//             }
//             position="below"
//           />
//         </ImageListItem>
//       </Container>
//     </>
//   );
// };
