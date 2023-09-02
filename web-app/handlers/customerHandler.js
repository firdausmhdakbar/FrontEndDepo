const axios = require('axios');

// URL API Dummy (gantilah dengan URL sesungguhnya)
const apiUrl = 'http://dummy-api-url.com';

const jsonData = require('../data/customers.json');

// Handler untuk mendapatkan daftar pelanggan dengan paginasi



module.exports = {
  // Handler untuk mendapatkan daftar pelanggan
  getAllCustomers: async (req, res) => {
    try {
      // const response = await axios.get(`${apiUrl}/customers`);
      // res.json(response.data);
      // res.json(customers);
      const page = parseInt(req.query.page) || 1; // Mendapatkan halaman dari query
      const itemsPerPage = parseInt(req.query.itemsPerPage) || 5; // Jumlah item per halaman (dengan nilai default 10)
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedCustomers = jsonData.customers.slice(startIndex, endIndex);
    
      const currentPage = page; // Menyimpan currentPage di dalam variabel
      const totalCustomers = jsonData.customers.length;
      const totalPages = Math.ceil(totalCustomers / itemsPerPage); // Menghitung total halaman
    
      res.render('customers', { customers: paginatedCustomers, currentPage, totalPages, itemsPerPage }); // Mengirim currentPage, totalPages, dan itemsPerPage ke tampilan
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },
  

  // Handler untuk mendapatkan detail pelanggan
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

  // Handler untuk menambah pelanggan baru
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

  // Handler untuk mengupdate pelanggan
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

  // Handler untuk menghapus pelanggan
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

  // Anda dapat mengimplementasikan handler untuk pesanan dengan cara yang serupa
};
