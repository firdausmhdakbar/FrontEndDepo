// routes/orderRouter.js
const express = require('express');
const router = express.Router();
const orderHandler = require('../handlers/orderHandler');

// Rute API untuk mendapatkan daftar pesanan
router.get('/', orderHandler.getAllOrders);

// Rute API untuk mendapatkan detail pesanan
router.get('/:orderId', orderHandler.getOrderById);

// Rute API untuk menambah pesanan baru
router.post('/', orderHandler.createOrder);

// Rute API untuk mengupdate pesanan
router.put('/:orderId', orderHandler.updateOrder);

// Rute API untuk menghapus pesanan
router.delete('/:orderId', orderHandler.deleteOrder);

module.exports = router;
