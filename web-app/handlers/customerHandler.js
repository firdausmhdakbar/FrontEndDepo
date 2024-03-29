const axios = require('axios');


const apiUrl = 'http://dummy-api-url.com';

const jsonData = require('../data/customers.json');




module.exports = {
 
  getAllCustomers: async (req, res) => {
    try {
      // const response = await axios.get(`${apiUrl}/customers`);
      // res.json(response.data);
      // res.json(customers);
      const page = parseInt(req.query.page) || 1; 
      const itemsPerPage = parseInt(req.query.itemsPerPage) || 5; 
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedCustomers = jsonData.customers.slice(startIndex, endIndex);
    
      const currentPage = page; 
      const totalCustomers = jsonData.customers.length;
      const totalPages = Math.ceil(totalCustomers / itemsPerPage); 
    
      res.render('customers', { customers: paginatedCustomers, currentPage, totalPages, itemsPerPage }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  


  getCustomerById: async (req, res) => {
    const customerId = req.params.customerId;
    try {
      const response = await axios.get(`${apiUrl}/customers/${customerId}`);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },


  createCustomer: async (req, res) => {
    const newCustomerData = req.body;
    try {
      const response = await axios.post(`${apiUrl}/customers`, newCustomerData);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  updateCustomer: async (req, res) => {
    const customerId = req.params.customerId;
    const updatedCustomerData = req.body;
    try {
      const response = await axios.put(`${apiUrl}/customers/${customerId}`, updatedCustomerData);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  deleteCustomer: async (req, res) => {
    const customerId = req.params.customerId;
    try {
      await axios.delete(`${apiUrl}/customers/${customerId}`);
      res.json({ message: 'Customer deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },


};
