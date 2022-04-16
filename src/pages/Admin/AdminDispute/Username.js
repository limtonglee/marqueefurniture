import { TableCell } from "@mui/material";
import { useEffect, useState } from "react";
import { getUsernameById } from "../../../services/Admin";

export const Username = ({userId}) => {
  const [username, setUsername] = useState("");

  useEffect(() => {
    const getReports = async () => {
      console.log(userId)
      const res = await getUsernameById(userId);
      let data = JSON.parse(JSON.stringify(res)).data[0].username;
      console.log(data)
      setUsername(data);
    };
    getReports();
  }, []);

  return <TableCell>{username}</TableCell>;
};
