const mongoose = require('mongoose');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config()
const locationRoutes = require('./routes/locationRoutes');


const app = express();

app.use(cors());
app.use(express.json());
console.log(`checking for env variables: ${process.env.MONGO_URI} and ${process.env.PORT}`);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true})
  .then(() => console.log('MongoDB connected')) 
    .catch(err => console.error('MongoDB connection error:', err));


app.use('/api/locations', locationRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})