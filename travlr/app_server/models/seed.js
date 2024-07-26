// Bring in the DB connection and the Trip schema
const mongoose = require('mongoose');

// Database connection settings
const dbURI = 'mongodb://127.0.0.1:27017/travlr';
const options = {
    serverSelectionTimeoutMS: 60000, // Increase this value to your desired timeout in milliseconds
};

mongoose.connect(dbURI, options)
    .then(() => console.log('Database connected successfully'))
    .catch((err) => console.log('Database connection error:', err));

const Trip = require('./travlr');

// Read seed data from json file
var fs = require('fs');
var trips = JSON.parse(fs.readFileSync('./app_server/data/trips.json','utf8'))

// delete any existing records, then insert seed data
const seedDB = async () => {
    await Trip.deleteMany({});
    await Trip.insertMany(trips);
};

// Close the MongoDB connection and exit
seedDB().then(async () => {
    await mongoose.connection.close();
    process.exit(0);
});