import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import styled from "@emotion/styled";

const GridStyled = styled(Grid)`
  margin-top: 0;
  margin-bottom: 32px;
`;

export function Layout({ size, align, children }) {
  return (
    <Container maxWidth={size || 'lg'}>
      <Box sx={{ flexGrow: 1, height: '100%' }}>
        <GridStyled
          container
          direction="row"
          spacing={2}
          justifyContent={align || 'center'}
        >
          {children}
        </GridStyled>
      </Box>
    </Container>
  );
}
