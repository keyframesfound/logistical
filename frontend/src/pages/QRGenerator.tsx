import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Paper,
    Grid,
    Alert,
    CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { itemService } from '../services/api';

const QRGenerator: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        quantity: '',
        location: '',
    });
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [savedItem, setSavedItem] = useState<any>(null);

    const generateQRValue = (data: typeof formData) => {
        return JSON.stringify({
            name: data.name,
            description: data.description,
            quantity: parseInt(data.quantity),
            location: data.location,
            timestamp: new Date().toISOString(),
        });
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
        // Clear error when user starts typing
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        
        try {
            const newItem = await itemService.createItem({
                ...formData,
                quantity: parseInt(formData.quantity),
            });
            setSavedItem(newItem);
        } catch (error) {
            console.error('Error creating item:', error);
            setError('Failed to save item to database. QR code generated locally.');
            // Still generate QR code even if API fails
            setSavedItem({
                ...formData,
                quantity: parseInt(formData.quantity),
                _id: 'local-' + Date.now(),
            });
        } finally {
            setLoading(false);
        }
    };

    const qrValue = savedItem ? generateQRValue(savedItem) : null;

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Generate QR Code
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <form onSubmit={handleSubmit}>
                            {error && (
                                <Alert severity="error" sx={{ mb: 2 }}>
                                    {error}
                                </Alert>
                            )}
                            <TextField
                                fullWidth
                                label="Name"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                margin="normal"
                                multiline
                                rows={3}
                            />
                            <TextField
                                fullWidth
                                label="Quantity"
                                name="quantity"
                                type="number"
                                value={formData.quantity}
                                onChange={handleChange}
                                margin="normal"
                                required
                                inputProps={{ min: 0 }}
                            />
                            <TextField
                                fullWidth
                                label="Location"
                                name="location"
                                value={formData.location}
                                onChange={handleChange}
                                margin="normal"
                                required
                            />
                            <Box sx={{ mt: 2 }}>
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={loading}
                                >
                                    {loading ? <CircularProgress size={24} /> : 'Generate QR Code'}
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography variant="h6" gutterBottom>
                            Generated QR Code
                        </Typography>
                        {qrValue ? (
                            <>
                                <Box sx={{ p: 2, bgcolor: 'white', borderRadius: 1, mb: 2 }}>
                                    <QRCodeSVG
                                        value={qrValue}
                                        size={256}
                                        level="H"
                                        includeMargin={true}
                                    />
                                </Box>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
                                    QR Code contains: Name, Description, Quantity, Location, and Timestamp
                                </Typography>
                                <Button
                                    variant="outlined"
                                    color="primary"
                                    onClick={() => navigate('/')}
                                >
                                    Back to Inventory
                                </Button>
                            </>
                        ) : (
                            <Typography color="text.secondary">
                                Fill out the form and click "Generate QR Code" to create a new QR code.
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default QRGenerator; 