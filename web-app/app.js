const express = require('express');
const app = express();
const port = 3000;

const customerRouter = require('./routes/customerRouter'); 
const orderRouter = require('./routes/orderRouter'); 

app.use(express.static('public'));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.redirect('/login');
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {

  res.render('customers');
});

app.use('/customers', customerRouter);


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


