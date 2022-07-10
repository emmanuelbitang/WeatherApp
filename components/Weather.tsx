import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Stack,
  CircularProgress,
} from '@mui/material';
import moment from 'moment';
import { useSession } from 'next-auth/react';
import useMediaQuery from '@mui/material/useMediaQuery';

const Weather = ({ city }) => {
  const { data: session, status } = useSession();
  const matches = useMediaQuery('(min-width:600px)');

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'unauthenticated') {
    return <Typography variant="h4">Please Login!</Typography>;
  }

  return (
    <Stack spacing={4}>
      <Typography variant="h5">City Forecast: {city.name}</Typography>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 150 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Date (mm/dd/yyyy)</TableCell>
              <TableCell align="center" hidden>
                Temperature (F)
              </TableCell>
              {matches && (
                <>
                  <TableCell align="center">Description</TableCell>
                  <TableCell align="center">Main</TableCell>
                  <TableCell align="center">Pressure</TableCell>
                  <TableCell align="center">Humidity</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {city && (
              <TableRow
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {moment().format('MM/DD/YYYY')}
                </TableCell>
                <TableCell align="center">{city.main.temp}</TableCell>
                {matches &&
                <>
                  <TableCell align="center">
                    {city.weather[0].description}
                  </TableCell>
                  <TableCell align="center">{city.weather[0].main}</TableCell>
                  <TableCell align="center">{city.main.pressure}</TableCell>
                  <TableCell align="center">{city.main.humidity}</TableCell>
                </>}
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Stack>
  );
};

export default Weather;
