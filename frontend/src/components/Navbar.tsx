import React from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    useTheme,
    useMediaQuery,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Navbar: React.FC = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const menuItems = [
        { text: 'Home', path: '/' },
        { text: 'Dashboard', path: '/dashboard' },
        { text: 'About', path: '/about' },
        { text: 'Contact', path: '/contact' },
    ];

    const drawer = (
        <List>
            {menuItems.map((item) => (
                <ListItem
                    button
                    key={item.text}
                    onClick={() => {
                        navigate(item.path);
                        setMobileOpen(false);
                    }}
                >
                    <ListItemText primary={item.text} />
                </ListItem>
            ))}
        </List>
    );

    return (
        <AppBar position="sticky" elevation={0}>
            <Toolbar>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, cursor: 'pointer' }}
                    onClick={() => navigate('/')}
                >
                    Logistical
                </Typography>

                {isMobile ? (
                    <>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            edge="start"
                            onClick={handleDrawerToggle}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Drawer
                            variant="temporary"
                            anchor="right"
                            open={mobileOpen}
                            onClose={handleDrawerToggle}
                            ModalProps={{
                                keepMounted: true, // Better open performance on mobile.
                            }}
                        >
                            {drawer}
                        </Drawer>
                    </>
                ) : (
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        {menuItems.map((item) => (
                            <Button
                                key={item.text}
                                color="inherit"
                                onClick={() => navigate(item.path)}
                                sx={{
                                    '&:hover': {
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                                    },
                                }}
                            >
                                {item.text}
                            </Button>
                        ))}
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={() => navigate('/login')}
                            sx={{ ml: 2 }}
                        >
                            Login
                        </Button>
                    </Box>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Navbar; 