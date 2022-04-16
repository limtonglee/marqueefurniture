import { TableCell } from "@mui/material";
import { useEffect, useState } from "react";

export const ReportStatus = ({ status, setFetchDispute }) => {
  // const [status, setStatus] = useState("");

  if (status === "0") {
    return <TableCell> open </TableCell>;
  } else {
    return <TableCell> closed </TableCell>;
  }
};
