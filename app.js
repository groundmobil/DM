const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // Parse form data

// Replace with your MongoDB connection details
const mongoURI = "mongodb+srv://connectstuti:DiggajDatabase@cluster0.zhkvyeb.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// Create your schema
const customerSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    MobileNumber: {
        type: Number, 
        required: true,
        unique: true
    },
    City: {
        type: String,
        required: true,
        enum: ['Ahmedabad', 'Amravati', 'Anand', 'Aurangabad', 'Bengaluru', 'Bharuch', 'Bhavnagar', 'Chennai', 'Delhi', 'Gandhinagar', 'Hyderabad', 'Jaipur', 'Jamnagar', 'Junagadh', 'Kolhapur', 'Kolkata', 'Lucknow', 'Mumbai', 'Nagpur', 'Nashik', 'Noida', 'Pune', 'Rajkot', 'Solapur', 'Surat', 'Thane', 'Vadodra']
    },
    Interest: {
        type: String,
        required: true,
        enum: ['Product Enquiry', 'Investment', 'EV Reporter', 'Career']
    }
}, {
    timestamps: true
});

const Customers = mongoose.model('Customer', customerSchema);

app.post('/submit-form', async (req, res) => {
  try {
    const formData = req.body; // Access form data from request body

    // Validate and sanitize data here (recommended)

    // Create a new user document
    const newUser = new User(formData);

    // Save the user document
    await newUser.save();

    res.json({ message: 'Form submitted successfully!' });
  } catch (error) {
    console.error('Error sending data:', error);
    res.status(500).json({ error: 'Failed to submit form' });
  }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

module.exports = Customers;
