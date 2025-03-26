import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar: React.FC = () => {
    return (
        <AppBar position="static">
            <Toolbar>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    Logistical
                </Typography>
                <Box>
                    <Button color="inherit" component={RouterLink} to="/">
                        Inventory
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/scan">
                        Scan QR
                    </Button>
                    <Button color="inherit" component={RouterLink} to="/generate">
                        Generate QR
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar; 