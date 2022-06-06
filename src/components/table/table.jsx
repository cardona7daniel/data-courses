import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "@emotion/styled";

const TableRowStyled = styled(TableRow)`
  background-color: #f2e7dc;
`;

export function BasicTable(props) {
  const { headerData = [], children } = props;
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: "100%" }} aria-label="simple table">
        <TableHead>
          <TableRowStyled>
            { headerData.map((header, i) => (<TableCell key={i} align={header.align}>{header.title}</TableCell>)) }
          </TableRowStyled>
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
