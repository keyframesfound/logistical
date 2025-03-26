const express = require('express');
const router = express.Router();
const itemController = require('../controllers/itemController');

// Get all items
router.get('/', itemController.getAllItems);

// Create new item
router.post('/', itemController.createItem);

// Get item by ID
router.get('/:id', itemController.getItemById);

// Update item
router.put('/:id', itemController.updateItem);

// Delete item
router.delete('/:id', itemController.deleteItem);

module.exports = router; 