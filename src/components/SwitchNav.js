import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import Typography from "@mui/material/Typography";
// import * as React from "react";
import React, { useEffect, useState } from "react";

export default function ControlledSwitches({ checked, handleChange }) {

	const [isMobile, setIsMobile] = useState(false);

	//choose the screen size
	const handleResize = () => {
		if (window.innerWidth < 720) {
			setIsMobile(true);
		} else {
			setIsMobile(false);
		}
	};
	useEffect(() => {
		window.addEventListener("resize", handleResize);
	});

	return (
		<>
			<Stack
				direction="row"
				spacing={0.5}
				sx={{ display: "flex", alignItems: "center" }}
			>
				<MaterialUISwitch
					checked={checked}
					onChange={handleChange}
					inputProps={{ "aria-label": "controlled" }}
				/>
				{!isMobile && (
					<Typography variant="h5">
						{checked ? "Ideas" : "Marketplace"}
					</Typography>
				)}
				{/* <Typography variant="h5">
					{checked ? "Ideas" : "Marketplace"}
				</Typography> */}
			</Stack>

			{/* <MaterialUISwitch
				checked={checked}
				onChange={handleChange}
				inputProps={{ "aria-label": "controlled" }}
			/>
			{!checked && "Marketplace"}
			{!!checked && "Ideas"} */}
		</>
	);
}

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
	width: 73,
	height: 40,
	padding: 7,
	"& .MuiSwitch-switchBase": {
		margin: 1,
		padding: 0,
		transform: "translateX(6px)",
		"&.Mui-checked": {
			color: "#fff",
			transform: "translateX(30px)",
			"& .MuiSwitch-thumb:before": {
				backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="19" width="24" viewBox="0 0 75 70"><path fill="${encodeURIComponent(
					"#fff"
				)}" d="M14.0713 0.734863L10.13 4.67064L15.9944 10.5323L19.9302 6.59654L14.0685 0.734863H14.0713ZM65.508 0.734863L59.6435 6.59654L63.5821 10.5323L69.4437 4.67344L65.5052 0.734863H65.508ZM39.7882 2.48161C38.8645 2.49281 37.9295 2.54599 36.989 2.66076C36.961 2.66076 36.933 2.65516 36.905 2.66076C25.5512 3.96242 16.5151 13.1356 14.9447 24.4391C13.6906 33.5367 17.4417 41.7862 23.6924 47.0992C26.2493 49.2814 27.9788 52.2758 28.5912 55.581V72.3766H34.9735C35.9476 74.0478 37.7252 75.1759 39.7882 75.1759C41.8513 75.1759 43.6288 74.0478 44.603 72.3766H50.9853V61.1795H51.2485V57.854C51.2485 53.7503 53.3815 49.613 56.847 46.3966C61.4826 41.7554 64.9817 35.1631 64.9817 27.5911C64.9817 13.7627 53.5999 2.35284 39.7882 2.48161V2.48161ZM39.7882 8.08015C50.6074 7.92899 59.3831 16.7859 59.3831 27.5911C59.3831 33.4528 56.6679 38.6146 52.9084 42.3712L52.998 42.4608C49.262 45.9059 46.8463 50.5474 46.1678 55.5838H33.9238C33.3079 50.7858 31.2505 46.1419 27.3623 42.8107C22.416 38.6118 19.4683 32.2855 20.4537 25.1417C21.677 16.324 28.8319 9.23345 37.5992 8.26211C38.3231 8.16119 39.052 8.10137 39.7827 8.08295L39.7882 8.08015ZM0.59845 27.5911V33.1896H8.99626V27.5911H0.59845ZM70.5802 27.5911V33.1896H78.978V27.5911H70.5802ZM15.9944 50.2484L10.1328 56.1073L14.0713 60.0458L19.9274 54.1842L15.9944 50.2484ZM63.5821 50.2484L59.6463 54.1842L65.5052 60.0458L69.4437 56.1073L63.5821 50.2484ZM34.1897 61.1823H45.3868V66.7809H34.1897V61.1823Z"/></svg>')`,
			},
			"& + .MuiSwitch-track": {
				opacity: 1,
				backgroundColor:
					theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
			},
		},
	},
	"& .MuiSwitch-thumb": {
		backgroundColor: theme.palette.mode === "dark" ? "#003892" : "#001e3c",
		width: 36,
		height: 36,
		"&:before": {
			content: "''",
			position: "absolute",
			width: "100%",
			height: "100%",
			left: 0,
			top: 0,
			backgroundRepeat: "no-repeat",
			backgroundPosition: "center",
			backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="18" width="30" viewBox="0 0 80 70"><path fill="${encodeURIComponent(
				"#fff"
			)}" d="M82.1876 20.0387L76.3751 2.60117C76.1729 1.99963 75.7794 1.48082 75.2546 1.12397C74.7298 0.767117 74.1026 0.591845 73.4689 0.624924H9.5314C8.89765 0.591845 8.27048 0.767117 7.7457 1.12397C7.22092 1.48082 6.82737 1.99963 6.62515 2.60117L0.812653 20.0387C0.770782 20.3473 0.770782 20.6601 0.812653 20.9687V38.4062C0.812653 39.1769 1.11885 39.9162 1.66387 40.4612C2.2089 41.0062 2.94812 41.3124 3.7189 41.3124H6.62515V70.3749H12.4377V41.3124H29.8751V70.3749H76.3751V41.3124H79.2814C80.0522 41.3124 80.7914 41.0062 81.3364 40.4612C81.8814 39.9162 82.1876 39.1769 82.1876 38.4062V20.9687C82.2295 20.6601 82.2295 20.3473 82.1876 20.0387V20.0387ZM70.5626 64.5624H35.6876V41.3124H70.5626V64.5624ZM76.3751 35.4999H64.7501V23.8749H58.9376V35.4999H44.4064V23.8749H38.5939V35.4999H24.0626V23.8749H18.2501V35.4999H6.62515V21.4337L11.6239 6.43742H71.3764L76.3751 21.4337V35.4999Z"/></svg>')`,
		},
	},
	"& .MuiSwitch-track": {
		opacity: 1,
		backgroundColor: theme.palette.mode === "dark" ? "#8796A5" : "#aab4be",
		borderRadius: 30 / 2,
	},
}));
