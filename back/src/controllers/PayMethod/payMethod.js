const { PayMethod } = require('../../models/index');

// CREATE: Crear un nuevo registro en la tabla PayMethod
const createPayMethod = async (req, res) => {
  try {
    const { pay_method } = req.body;

    if (!pay_method) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newPayMethod = await PayMethod.create({ pay_method });
    res.status(201).json(newPayMethod);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla PayMethod
const getAllPayMethods = async (req, res) => {
  try {
    const payMethods = await PayMethod.findAll();
    res.status(200).json(payMethods);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getPayMethodById = async (req, res) => {
  try {
    const { id } = req.params;
    const payMethod = await PayMethod.findByPk(id);

    if (!payMethod) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(payMethod);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updatePayMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const { pay_method } = req.body;

    if (!pay_method) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const existingPayMethod = await PayMethod.findByPk(id);

    if (!existingPayMethod) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingPayMethod.update({ pay_method });
    res.status(200).json(existingPayMethod);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deletePayMethod = async (req, res) => {
  try {
    const { id } = req.params;
    const payMethod = await PayMethod.findByPk(id);

    if (!payMethod) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await payMethod.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createPayMethod,
  getAllPayMethods,
  getPayMethodById,
  updatePayMethod,
  deletePayMethod
};
