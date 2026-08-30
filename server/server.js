const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Connect to Database
connectDB();

const app = express();

// Middlewares
app.use(cors({
origin: '*',
credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
app.use(morgan('dev'));
}

// Server Root Endpoint
app.get('/', (req, res) => {
res.json({
success: true,
message: 'AL-MUFLIHON Backend API is running successfully 🚀',
api: '/api'
});
});

// Brand API Root Endpoint
app.get('/api', (req, res) => {
res.json({
brand: 'AL-MUFLIHON (المفلحون)',
tagline: 'Wear • Believe • Succeed',
version: '1.0.0',
status: 'Active',
endpoints: {
auth: '/api/auth',
products: '/api/products',
orders: '/api/orders',
users: '/api/users'
},
colorPalette: {
plum: '#601D49',
rose: '#EA9D9D',
cream: '#FDF4D2',
sage: '#8BBB92'
}
});
});

// Mount Routes
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/products', require('./routes/productRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/users', require('./routes/userRoutes'));

// Error Middlewares
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
console.log(
`✨ AL-MUFLIHON Server is running in ${
      process.env.NODE_ENV || 'development'
    } mode on port ${PORT}`
);
console.log(`🔗 API Base: http://localhost:${PORT}/api`);
});

module.exports = app;
