const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path'); 

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI).
then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Import routes
const { router: authRoutes } = require('./routes/auth');
const webtoonRoutes = require('./routes/webtoons');
const popularRoutes = require('./routes/popular');
const favouritesRouter = require('./routes/favourite');

// Use routes
app.use('/api', authRoutes);
app.use('/api', webtoonRoutes);
app.use('/api', popularRoutes);
app.use('/api/favourites', favouritesRouter)

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
