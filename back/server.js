require("dotenv").config();
const express = require('express'); 
const app = express();
const morgan = require('morgan');
const cors = require("cors");
const passport = require('passport');
const routes = require('./src/routes/index');
const { sequelize } = require('./src/models/index'); 
const { authenticateToken } = require('./src/middlewares/auth');
require('./src/config/passport');

app.use(morgan('dev'));
app.use(express.json());
app.use(cors());

app.use(passport.initialize());

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

