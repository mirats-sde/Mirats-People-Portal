import styles from "../../utils/table.css";
// import { BiEdit } from "react-icons/bi";
import { FcReading } from "react-icons/fc";
import { FiDownload } from "react-icons/fi";
import { styled } from "@mui/system";
import TablePaginationUnstyled from "@mui/base/TablePaginationUnstyled";
import { useState } from "react";

function createData(id, policyname, description, created, action, policyurl) {
  return { id, policyname, description, created, action, policyurl };
}

const rows = [
  createData(
    "1",
    "IT Policy",
    "Employee Code of Conduct",
    "Apr 28, 2022",
    "../../assets/policy/emppolicy.pdf"
  ),
  createData(
    "2",
    "IT Policy",
    "Employee Code of Conduct",
    "Apr 28, 2022",
    "https://www.youtube.com/watch?v=wgqX295fGkY&ab_channel=Syncfusion%2CInc"
  ),
  createData("3", "IT Policy", "Employee Code of Conduct", "Apr 28, 2022"),
  createData("4", "IT Policy", "Employee Code of Conduct", "Apr 28, 2022"),
  createData("5", "IT Policy", "Employee Code of Conduct", "Apr 28, 2022"),
  createData("6", "IT Policy", "Employee Code of Conduct", "Apr 28, 2022"),
  createData("7", "IT Policy", "Employee Code of Conduct", "Apr 28, 2022"),
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
    // width: 205px;
    height: 58px;
    border: 1px solid #c5c5ca;
    border-radius: 21px;
    text-align: center;
    color: #484848;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    margin: 20px;
    font-size: 18px;
  }

  //   td:last-child {
  //     border: none;
  //     box-shadow: none;
  //   }
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

const PolicyTable = () => {
  const [page, setPage] = useState(0);
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
    <div className={styles.table}>
      <Root sx={{ maxWidth: "100%" }}>
        <table aria-label="custom pagination table" cellSpacing={15}>
          <thead>
            <tr>
              <th style={{ width: "15%" }}>ID</th>
              <th style={{ width: "25%" }}>Policy Name</th>
              <th style={{ width: "30%" }}>Description</th>
              <th style={{ width: "15%" }}>Created</th>
              <th style={{ width: "15%" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {(rowsPerPage > 0
              ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              : rows
            ).map((row, i) => {
              return (
                <>
                  <tr key={row.i}>
                    <td>{row.id}</td>
                    <td>{row.policyname}</td>
                    <td>{row.description}</td>
                    <td>{row.created}</td>
                    <td>
                      <a
                        style={{ cursor: "pointer", marginRight: "10px" }}
                        href={row.policyurl}
                      >
                        <FcReading size={30} />
                      </a>
                      <a
                        download={row.policyurl}
                        href={row.no}
                        style={{ cursor: "pointer" }}
                      >
                        <FiDownload size={30} />
                      </a>
                    </td>
                  </tr>
                </>
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
  );
};

export default PolicyTable;
