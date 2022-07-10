import React from 'react';
import Head from 'next/head';
import { Typography } from '@mui/material';

function Home() {
  return (
    <>
      <Head>
        <title>Weather App</title>
      </Head>
      <Typography variant="h6">
        Welcome to the weather application. Please login with your Github user
        to use application and view the weather in your city
      </Typography>
    </>
  );
}

export default Home;
