const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
    origin: '*',
};
const corsOptions = {
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
};

app.use(corsOption());
app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoDBURI = "mongodb+srv://connectstuti:DiggajDatabase@cluster0.zhkvyeb.mongodb.net/DiggajMotors";
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

mongoose.connect(mongoDBURI, options)
    .then(() => {
        console.log('MongoDB connection successful');
        app.listen(PORT, () => {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
    })
    .catch((error) => {
        console.error('MongoDB connection failed:', error);
    });

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

app.post('https://www.diggajmotors.com/submit-form', async (req, res) => {
    const formData = req.body;
    try {
        console.log('Received form data:', formData);

        const savedForm = await Customers.create(formData);
        console.log('Saved form:', savedForm);

        res.json({ success: true, message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error during form submission:', error);
        res.status(500).json({ success: false, error: 'Internal Server Error' });
    }
});

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

module.exports = Customers;
