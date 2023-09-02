const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())




let foodItemsCollection;
let foodCategoryCollection;

const mongoDB = async () => {
    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/login1', {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('Connected to MongoDB')

        foodItemsCollection = mongoose.connection.db.collection("foot_items");
        const data = await foodItemsCollection.find({}).toArray()
        // console.log('Data from food_items collection:', data)

        foodCategoryCollection = mongoose.connection.db.collection("food_category");
        const data1 = await foodCategoryCollection.find({}).toArray()
        // console.log('Data from food_category collection:', data1)

        app.get('/foodData', (req, res) => {
            res.send(data)
        })

    }
    catch (err) {
        console.log(err)
    }
}

mongoDB()



app.listen(3001, () => console.log('App listening on port 3001'))