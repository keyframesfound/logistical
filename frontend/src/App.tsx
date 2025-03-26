import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Inventory from './pages/Inventory';
import Scanner from './pages/Scanner';
import Generator from './pages/Generator';

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#90caf9',
        },
        secondary: {
            main: '#f48fb1',
        },
        background: {
            default: '#121212',
            paper: '#1e1e1e',
        },
    },
    shape: {
        borderRadius: 12,
    },
    components: {
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: 'none',
                    fontWeight: 500,
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Box sx={{ 
                    minHeight: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: 'background.default',
                }}>
                    <Navbar />
                    <Box component="main" sx={{ flex: 1, py: 3 }}>
                        <Routes>
                            <Route path="/" element={<Navigate to="/inventory" replace />} />
                            <Route path="/inventory" element={<Inventory />} />
                            <Route path="/scan" element={<Scanner />} />
                            <Route path="/generate" element={<Generator />} />
                        </Routes>
                    </Box>
                </Box>
            </Router>
        </ThemeProvider>
    );
}

export default App;
