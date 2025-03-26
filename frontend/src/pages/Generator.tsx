import React, { useState } from 'react';
import {
    Container,
    Paper,
    Typography,
    TextField,
    Button,
    Box,
    Alert,
    CircularProgress,
    Fade,
    IconButton,
    Tooltip,
} from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import {
    ContentCopy as CopyIcon,
    Download as DownloadIcon,
} from '@mui/icons-material';

interface FormData {
    name: string;
    quantity: string;
    location: string;
}

const Generator = () => {
    const [formData, setFormData] = useState<FormData>({
        name: '',
        quantity: '',
        location: '',
    });
    const [qrGenerated, setQrGenerated] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [copySuccess, setCopySuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        setError(null);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.quantity || !formData.location) {
            setError('Please fill in all required fields');
            return;
        }
        
        setLoading(true);
        setTimeout(() => {
            setQrGenerated(true);
            setLoading(false);
        }, 500);
    };

    const qrValue = qrGenerated ? JSON.stringify({
        ...formData,
        quantity: parseInt(formData.quantity),
        timestamp: new Date().toISOString(),
    }) : '';

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(qrValue);
            setCopySuccess(true);
            setTimeout(() => setCopySuccess(false), 2000);
        } catch (err) {
            setError('Failed to copy to clipboard');
        }
    };

    const handleDownload = () => {
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
                    Generate QR Code
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

                <form onSubmit={handleSubmit}>
                    <TextField
                        fullWidth
                        label="Item Name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        margin="normal"
                        required
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
                        inputProps={{ min: 1 }}
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
                        fullWidth
                        disabled={loading}
                        sx={{ 
                            mt: 3,
                            mb: 2,
                            py: 1.5,
                            borderRadius: 2,
                        }}
                    >
                        {loading ? <CircularProgress size={24} /> : 'Generate QR Code'}
                    </Button>
                </form>

                {qrGenerated && (
                    <Fade in timeout={500}>
                        <Box sx={{ mt: 4, textAlign: 'center' }}>
                            <Paper 
                                elevation={0}
                                sx={{ 
                                    display: 'inline-block',
                                    p: 3,
                                    bgcolor: 'white',
                                    borderRadius: 2,
                                }}
                            >
                                <QRCodeSVG
                                    value={qrValue}
                                    size={200}
                                    level="H"
                                    includeMargin
                                />
                            </Paper>

                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center', gap: 1 }}>
                                <Tooltip title={copySuccess ? "Copied!" : "Copy Data"}>
                                    <IconButton onClick={handleCopy}>
                                        <CopyIcon />
                                    </IconButton>
                                </Tooltip>
                                <Tooltip title="Download QR Code">
                                    <IconButton onClick={handleDownload}>
                                        <DownloadIcon />
                                    </IconButton>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Fade>
                )}
            </Paper>
        </Container>
    );
};

export default Generator; 