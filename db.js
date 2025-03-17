const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL

//const mongoURL = process.env.MONGODB_URL_LOCAL 
const mongoURL = process.env.MONGODB_URL;

// Set up MongoDB connection
// अगर हम useNewUrlParser: true नहीं देते
// पुराने वर्जन के MongoDB ड्राइवर के साथ URL पार्सिंग में एरर आ सकती है।
// यह हमें Deprecation Warning देगा और भविष्य में यह बंद भी हो सकता है।


// अगर हम useUnifiedTopology: true नहीं देते
// हमारा कनेक्शन अनस्टेबल हो सकता है।
// कभी-कभी MongoDB से कनेक्शन टूट सकता है, जिससे हमारा एप्लिकेशन अचानक बंद हो सकता है।
mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

// Get the default connection
//Mongoose maintains a default connection object representing the MongoDB connection
const db = mongoose.connection;


// Define event listeners for database connection
db.on('connected', () => {
    console.log('Connected to MongoDB server!');

})

// Error
db.on('error', (err) => {
    console.log('MongoDB connection error', err);

})

// Disconnection
db.on('disconnected', () => {
    console.log('MongoDB disconnected');

})

// Export the database connection
module.exports = db;