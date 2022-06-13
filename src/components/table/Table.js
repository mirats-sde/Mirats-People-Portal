import styles from "./Table.module.css";
import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { userAuthContext } from "../../pages/context/Userauthcontext";

function createData(date, punchin, punchout, production, overtime) {
  return { date, punchin, punchout, production, overtime };
}

const rows = [];
export function msToTime(duration) {
  var milliseconds = parseInt((duration % 1000) / 100),
    seconds = Math.floor((duration / 1000) % 60),
    minutes = Math.floor((duration / (1000 * 60)) % 60),
    hours = Math.floor((duration / (1000 * 60 * 60)) % 24);

  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  return hours + ":" + minutes + ":" + seconds;
}

const Root = styled("div")`
  table {
    // border-collapse: collapse;
    width: 100%;
  }

  th {
    color: black;
    font-weight: 700;
    text-align: center;
    padding: 8px;
    font-size: 25px;
  }

  td {
    width: 205px;
    height: 58px;
    border: 1px solid #c5c5ca;
    border-radius: 21px;
    text-align: center;
    color: #484848;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin: 20px;
    font-size: 18px;
  }
`;

const CustomTablePagination = styled(TablePaginationUnstyled)`
  & .MuiTablePaginationUnstyled-toolbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
    padding: 0.5em 2em;

    @media (min-width: 768px) {
      flex-direction: row;
      align-items: center;
    }
  }

  & .MuiTablePaginationUnstyled-selectLabel {
    margin: 0;
  }

  & .MuiTablePaginationUnstyled-select {
    padding: 0.5em 1em;
    border-radius: 21px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: none;
    font-weight: 700;
    font-size: 14px;
    color: #484848;
    outline: none;
  }

  & .MuiTablePaginationUnstyled-displayedRows {
    margin: 0;

    @media (min-width: 768px) {
      margin-left: auto;
    }
  }

  & .MuiTablePaginationUnstyled-spacer {
    display: none;
  }

  & .MuiTablePaginationUnstyled-actions {
    display: flex;
    gap: 0.25rem;
    padding: 0.5em;
  }

  & .MuiTablePaginationUnstyled-actions button {
    padding: 0.3em 0.5em;
    border: 1px solid #828282;
    cursor: pointer;
    background-color: white;
    border-radius: 21px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border: none;
  }

  & .MuiTablePaginationUnstyled-actions span {
    // padding: 0 0.8em;
    padding: 1em;
    color: #484848;
    font-weight: 700;
  }
`;

const Table = ({ AttendanceData, setAttendanceData }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { userData, user } = useContext(userAuthContext);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <div className={styles.table}>
      <Root sx={{ maxWidth: "100%" }}>
        <table aria-label="custom pagination table" cellSpacing={15}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Punch In</th>
              <th>Punch Out</th>
              <th>Production</th>
              <th>Overtime</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? AttendanceData.slice(
                  page * rowsPerPage,
                  page * rowsPerPage + rowsPerPage
                )
              : AttendanceData
            ).map((row, index) => (
              <>
                <tr key={index}>
                  <td>{row?.Date}</td>
                  <td>{row?.PunchIn?.toDate()?.toLocaleTimeString("en-CA")}</td>
                  <td>
                    {!row?.PunchOut
                      ? "-"
                      : row?.PunchOut?.toDate()?.toLocaleTimeString("en-CA")}
                  </td>
                  <td>
                    {row?.PunchOut ? <>{row?.production}</> : <>{"00:00:00"}</>}
                  </td>
                  <td>
                    {row?.PunchOut ? <>{row?.overtime}</> : <>{"00:00:00"}</>}
                  </td>
                </tr>
              </>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <CustomTablePagination
                rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                componentsProps={{
                  select: {
                    "aria-label": "rows per page",
                  },
                  actions: {
                    showFirstButton: true,
                    showLastButton: true,
                  },
                }}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
              />
            </tr>
          </tfoot>
        </table>
      </Root>
    </div>
  );
};

export default Table;
