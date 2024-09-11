const { User } = require('../../models/index');
const bcrypt = require('bcrypt');

const postUser = async (req, res) => {
    const { country_id, city_id, birthdate, last_name, user_name, email, password } = req.body;

    if (!country_id || !city_id || !last_name || !user_name || !email || !password) {
        return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            country_id,
            city_id,
            birthdate,
            last_name,
            user_name,
            email,
            password: hashedPassword,
        });

        res.status(201).json({
            id: newUser.id,
            country_id: newUser.country_id,
            city_id: newUser.city_id,
            birthdate: newUser.birthdate,
            last_name: newUser.last_name,
            user_name: newUser.user_name,
            email: newUser.email,
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
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser
};