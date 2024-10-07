const { Bank } = require("../../models/index");

const getAllBanks = async (req, res) => {
  try {
    const banks = await Bank.findAll();
    res.status(200).json(banks);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener los bancos" });
  }
};

const getBankById = async (req, res) => {
  const { id } = req.params;
  try {
    const bank = await Bank.findByPk(id);
    if (!bank) return res.status(404).json({ error: "Banco no encontrado" });
    res.status(200).json(bank);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener el banco" });
  }
};

const createBank = async (req, res) => {
  const { bank, country_id } = req.body; // Usamos 'bank' en lugar de 'name'
  try {
    const newBank = await Bank.create({ bank, country_id });
    res.status(201).json(newBank);
  } catch (error) {
    res
      .status(500)
      .json({ error: `Error al crear el banco: ${error.message}` });
  }
};

const updateBank = async (req, res) => {
  const { id } = req.params;
  const { name, country_id } = req.body;
  try {
    const bank = await Bank.findByPk(id);
    if (!bank) return res.status(404).json({ error: "Banco no encontrado" });

    bank.name = name;
    bank.country_id = country_id;
    await bank.save();
    res.status(200).json(bank);
  } catch (error) {
    res.status(500).json({ error: "Error al actualizar el banco" });
  }
};

const deleteBank = async (req, res) => {
  const { id } = req.params;
  try {
    const bank = await Bank.findByPk(id);
    if (!bank) return res.status(404).json({ error: "Banco no encontrado" });

    await bank.destroy();
    res.status(200).json({ mensaje: "Banco eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ error: "Error al eliminar el banco" });
  }
};

module.exports = {
  getAllBanks,
  getBankById,
  createBank,
  updateBank,
  deleteBank,
};
