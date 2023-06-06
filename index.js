const express = require("express");
const faker = require('faker');
const routerApi = require('./routes');
const cors = require('cors');
const { errorHandler, logErrors, boomError } = require('./middleware/error.handler');
const connectDB = require("./db/db");

const app = express()
const port = 3000;

app.use(express.json());
connectDB();
const whitelist = ['http://localhost:3000'];
const options = {
    origin: (origin, callback) => {
        if(whitelist.includes(origin) || !origin) {
            callback(null, true);
        } else {
            callback(new Error('No Permitido'));
        }
    }
};
app.use(cors(options));

app.get('/', (req, res) => {
    res.send('Hola mi server en express')
});

app.get('/nueva-ruta', (req, res) => {
    res.send('Hola, soy una nueva ruta')
});

routerApi(app);
app.use(logErrors);
app.use(boomError);
app.use(errorHandler);

app.listen(port, () => {
    console.log('Ya estoy corriendo por el puerto ', port);
});