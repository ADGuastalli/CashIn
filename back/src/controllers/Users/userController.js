const { User, Country, City, MaritalStatus, Dwelling, Data, Child} = require('../../models/index');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const postUser = async (req, res) => {
    const { email, password } = req.body;

    // Validar que todos los datos necesarios estén presentes
    if (!email || !password ) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try {

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = await User.create({
            email,
            password: hashedPassword,
        });

        const jwtSecret = process.env.JWT_SECRET;

        const token = jwt.sign({ userId: newUser.id }, jwtSecret, { expiresIn: '24h' });

        // Enviar la respuesta con el usuario y el token
        res.status(201).json({
            id: newUser.user_id,
            email: newUser.email,
            token, // Enviar el token al usuario
        });

    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(400).json({ error: 'Error al crear el usuario' });
    }
};

const completeUserProfile = async (req, res) => {
    const { userId } = req.params;
    const { country_id, city_id, last_name, user_name, birthdate, marital_status_id, dwelling_id, child } = req.body;

    if (!country_id || !city_id || !last_name || !user_name || !birthdate || !marital_status_id || !dwelling_id) {
        return res.status(400).json({ error: 'Faltan datos requeridos para completar el perfil' });
    }

    try {
        // Encuentra el usuario junto con su perfil de datos
        const user = await User.findByPk(userId, {
            include: { model: Data }
        });

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        const maritalStatus = await MaritalStatus.findByPk(marital_status_id);
        const dwelling = await Dwelling.findByPk(dwelling_id);

        if (!maritalStatus) {
            return res.status(404).json({ error: 'Estado civil no encontrado' });
        }

        if (!dwelling) {
            return res.status(404).json({ error: 'Tipo de vivienda no encontrado' });
        }

        user.country_id = country_id;
        user.city_id = city_id;
        user.last_name = last_name;
        user.user_name = user_name;
        user.birthdate = birthdate;

        if (user.Data) {
            // Si ya existe el perfil de datos, lo actualiza
            user.Data.marital_status_id = marital_status_id;
            user.Data.dwelling_id = dwelling_id;
            await user.Data.save();
        } else {
            // Si no existe, crea uno nuevo
            const newData = await Data.create({
                user_id: userId,  // Usa 'user_id' como la clave foránea
                marital_status_id,
                dwelling_id
            });
            user.Data = newData;
        }

        // Manejo del modelo Child
        if (child && child > 0) {
            // Si se recibe un número positivo para 'child', lo crea
            await Child.create({
                child: child
            });
        } else if (user.Child) {
            // Si 'child' es 0 o no se recibe y existe un registro de Child, lo elimina
            await user.Child.destroy();
        }

        await user.save();

        res.status(200).json({
            message: 'Perfil completado exitosamente',
            user: {
                id: user.user_id,
                email: user.email,
                country_id: user.country_id,
                city_id: user.city_id,
                last_name: user.last_name,
                user_name: user.user_name,
                birthdate: user.birthdate,
                marital_status_id: user.Data.marital_status_id,
                marital_status: maritalStatus.marital_status,
                dwelling_id: user.Data.dwelling_id,
                dwelling: dwelling.dwelling,
                child: child > 0 ? child : null, // Se envía el valor de child si es mayor a 0
            },
        });

    } catch (error) {
        console.error('Error al completar el perfil del usuario:', error);
        res.status(500).json({ error: 'Error al completar el perfil del usuario' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
  
    // Verificar que los datos necesarios estén presentes
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }
  
    try {
      // Buscar el usuario por el email
      const user = await User.findOne({ where: { email } });
  
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
  
      // Comparar la contraseña ingresada con el hash almacenado
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (!isMatch) {
        return res.status(401).json({ error: 'Contraseña incorrecta' });
      }
  
      // Generar un token JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });
  
      // Enviar la respuesta con el token
      res.status(200).json({
        id: user.user_id,
        user_name: user.user_name,
        email: user.email,
        token, // Enviar el token al usuario
      });
  
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      res.status(500).json({ error: 'Error al iniciar sesión' });
    }
  };


const completeFormUser = async (req, res) => {
    const { country, city, birthdate, last_name, user_name, email, password } = req.body;

    // Validar que todos los datos necesarios estén presentes
    if (!country || !city || !birthdate || !last_name || !user_name || !email || !password ) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try {

        // Buscar el country_id basado en el nombre del país
        const countryRecord = await Country.findOne({ where: { country: country } });

        if (!countryRecord) {
            return res.status(404).json({ error: 'País no encontrado' });
        }

        const country_id = countryRecord.country_id;

        // Buscar city_id basado en el nombre city

        const cityRecord = await City.findOne({ where: { city: city }})

        if(!cityRecord) {
            return res.status(404).json({ error: 'Ciudad no encontrada' });
        }

        const city_id = cityRecord.city_id

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = await User.create({
            country_id,
            city_id, 
            last_name,
            user_name,
            birthdate,
            email,
            password: hashedPassword,
        });

        const jwtSecret = process.env.JWT_SECRET;

        const token = jwt.sign({ userId: newUser.id }, jwtSecret, { expiresIn: '24h' });

        // Enviar la respuesta con el usuario y el token
        res.status(201).json({
            id: newUser.id,
            country_id: newUser.country_id,
            city_id: newUser.city_id,
            birthdate: newUser.birthdate,
            last_name: newUser.last_name,
            user_name: newUser.user_name,
            email: newUser.email,
            token, // Enviar el token al usuario
        });

    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(400).json({ error: 'Error al crear el usuario' });
    }
};


const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.status(200).json(users);
    } catch (error) {
        console.error('Error al obtener los usuarios:', error);
        res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
};

const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        res.status(200).json(user);
    } catch (error) {
        console.error('Error al obtener el usuario:', error);
        res.status(500).json({ error: 'Error al obtener el usuario' });
    }
};

const updateUser = async (req, res) => {
    const { id } = req.params;
    const { country_id, city_id, birthdate, last_name, user_name, email, password } = req.body;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        if (password) {
            const hashedPassword = await bcrypt.hash(password, 10);
            user.password = hashedPassword;
        }

        user.country_id = country_id || user.country_id;
        user.city_id = city_id || user.city_id;
        user.birthdate = birthdate || user.birthdate;
        user.last_name = last_name || user.last_name;
        user.user_name = user_name || user.user_name;
        user.email = email || user.email;

        await user.save();

        res.status(200).json({
            id: user.id,
            country_id: user.country_id,
            city_id: user.city_id,
            birthdate: user.birthdate,
            last_name: user.last_name,
            user_name: user.user_name,
            email: user.email,
        });
    } catch (error) {
        console.error('Error al actualizar el usuario:', error);
        res.status(500).json({ error: 'Error al actualizar el usuario' });
    }
};

const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        await user.destroy();
        res.status(200).json({ message: 'Usuario eliminado correctamente' });
    } catch (error) {
        console.error('Error al eliminar el usuario:', error);
        res.status(500).json({ error: 'Error al eliminar el usuario' });
    }
};

module.exports = {
    postUser,
    loginUser,
    completeUserProfile,
    getAllUsers,
    getUserById,
    deleteUser
};