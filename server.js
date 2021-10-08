//entry point back end
const express = require('express');
const connectDB = require('./config/db');
const app = express();

//Connect Database
connectDB();

// Init Middleware
// podesmos aceptar data
app.use(express.json({ extend : false}));


var cors = require('cors');
app.use(cors());

app.get('/', (req, res) =>
    //res.send('Hello world')
    res.json({ msg: 'welcome to postman nodejs intregration' })
);



//define routes
app.use('/api/users', require('./routes/users'));
app.use('/api/contacts', require('./routes/contacts'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));