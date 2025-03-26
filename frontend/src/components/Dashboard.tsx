import React from 'react';
import {
    Box,
    Container,
    Grid,
    Paper,
    Typography,
    useTheme,
    Card,
    CardContent,
    IconButton,
    Button,
} from '@mui/material';
import {
    LocalShipping as ShippingIcon,
    QrCode as QrCodeIcon,
    Inventory as InventoryIcon,
    Analytics as AnalyticsIcon,
    Add as AddIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const quickActions = [
        {
            icon: <ShippingIcon sx={{ fontSize: 40 }} />,
            title: 'Track Shipment',
            description: 'Track your shipments in real-time',
            action: () => navigate('/track'),
        },
        {
            icon: <QrCodeIcon sx={{ fontSize: 40 }} />,
            title: 'Scan QR',
            description: 'Scan QR codes for quick access',
            action: () => navigate('/scan'),
        },
        {
            icon: <InventoryIcon sx={{ fontSize: 40 }} />,
            title: 'Inventory',
            description: 'Manage your inventory',
            action: () => navigate('/inventory'),
        },
        {
            icon: <AnalyticsIcon sx={{ fontSize: 40 }} />,
            title: 'Analytics',
            description: 'View shipping analytics',
            action: () => navigate('/analytics'),
        },
    ];

    return (
        <Box sx={{ py: 4 }}>
            <Container>
                {/* Header Section */}
                <Box sx={{ mb: 4 }}>
                    <Typography variant="h4" gutterBottom>
                        Dashboard
                    </Typography>
                    <Typography variant="subtitle1" color="text.secondary">
                        Welcome back! Here's an overview of your logistics operations.
                    </Typography>
                </Box>

                {/* Quick Actions */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {quickActions.map((action, index) => (
                        <Grid item xs={12} sm={6} md={3} key={index}>
                            <Card
                                sx={{
                                    height: '100%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    transition: 'transform 0.2s',
                                    '&:hover': {
                                        transform: 'translateY(-4px)',
                                    },
                                }}
                            >
                                <CardContent>
                                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                                        <Box
                                            sx={{
                                                p: 1,
                                                borderRadius: 1,
                                                bgcolor: 'primary.main',
                                                color: 'white',
                                                mr: 2,
                                            }}
                                        >
                                            {action.icon}
                                        </Box>
                                        <Typography variant="h6">{action.title}</Typography>
                                    </Box>
                                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                                        {action.description}
                                    </Typography>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        fullWidth
                                        onClick={action.action}
                                    >
                                        Open
                                    </Button>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Recent Activity */}
                <Paper sx={{ p: 3, mb: 4 }}>
                    <Typography variant="h6" gutterBottom>
                        Recent Activity
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
                            No recent activity to display
                        </Typography>
                        <IconButton color="primary">
                            <AddIcon />
                        </IconButton>
                    </Box>
                </Paper>

                {/* Quick Stats */}
                <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Active Shipments
                            </Typography>
                            <Typography variant="h3" color="primary">
                                0
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Total Inventory
                            </Typography>
                            <Typography variant="h3" color="primary">
                                0
                            </Typography>
                        </Paper>
                    </Grid>
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Delivered Today
                            </Typography>
                            <Typography variant="h3" color="primary">
                                0
                            </Typography>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Dashboard; 