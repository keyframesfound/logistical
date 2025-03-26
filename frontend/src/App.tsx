import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import Navbar from './components/Navbar';
import Inventory from './pages/Inventory';
import QRGenerator from './pages/QRGenerator';
import QRScanner from './pages/QRScanner';

const theme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Inventory />} />
                    <Route path="/generate" element={<QRGenerator />} />
                    <Route path="/scan" element={<QRScanner />} />
                </Routes>
            </Router>
        </ThemeProvider>
    );
}

export default App;
