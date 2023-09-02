// routes/orderRouter.js
const express = require('express');
const router = express.Router();
const orderHandler = require('../handlers/orderHandler');


router.get('/', orderHandler.getAllOrders);


router.get('/:orderId', orderHandler.getOrderById);


router.post('/', orderHandler.createOrder);

router.put('/:orderId', orderHandler.updateOrder);


router.delete('/:orderId', orderHandler.deleteOrder);

module.exports = router;
