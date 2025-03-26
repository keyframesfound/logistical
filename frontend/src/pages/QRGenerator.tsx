import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Paper,
    Grid,
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
    const [generatedQR, setGeneratedQR] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const newItem = await itemService.createItem({
                ...formData,
                quantity: parseInt(formData.quantity),
            });
            setGeneratedQR(newItem.qrCode);
        } catch (error) {
            console.error('Error creating item:', error);
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
                Generate QR Code
            </Typography>

            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3 }}>
                        <form onSubmit={handleSubmit}>
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
                                >
                                    Generate QR Code
                                </Button>
                            </Box>
                        </form>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Paper sx={{ p: 3, textAlign: 'center' }}>
                        {generatedQR ? (
                            <>
                                <QRCodeSVG value={generatedQR} size={256} />
                                <Box sx={{ mt: 2 }}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => navigate('/')}
                                    >
                                        Back to Inventory
                                    </Button>
                                </Box>
                            </>
                        ) : (
                            <Typography variant="body1" color="text.secondary">
                                Fill out the form to generate a QR code
                            </Typography>
                        )}
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default QRGenerator; 