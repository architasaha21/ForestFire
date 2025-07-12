import { useState, useEffect } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Box, CircularProgress } from '@mui/material';
import Dashboard from './components/Dashboard/Dashboard';
import RightDrawer from './components/RightDrawer';
import './App.css';

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: 'dark', 
    primary: {
      main: '#3182ce',
    },
    secondary: {
      main: '#38a169',
    },
    background: {
      default: '#171923',
      paper: '#1a202c',
    },
    text: {
      primary: '#e2e8f0',
      secondary: '#a0aec0',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {loading ? (
        <Box className="loading-screen">
          <CircularProgress size={60} />
        </Box>
      ) : (
        <Box position="relative">
          <Dashboard />
          <RightDrawer />
        </Box>
      )}
    </ThemeProvider>
  );
}

export default App;
