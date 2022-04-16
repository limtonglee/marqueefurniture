import {
  Box,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { getDisputeReports } from "../../../services/Admin";
import { Username } from "./Username";
import { ReportStatus } from "./ReportStatus";
import DisputeMoreMenu from "./DisputeMoreMenu";
import { format } from "date-fns";

const AdminDispute = () => {
  const [dispute, setDispute] = useState([]);
  const [fetchDispute, setFetchDispute] = useState(true);

  useEffect(() => {
    const getReports = async () =>
      getDisputeReports()
        .then((response) => {
          setDispute(JSON.parse(JSON.stringify(response.data)));
          setFetchDispute(false);
        })
        .catch((error) => {
          console.log(error);
        });
    fetchDispute && getReports();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fetchDispute]);

  return (
    <Container maxWidth="xl">
      <Card>
        <PerfectScrollbar>
          <Box sx={{ minWidth: 1050 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Report Date</TableCell>
                  <TableCell>Reporter</TableCell>
                  <TableCell>Reported</TableCell>
                  <TableCell>Order Id</TableCell>
                  <TableCell>Message</TableCell>
                  <TableCell>Report Status</TableCell>
                  <TableCell align="right">Options</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {dispute
                  .sort(
                    (a, b) => new Date(a.reportdate) - new Date(b.reportdate)
                  )
                  .map((report) => (
                    <TableRow hover key={report.id}>
                      <>
                        <TableCell>
                          {format(
                            Date.parse(report.reportdate),
                            "dd/MM/yyyy HH:MM"
                          )}
                        </TableCell>

                        <Username userId={report.reportedbyuserid} />
                        <Username userId={report.reportinguserid} />
                        <TableCell>{report.orderid}</TableCell>
                        <TableCell>{report.message}</TableCell>
                        <ReportStatus status={report.resolved}></ReportStatus>
                        <TableCell align="right">
                          <DisputeMoreMenu
                            userId={report.reportedbyuserid}
                            reportedId={report.reportinguserid}
                            reportId={report.id}
                            status={report.resolved}
                            setFetchDispute={setFetchDispute}
                          />
                        </TableCell>
                      </>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </Box>
        </PerfectScrollbar>
        {/* <TablePagination
        component="div"
        count={customers.length}
        onPageChange={handlePageChange}
        onRowsPerPageChange={handleLimitChange}
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      /> */}
      </Card>
    </Container>
  );
};

export default AdminDispute;
