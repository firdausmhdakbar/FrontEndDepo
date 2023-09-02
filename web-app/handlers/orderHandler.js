const axios = require('axios');

// URL API Dummy (gantilah dengan URL sesungguhnya)
const apiUrl = 'http://dummy-api-url.com';

const jsonData = require('../data/orders.json');

module.exports = {
  // Handler untuk mendapatkan daftar pelanggan
  getAllOrders: async (req, res) => {
    try {
      // const response = await axios.get(`${apiUrl}/orders`);
      // res.json(response.data);
      const page = parseInt(req.query.page) || 1; // Mendapatkan halaman dari query
      const itemsPerPage = parseInt(req.query.itemsPerPage) || 5; // Jumlah item per halaman (dengan nilai default 10)
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedOrders = jsonData.orders.slice(startIndex, endIndex);
    
      const currentPage = page; // Menyimpan currentPage di dalam variabel
      const totalOrders = jsonData.orders.length;
      const totalPages = Math.ceil(totalOrders / itemsPerPage); // Menghitung total halaman
    
      res.render('orders', { orders: paginatedOrders, currentPage, totalPages, itemsPerPage }); // Mengirim currentPage, totalPages, dan itemsPerPage ke tampilan
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Handler untuk mendapatkan detail pelanggan
  getOrderById: async (req, res) => {
    const orderId = req.params.orderId;
    try {
      const response = await axios.get(`${apiUrl}/orders/${orderId}`);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Handler untuk menambah pelanggan baru
  createOrder: async (req, res) => {
    const newOrderData = req.body;
    try {
      const response = await axios.post(`${apiUrl}/orders`, newOrderData);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Handler untuk mengupdate pelanggan
  updateOrder: async (req, res) => {
    const orderId = req.params.orderId;
    const updatedorderData = req.body;
    try {
      const response = await axios.put(`${apiUrl}/orders/${orderId}`, updatedOrderData);
      res.json(response.data);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Handler untuk menghapus pelanggan
  deleteOrder: async (req, res) => {
    const orderId = req.params.orderId;
    try {
      await axios.delete(`${apiUrl}/orders/${orderId}`);
      res.json({ message: 'order deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

  // Anda dapat mengimplementasikan handler untuk pesanan dengan cara yang serupa
};
