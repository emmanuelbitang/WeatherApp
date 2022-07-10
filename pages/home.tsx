import {
  Stack,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Link,
} from '@mui/material';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';

import config from '../next.config';
import Weather from '../components/weather';

function Home() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [city, setCity] = useState({});
  const [input, setInput] = useState('');
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showTable, setShowTable] = useState(false);
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchInfo = async () => {
      const data = await fetch('https://api.github.com/user', {
        headers: {
          Accept: 'application/vnd.github+json',
          Authorization: `token ${config.token}`,
        },
      });
      const json = await data.json();
      setInfo(() => json);
    };

    fetchInfo().catch(console.error);
  }, []);

  const handleClick = () => {
    if (input) {
      const fetchData = async () => {
        const data = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${input}&APPID=${config.apiKey}`
        );
        const json = await data.json();

        if (json.cod === '404') {
          setError(true);
          setErrorMessage(json.message);
        } else {
          setError(false);
          setErrorMessage('');
          setCity(json);
          setShowTable(true);
        }
      };

      fetchData().catch(console.error);
    } else {
      setError(true);
      setErrorMessage('Please enter a city');
    }
  };

  if (status === 'loading') {
    return <CircularProgress />;
  }

  if (status === 'unauthenticated') {
    return <Typography variant="h4">Please Login!</Typography>;
  }

  return (
    <>
      <Head>
        <title>{showTable ? 'Weather' : 'Home'}</title>
      </Head>

      {showTable ? (
        <Stack spacing={2}>
          <Weather city={city} />
          <Button
            sx={{ minWidth: 100 }}
            onClick={() => {
              setShowTable(false);
              setInput('');
            }}
          >
            Go Back
          </Button>
        </Stack>
      ) : (
        <Stack spacing={5}>
          {info && (
            <>
              <Typography variant="h6">Hi {info.name}!</Typography>
              <Link
                href={info.html_url}
                underline="none"
                target="_blank"
                rel="noopener"
              >
                {info.html_url}
              </Link>
            </>
          )}

          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="center"
            spacing={2}
          >
            <TextField
              id="outlined-basic"
              label="Enter City"
              variant="outlined"
              onChange={(e) => setInput(e.target.value)}
              error={error}
              helperText={errorMessage}
            />
            <Button variant="contained" onClick={() => handleClick()}>
              Display Weather
            </Button>
          </Stack>
        </Stack>
      )}
    </>
  );
}

export default Home;
