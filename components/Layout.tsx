import Navbar from './Navbar';
import { Box, Container } from '@mui/material';

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      <Container maxWidth="md">
        <Box
          m={2}
          pt={11}
          sx={{
            textAlign: 'center',
          }}
        >
          {children}
        </Box>
      </Container>
    </>
  );
};

export default Layout;
