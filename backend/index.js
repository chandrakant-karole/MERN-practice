const express = require('express')
require('./db/config')
const User = require('./db/users')
const Product = require('./db/products')
const cors = require('cors')

const app = express()
app.use(express.json())
app.use(cors())

// ========================= User =================================

app.post('/register', async (req, res) => {
    const userData = await new User(req.body)
    let result = await userData.save()
    result = result.toObject();
    delete result.password
    res.send(result)
})

app.post('/login', async (req, res) => {
    if (req.body.email && req.body.password) {
        let user = await User.findOne(req.body).select("-password")
        if (user) {
            res.send(user)
        } else {
            res.send('Enter Correct Details')
        }
    } else {
        res.send('Please send both email and password')
    }
})

// ========================= Products =================================

app.post('/add-product', async (req, res) => {
    const data = await new Product(req.body);
    const result = await data.save()
    res.send(result)
})

// ========================= Get Products =================================

app.get('/product-list', async (req, res) => {
    const data = await Product.find();
    if (data.length > 0) {
        res.send(data)
    } else {
        res.send({ result: "No Data Found" })
    }
})

// ========================= Delete Products =================================

app.delete('/delete/:id', async (req, res) => {
    const data = await Product.deleteOne({ _id: req.params.id })
    res.send(data)
})

// ========================= Single Products =================================

app.get('/product/:id', async (req, res) => {
    try {
        const data = await Product.findOne({ _id: req.params.id })
        res.send(data)
    } catch (error) {
        res.send({ result: "details not found" })
    }
})

// ========================= Update Single Products =================================

app.put('/product/:id', async (req, res) => {
    const data = await Product.updateOne({ _id: req.params.id }, { $set: req.body })
    res.send(data)
})

app.listen(8000)