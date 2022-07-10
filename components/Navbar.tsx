import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@mui/material';
import CloudIcon from '@mui/icons-material/Cloud';
import HomeIcon from '@mui/icons-material/Home';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import useMediaQuery from '@mui/material/useMediaQuery';

export default function Navbar() {
  const { data: session } = useSession();
  const matches = useMediaQuery('(min-width:600px)');
  const router = useRouter();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => router.push('/')}
          >
            <CloudIcon />
          </IconButton>

          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            WeatherApp
          </Typography>

          {matches
            ? session && (
                <Button
                  onClick={() => router.push('/home')}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  Home
                </Button>
              )
            : session && (
                <IconButton
                  size="large"
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  sx={{ mr: 2 }}
                  onClick={() => router.push('/home')}
                >
                  <HomeIcon />
                </IconButton>
              )}
          {session ? (
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                signOut({ callbackUrl: '/' });
              }}
            >
              Logout
            </Button>
          ) : (
            <Button
              color="success"
              variant="contained"
              onClick={() => signIn('github')}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
