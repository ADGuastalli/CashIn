const express = require('express');
const { Child } = require('../../models/index');  // Importar el modelo Child


// CREATE: Crear un nuevo registro en la tabla Child
const createChild = async (req, res) => {
  try {
    const { child } = req.body;

    if (!child) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newChild = await Child.create({ child });
    res.status(201).json(newChild);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla Child
const getAllChildren = async (req, res) => {
  try {
    const children = await Child.findAll();
    res.status(200).json(children);
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getChildById = async (req, res) => {
  try {
    const { id } = req.params;
    const child = await Child.findByPk(id);

    if (!child) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(child);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updateChild = async (req, res) => {
  try {
    const { id } = req.params;
    const { child } = req.body;

    if (!child) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const existingChild = await Child.findByPk(id);

    if (!existingChild) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingChild.update({ child });
    res.status(200).json(existingChild);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deleteChild = async (req, res) => {
  try {
    const { id } = req.params;
    const child = await Child.findByPk(id);

    if (!child) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await child.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
    createChild,
    getAllChildren,
    getChildById,
    updateChild,
    deleteChild
};

