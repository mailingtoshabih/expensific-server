const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const expenseRoutes = require('./routes/expenseRoutes');
const userRoutes = require('./routes/userRoutes');

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());


mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to db..."))
    .catch((e) => console.log(e.message));


app.use('/expenses', expenseRoutes);
app.use('/users', userRoutes);


app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});