const Item = require('../models/Item');
const QRCode = require('qrcode');

// Get all items
exports.getAllItems = async (req, res) => {
    try {
        const items = await Item.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Create new item
exports.createItem = async (req, res) => {
    try {
        const { name, description, quantity, location } = req.body;
        
        // Generate QR code
        const qrCode = await QRCode.toDataURL(JSON.stringify({
            name,
            description,
            quantity,
            location,
            timestamp: Date.now()
        }));

        const item = new Item({
            name,
            description,
            quantity,
            location,
            qrCode
        });

        const newItem = await item.save();
        res.status(201).json(newItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Get item by ID
exports.getItemById = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update item
exports.updateItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }

        const { name, description, quantity, location } = req.body;
        
        // Update fields
        item.name = name || item.name;
        item.description = description || item.description;
        item.quantity = quantity || item.quantity;
        item.location = location || item.location;

        // Generate new QR code if any field changed
        if (name || description || quantity || location) {
            item.qrCode = await QRCode.toDataURL(JSON.stringify({
                name: item.name,
                description: item.description,
                quantity: item.quantity,
                location: item.location,
                timestamp: Date.now()
            }));
        }

        const updatedItem = await item.save();
        res.json(updatedItem);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// Delete item
exports.deleteItem = async (req, res) => {
    try {
        const item = await Item.findById(req.params.id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        await item.remove();
        res.json({ message: 'Item deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 