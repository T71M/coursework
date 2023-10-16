import styled from "@emotion/styled";
import { Box, Table } from "@mantine/core";
import { FC } from "react";

interface Props {
  headers: string[];
  rows: React.ReactNode;
  m?: string;
}
const StyledBody = styled.tbody`
  & td {
    cursor: pointer;
    padding: 0.75rem !important;
  }
`;

export const AppTable: FC<Props> = ({ headers, rows, m }) => {
  return (
    <Box sx={{ overflowX: "auto" }}>
      <Table m={m} highlightOnHover sx={{ minWidth: 700, overflow: "auto" }}>
        <thead>
          <tr>
            {headers.map((header, i) => (
              <th key={i}>{header}</th>
            ))}
          </tr>
        </thead>
        <StyledBody>{rows}</StyledBody>
      </Table>
    </Box>
  );
};
