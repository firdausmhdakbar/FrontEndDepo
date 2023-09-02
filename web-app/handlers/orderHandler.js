const axios = require('axios');


const apiUrl = 'http://dummy-api-url.com';

const jsonData = require('../data/orders.json');

module.exports = {
 
  getAllOrders: async (req, res) => {
    try {
      // const response = await axios.get(`${apiUrl}/orders`);
      // res.json(response.data);
      const page = parseInt(req.query.page) || 1; 
      const itemsPerPage = parseInt(req.query.itemsPerPage) || 5; 
      const startIndex = (page - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      const paginatedOrders = jsonData.orders.slice(startIndex, endIndex);
    
      const currentPage = page; 
      const totalOrders = jsonData.orders.length;
      const totalPages = Math.ceil(totalOrders / itemsPerPage); 
      res.render('orders', { orders: paginatedOrders, currentPage, totalPages, itemsPerPage }); 
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  },

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

};
