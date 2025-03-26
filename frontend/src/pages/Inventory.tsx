import React, { useEffect, useState } from 'react';
import {
    Container,
    Typography,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    Button,
    Box,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { Item } from '../types/Item';
import { itemService } from '../services/api';

const Inventory: React.FC = () => {
    const [items, setItems] = useState<Item[]>([]);
    const navigate = useNavigate();

    useEffect(() => {
        loadItems();
    }, []);

    const loadItems = async () => {
        try {
            const data = await itemService.getAllItems();
            setItems(data);
        } catch (error) {
            console.error('Error loading items:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            try {
                await itemService.deleteItem(id);
                loadItems();
            } catch (error) {
                console.error('Error deleting item:', error);
            }
        }
    };

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4" component="h1">
                    Inventory
                </Typography>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => navigate('/generate')}
                >
                    Add New Item
                </Button>
            </Box>

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell>Quantity</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {items.map((item) => (
                            <TableRow key={item._id}>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.description}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.location}</TableCell>
                                <TableCell>
                                    <IconButton
                                        color="primary"
                                        onClick={() => navigate(`/edit/${item._id}`)}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        color="error"
                                        onClick={() => handleDelete(item._id)}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
};

export default Inventory; 