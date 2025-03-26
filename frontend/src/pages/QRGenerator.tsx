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
    useTheme,
    Fade,
    IconButton,
    Tooltip,
    Divider,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { itemService } from '../services/api';
import {
    QrCode2 as QrCodeIcon,
    ContentCopy as CopyIcon,
    Download as DownloadIcon,
    ArrowBack as ArrowBackIcon,
} from '@mui/icons-material';

const QRGenerator: React.FC = () => {
    const theme = useTheme();
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
    const [copySuccess, setCopySuccess] = useState(false);

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
            setSavedItem({
                ...formData,
                quantity: parseInt(formData.quantity),
                _id: 'local-' + Date.now(),
            });
        } finally {
            setLoading(false);
        }
    };

    const handleCopyQR = async () => {
        if (qrValue) {
            try {
                await navigator.clipboard.writeText(qrValue);
                setCopySuccess(true);
                setTimeout(() => setCopySuccess(false), 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
        }
    };

    const handleDownloadQR = () => {
        const canvas = document.querySelector('canvas');
        if (canvas) {
            const pngUrl = canvas
                .toDataURL('image/png')
                .replace('image/png', 'image/octet-stream');
            const downloadLink = document.createElement('a');
            downloadLink.href = pngUrl;
            downloadLink.download = `qr-${formData.name.toLowerCase().replace(/\s+/g, '-')}.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    const qrValue = savedItem ? generateQRValue(savedItem) : null;

    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <IconButton 
                    onClick={() => navigate('/')}
                    sx={{ mr: 2, bgcolor: 'action.selected', '&:hover': { bgcolor: 'action.focus' } }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography variant="h4" component="h1">
                    Generate QR Code
                </Typography>
            </Box>

            <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                    <Fade in={true} timeout={800}>
                        <Paper 
                            elevation={3}
                            sx={{
                                p: 4,
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider',
                            }}
                        >
                            <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                                <QrCodeIcon sx={{ mr: 2, color: 'primary.main' }} />
                                <Typography variant="h6">Item Details</Typography>
                            </Box>
                            
                            <form onSubmit={handleSubmit}>
                                {error && (
                                    <Alert 
                                        severity="error" 
                                        sx={{ 
                                            mb: 3,
                                            borderRadius: 2,
                                            bgcolor: 'error.dark',
                                            color: 'white',
                                        }}
                                    >
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
                                    variant="outlined"
                                    sx={{
                                        '& .MuiOutlinedInput-root': {
                                            '&:hover fieldset': {
                                                borderColor: 'primary.main',
                                            },
                                        },
                                    }}
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
                                    variant="outlined"
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
                                    variant="outlined"
                                />
                                <TextField
                                    fullWidth
                                    label="Location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    margin="normal"
                                    required
                                    variant="outlined"
                                />
                                
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    fullWidth
                                    disabled={loading}
                                    sx={{
                                        mt: 3,
                                        py: 1.5,
                                        borderRadius: 2,
                                        textTransform: 'none',
                                        fontSize: '1.1rem',
                                        fontWeight: 500,
                                        boxShadow: theme.shadows[8],
                                        '&:hover': {
                                            boxShadow: theme.shadows[12],
                                        },
                                    }}
                                >
                                    {loading ? (
                                        <CircularProgress size={24} color="inherit" />
                                    ) : (
                                        'Generate QR Code'
                                    )}
                                </Button>
                            </form>
                        </Paper>
                    </Fade>
                </Grid>

                <Grid item xs={12} md={6}>
                    <Fade in={true} timeout={1000}>
                        <Paper 
                            elevation={3}
                            sx={{
                                p: 4,
                                borderRadius: 2,
                                bgcolor: 'background.paper',
                                border: '1px solid',
                                borderColor: 'divider',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                minHeight: 400,
                            }}
                        >
                            <Typography variant="h6" gutterBottom sx={{ mb: 3 }}>
                                Generated QR Code
                            </Typography>
                            
                            {qrValue ? (
                                <Fade in={true} timeout={500}>
                                    <Box sx={{ textAlign: 'center' }}>
                                        <Box 
                                            sx={{ 
                                                p: 3,
                                                bgcolor: 'white',
                                                borderRadius: 2,
                                                mb: 3,
                                                boxShadow: theme.shadows[4],
                                            }}
                                        >
                                            <QRCodeSVG
                                                value={qrValue}
                                                size={256}
                                                level="H"
                                                includeMargin={true}
                                            />
                                        </Box>
                                        
                                        <Typography 
                                            variant="body2" 
                                            color="text.secondary"
                                            sx={{ mb: 3 }}
                                        >
                                            QR Code contains: Name, Description, Quantity, Location, and Timestamp
                                        </Typography>
                                        
                                        <Divider sx={{ mb: 3 }} />
                                        
                                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                                            <Tooltip title={copySuccess ? "Copied!" : "Copy QR Data"}>
                                                <IconButton
                                                    onClick={handleCopyQR}
                                                    sx={{
                                                        bgcolor: 'action.selected',
                                                        '&:hover': { bgcolor: 'action.focus' },
                                                    }}
                                                >
                                                    <CopyIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Download QR Image">
                                                <IconButton
                                                    onClick={handleDownloadQR}
                                                    sx={{
                                                        bgcolor: 'action.selected',
                                                        '&:hover': { bgcolor: 'action.focus' },
                                                    }}
                                                >
                                                    <DownloadIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </Box>
                                </Fade>
                            ) : (
                                <Box 
                                    sx={{ 
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        height: '100%',
                                        opacity: 0.6,
                                    }}
                                >
                                    <QrCodeIcon sx={{ fontSize: 60, mb: 2, color: 'text.secondary' }} />
                                    <Typography color="text.secondary" align="center">
                                        Fill out the form and click "Generate QR Code"<br />
                                        to create a new QR code
                                    </Typography>
                                </Box>
                            )}
                        </Paper>
                    </Fade>
                </Grid>
            </Grid>
        </Container>
    );
};

export default QRGenerator; 