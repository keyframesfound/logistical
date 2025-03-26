import React, { useEffect, useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    Box,
    Alert,
    CircularProgress,
    Fade,
    Button,
} from '@mui/material';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Html5QrcodeResult } from 'html5-qrcode/esm/core';

interface ScannedData {
    name: string;
    quantity: number;
    location: string;
    timestamp: string;
}

const Scanner = () => {
    const [scanResult, setScanResult] = useState<ScannedData | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const scanner = new Html5QrcodeScanner(
            "reader",
            {
                fps: 10,
                qrbox: { width: 250, height: 250 },
                aspectRatio: 1.0,
            },
            false
        );

        const success = (result: Html5QrcodeResult) => {
            try {
                const data = JSON.parse(result.getDecodedText());
                setScanResult(data);
                setLoading(true);
                setTimeout(() => setLoading(false), 1000);
            } catch (err) {
                setError('Invalid QR code format');
                console.error('Error parsing QR code:', err);
            }
        };

        const error = (err: any) => {
            console.error('QR Scanner error:', err);
        };

        scanner.render(success, error);

        return () => {
            scanner.clear().catch(console.error);
        };
    }, []);

    const handleScanAgain = () => {
        setScanResult(null);
        setError(null);
    };

    return (
        <Container maxWidth="sm">
            <Paper 
                elevation={0} 
                sx={{ 
                    p: 4,
                    borderRadius: 3,
                    bgcolor: 'background.paper',
                    border: '1px solid',
                    borderColor: 'divider',
                }}
            >
                <Typography variant="h5" gutterBottom align="center" sx={{ mb: 3 }}>
                    Scan QR Code
                </Typography>

                {error && (
                    <Alert 
                        severity="error" 
                        sx={{ mb: 3, borderRadius: 2 }}
                        onClose={() => setError(null)}
                    >
                        {error}
                    </Alert>
                )}

                <Box sx={{ mb: 3 }}>
                    <div id="reader"></div>
                </Box>

                {scanResult && (
                    <Fade in timeout={500}>
                        <Box>
                            <Typography variant="h6" gutterBottom>
                                Scanned Item Details
                            </Typography>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Name
                                </Typography>
                                <Typography variant="body1">
                                    {scanResult.name}
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Quantity
                                </Typography>
                                <Typography variant="body1">
                                    {scanResult.quantity}
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 2 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Location
                                </Typography>
                                <Typography variant="body1">
                                    {scanResult.location}
                                </Typography>
                            </Box>
                            <Box sx={{ mb: 3 }}>
                                <Typography variant="body2" color="text.secondary">
                                    Scanned At
                                </Typography>
                                <Typography variant="body1">
                                    {new Date(scanResult.timestamp).toLocaleString()}
                                </Typography>
                            </Box>
                            <Button
                                variant="outlined"
                                fullWidth
                                onClick={handleScanAgain}
                                disabled={loading}
                            >
                                {loading ? <CircularProgress size={24} /> : 'Scan Another QR Code'}
                            </Button>
                        </Box>
                    </Fade>
                )}
            </Paper>
        </Container>
    );
};

export default Scanner; 