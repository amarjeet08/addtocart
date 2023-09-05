const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Razorpay = require('razorpay');

const app = express();
app.use(express.json());
app.use(cors());

const razorpay = new Razorpay({
    key_id: 'rzp_test_9selXw6bGldk59',
    key_secret: '6WHOQ7qarNiWiqBDhDEVKbBw'
});

let foodItemsCollection;
let foodCategoryCollection;

const mongoDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/login1', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('Connected to MongoDB');

        foodItemsCollection = mongoose.connection.db.collection("foot_items");
        const data = await foodItemsCollection.find({}).toArray();

        foodCategoryCollection = mongoose.connection.db.collection("food_category");
        const data1 = await foodCategoryCollection.find({}).toArray();

        app.get('/foodData', (req, res) => {
            res.send(data);
        });
    } catch (err) {
        console.log(err);
    }
};

mongoDB();

app.post('/create-order', async (req, res) => {
    const options = {
        amount: req.body.amount,
        currency: 'INR',
        receipt: 'YOUR_RECEIPT_ID'
    };

    try {
        const order = await razorpay.orders.create(options);
        res.json(order);
    } catch (error) {
        res.status(500).json({ message: 'Error creating order' });
    }
});

app.listen(3001, () => console.log('App listening on port 3001'));
