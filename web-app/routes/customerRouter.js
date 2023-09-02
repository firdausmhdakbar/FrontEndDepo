// routes/customerRouter.js
const express = require('express');
const router = express.Router();
const customerHandler = require('../handlers/customerHandler');


router.get('/', customerHandler.getAllCustomers);


router.get('/:customerId', customerHandler.getCustomerById);


router.post('/', customerHandler.createCustomer);


router.put('/:customerId', customerHandler.updateCustomer);

router.delete('/:customerId', customerHandler.deleteCustomer);

module.exports = router;
