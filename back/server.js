require("dotenv").config();
const express = require('express'); 
const app = express();
const morgan = require('morgan');
const { sequelize } = require('./src/models/index'); 
const routes = require('./src/routes/index');

app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use('/', routes)

sequelize.sync({ force: false }).then(() => {
    console.log("Tablas sincronizadas");
}).catch((error) => {
    console.error("Error al sincronizar tablas:", error);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});

