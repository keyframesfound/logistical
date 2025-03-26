import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    useTheme,
    useMediaQuery,
    IconButton,
    Menu,
    MenuItem,
} from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import {
    QrCode2 as QrCodeIcon,
    Inventory as InventoryIcon,
    QrCodeScanner as ScannerIcon,
    Menu as MenuIcon,
} from '@mui/icons-material';

const Navbar = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const location = useLocation();
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const navItems = [
        { path: '/inventory', label: 'Inventory', icon: <InventoryIcon /> },
        { path: '/scan', label: 'Scan QR', icon: <ScannerIcon /> },
        { path: '/generate', label: 'Generate QR', icon: <QrCodeIcon /> },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'background.paper', borderBottom: 1, borderColor: 'divider' }}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            textDecoration: 'none',
                            color: 'primary.main',
                            fontWeight: 700,
                            letterSpacing: 1,
                            display: 'flex',
                            alignItems: 'center',
                        }}
                    >
                        <QrCodeIcon sx={{ mr: 1 }} />
                        Logistical
                    </Typography>

                    {isMobile ? (
                        <>
                            <Box sx={{ flexGrow: 1 }} />
                            <IconButton
                                color="inherit"
                                onClick={handleMenuOpen}
                                sx={{ ml: 1 }}
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={handleMenuClose}
                                sx={{
                                    '& .MuiPaper-root': {
                                        bgcolor: 'background.paper',
                                        borderRadius: 2,
                                        mt: 1,
                                    },
                                }}
                            >
                                {navItems.map((item) => (
                                    <MenuItem
                                        key={item.path}
                                        component={Link}
                                        to={item.path}
                                        onClick={handleMenuClose}
                                        selected={isActive(item.path)}
                                        sx={{
                                            color: isActive(item.path) ? 'primary.main' : 'text.primary',
                                            gap: 1,
                                        }}
                                    >
                                        {item.icon}
                                        {item.label}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </>
                    ) : (
                        <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                            {navItems.map((item) => (
                                <Button
                                    key={item.path}
                                    component={Link}
                                    to={item.path}
                                    color={isActive(item.path) ? 'primary' : 'inherit'}
                                    sx={{
                                        px: 2,
                                        py: 1,
                                        borderRadius: 2,
                                        bgcolor: isActive(item.path) ? 'action.selected' : 'transparent',
                                        '&:hover': {
                                            bgcolor: isActive(item.path) ? 'action.selected' : 'action.hover',
                                        },
                                    }}
                                    startIcon={item.icon}
                                >
                                    {item.label}
                                </Button>
                            ))}
                        </Box>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Navbar; 