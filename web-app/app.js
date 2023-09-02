const express = require('express');
const app = express();
const port = 3000;

const customerRouter = require('./routes/customerRouter'); // Import router pelanggan
const orderRouter = require('./routes/orderRouter'); // Import router pesanan

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

// Rute default untuk mengarahkan ke halaman login
app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  // Di sini Anda dapat mengecek kredensial pengguna, melakukan otentikasi, dan sebagainya.
  // Setelah berhasil, Anda dapat mengarahkan pengguna ke halaman customer.ejs atau halaman lain.

  // Misalnya, jika otentikasi berhasil, arahkan ke halaman customer.ejs
  res.render('customers');
});
// Gunakan router pelanggan
app.use('/customers', customerRouter);

// Gunakan router pesanan
app.use('/orders', orderRouter);

app.use((req, res, next) => {
  res.status(404).render('error', {
      errorCode: 404,
      errorMessage: 'Halaman tidak ditemukan'
  });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


