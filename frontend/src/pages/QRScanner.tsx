import React, { useState } from 'react';
import {
    Container,
    Typography,
    Paper,
    Box,
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { QrReader } from 'react-qr-reader';
import { Item } from '../types/Item';
import { itemService } from '../services/api';

const QRScanner: React.FC = () => {
    const navigate = useNavigate();
    const [scannedData, setScannedData] = useState<string | null>(null);
    const [item, setItem] = useState<Item | null>(null);
    const [openDialog, setOpenDialog] = useState(false);

    const handleScan = async (data: string | null) => {
        if (data) {
            try {
                const parsedData = JSON.parse(data);
                const itemData = await itemService.getItemById(parsedData._id);
                setItem(itemData);
                setScannedData(data);
                setOpenDialog(true);
            } catch (error) {
                console.error('Error processing QR code:', error);
            }
        }
    };

    const handleError = (error: Error) => {
        console.error('Error scanning QR code:', error);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
        setScannedData(null);
        setItem(null);
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Scan QR Code
            </Typography>

            <Paper sx={{ p: 3, mb: 3 }}>
                <Box sx={{ maxWidth: 500, mx: 'auto' }}>
                    <QrReader
                        constraints={{ facingMode: 'environment' }}
                        onResult={(result, error) => {
                            if (result) {
                                handleScan(result.getText());
                            }
                            if (error) {
                                handleError(error);
                            }
                        }}
                    />
                </Box>
            </Paper>

            <Dialog open={openDialog} onClose={handleCloseDialog}>
                <DialogTitle>Scanned Item Details</DialogTitle>
                <DialogContent>
                    {item && (
                        <Box>
                            <Typography variant="h6">{item.name}</Typography>
                            <Typography>Description: {item.description}</Typography>
                            <Typography>Quantity: {item.quantity}</Typography>
                            <Typography>Location: {item.location}</Typography>
                        </Box>
                    )}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog}>Close</Button>
                    <Button
                        onClick={() => navigate('/')}
                        variant="contained"
                        color="primary"
                    >
                        View Inventory
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default QRScanner; 