// routes/customerRouter.js
const express = require('express');
const router = express.Router();
const customerHandler = require('../handlers/customerHandler');

// Rute API untuk mendapatkan daftar pelanggan
router.get('/', customerHandler.getAllCustomers);

// Rute API untuk mendapatkan detail pelanggan
router.get('/:customerId', customerHandler.getCustomerById);

// Rute API untuk menambah pelanggan baru
router.post('/', customerHandler.createCustomer);

// Rute API untuk mengupdate pelanggan
router.put('/:customerId', customerHandler.updateCustomer);

// Rute API untuk menghapus pelanggan
router.delete('/:customerId', customerHandler.deleteCustomer);

module.exports = router;
