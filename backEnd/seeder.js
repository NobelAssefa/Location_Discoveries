const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const Location = require('./models/locationModel');
dotenv.config();

const app = express();
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB Connected for Seeding.'))
.catch(err => console.error('MongoDB Connection Error:', err));


const sampleLocations = [
    {
        name: 'Central Park',
        description: 'A beautiful urban park, perfect for a walk.',
        category: 'park',
        location: {
            type: 'Point',
            coordinates: [-73.9654, 40.7829], // [lng, lat]
        },
    },
    {
        name: 'The Met Cloisters',
        description: 'Museum specializing in European medieval art and architecture.',
        category: 'hidden-gem',
        location: {
            type: 'Point',
            coordinates: [-73.9673, 40.8650],
        },
    },
    {
        name: 'Shakespeare & Co. Booksellers',
        description: 'A cozy independent bookstore with a great selection.',
        category: 'bookstore',
        location: {
            type: 'Point',
            coordinates: [-73.9578, 40.7836],
        },
    },
    {
        name: 'Joe\'s Pizza - Broadway',
        description: 'Classic New York slice, famous for its quality.',
        category: 'cafe', // Using 'cafe' as a stand-in for a food spot
        location: {
            type: 'Point',
            coordinates: [-73.9818, 40.7578],
        },
    },
    {
        name: 'Riverside Park',
        description: 'A scenic waterfront park on the Hudson River.',
        category: 'park',
        location: {
            type: 'Point',
            coordinates: [-73.9855, 40.7960],
        }
    }
];


// Function to import data
const importData = async () => {
    try {
        await Location.deleteMany(); // Clear existing locations
        await Location.insertMany(sampleLocations);
        console.log('Data Imported Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error importing data:', error);
        process.exit(1);
    }
};


// Function to destroy data
const destroyData = async () => {
    try {
        await Location.deleteMany();
        console.log('Data Destroyed Successfully!');
        process.exit();
    } catch (error) {
        console.error('Error destroying data:', error);
        process.exit(1);
    }
};


// Command-line arguments logic
if (process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    destroyData();
} else {
    console.log("Please use '-i' to import data or '-d' to destroy data.");
    process.exit();
}