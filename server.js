const express = require('express');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const cors = require('cors');
const helmet = require('helmet');
const MongoStore = require('connect-mongo');
const dotenv = require('dotenv');
const dbConnect = require('./config/db');
require('./config/passport'); // Initialize passport configuration

dotenv.config();

const app = express();

// Database Connection
dbConnect();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  })
);
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'secret',
    resave: false,
    saveUninitialized: false,
    rolling: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI || 'mongodb://localhost:27017/Orhan',
    }),
    cookie: {
      maxAge: 1000 * 60 * 60 * 24, // 1 day
      secure: process.env.NODE_ENV === 'production',
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Routes
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const sessionRoutes = require('./routes/sessionRoutes');

app.use('/auth', authRoutes);
// app.use('/admin', adminRoutes);
app.use('/session', sessionRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
