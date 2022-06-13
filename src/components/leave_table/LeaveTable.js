import styles from "./LeaveTable.module.css";
import { BiEdit } from "react-icons/bi";
import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import { v4 as uuid } from "uuid";
import { useState } from "react";

import LeaveForm from "../../pages/leave/LeaveForm";
import { useLeaveContext } from "../../pages/leave/LeaveContext";

function createData(leavetype, leavefrom, leaveto, noofdays, reason, status) {
  return { leavetype, leavefrom, leaveto, noofdays, reason, status };
}

const rows = [
  createData(
    "Casual Type",
    "Apr 21, 2022",
    "Apr 25, 2022",
    4,
    "Vacation",
    "Pending"
  ),
  createData(
    "Casual Type",
    "Apr 21, 2022",
    "Apr 25, 2022",
    4,
    "Vacation",
    "Pending"
  ),
  createData(
    "Casual Type",
    "Apr 21, 2022",
    "Apr 25, 2022",
    4,
    "Vacation",
    "Pending"
  ),
  createData(
    "Casual Type",
    "Apr 21, 2022",
    "Apr 25, 2022",
    4,
    "Vacation",
    "Pending"
  ),
  createData(
    "Casual Type",
    "Apr 21, 2022",
    "Apr 25, 2022",
    4,
    "Vacation",
    "Pending"
  ),
  createData(
    "Casual Type",
    "Apr 21, 2022",
    "Apr 25, 2022",
    4,
    "Vacation",
    "Pending"
  ),
];

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
    font-size: 20px;
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

  td:last-child {
    border: none;
    // width: 0px;
    // height: 0px;
    box-shadow: none;
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

const LeaveTable = ({ leaves }) => {
  const { leaveForm, setLeaveForm } = useLeaveContext();
  const [page, setPage] = useState(0);
  const [leaveForUpdate, setLeaveForUpdate] = useState({});
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Avoid a layout jump when reaching the last page with empty rows.
  // const emptyRows =
  //   page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <>
      <div className={styles.table}>
        <Root sx={{ maxWidth: "100%" }}>
          <table aria-label="custom pagination table" cellSpacing={15}>
            <thead>
              <tr>
                <th>Leave Type</th>
                <th>From</th>
                <th>To</th>
                <th>No. Of Days</th>
                <th>Reason</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {(rowsPerPage > 0
                ? leaves.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  )
                : leaves
              ).map((row, i) => {
                return (
                  <tr key={uuid()}>
                    <td>{row?.leave_type}</td>
                    <td>
                      {row?.from_date?.toDate()?.toLocaleDateString("en-CA", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>
                      {row?.to_date?.toDate()?.toLocaleDateString("en-CA", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>{row?.number_of_days}</td>
                    <td>{row?.reason}</td>
                    <td>{row?.status}</td>
                    <td>
                      <a
                        onClick={() => {
                          setLeaveForm({
                            open: true,
                            formType: "update",
                            data: row,
                          });
                          setLeaveForUpdate(row);
                        }}
                        style={{ cursor: "pointer" }}
                        href={row.billno}
                      >
                        <BiEdit size={30} />
                      </a>
                    </td>
                  </tr>
                );
              })}

              {/* {emptyRows > 0 && (
              <tr style={{ height: 41 * emptyRows }}>
                <td colSpan={3} />
              </tr>
            )} */}
            </tbody>
            <tfoot>
              <tr>
                <CustomTablePagination
                  rowsPerPageOptions={[5, 10, 25, { label: "All", value: -1 }]}
                  // colSpan={3}
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
    </>
  );
};

export default LeaveTable;
