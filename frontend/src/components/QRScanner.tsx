import React, { useEffect, useRef } from 'react';
import { Html5QrcodeScanner } from 'html5-qrcode';
import { Box, Typography, Paper } from '@mui/material';

interface QRScannerProps {
    onScan: (result: string) => void;
    onError?: (error: string) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan, onError }) => {
    const scannerRef = useRef<Html5QrcodeScanner | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            scannerRef.current = new Html5QrcodeScanner(
                'reader',
                {
                    fps: 10,
                    qrbox: { width: 250, height: 250 },
                    aspectRatio: 1.0,
                },
                false
            );

            scannerRef.current.render(
                (decodedText) => {
                    onScan(decodedText);
                },
                (errorMessage) => {
                    if (onError) {
                        onError(errorMessage);
                    }
                }
            );
        }

        return () => {
            if (scannerRef.current) {
                scannerRef.current.clear();
            }
        };
    }, [onScan, onError]);

    return (
        <Paper
            elevation={3}
            sx={{
                p: 3,
                maxWidth: 500,
                mx: 'auto',
                mt: 4,
                background: 'rgba(255, 255, 255, 0.05)',
            }}
        >
            <Typography variant="h5" gutterBottom align="center">
                Scan QR Code
            </Typography>
            <Box
                ref={containerRef}
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mt: 2,
                }}
            >
                <div id="reader" />
            </Box>
        </Paper>
    );
};

export default QRScanner; 