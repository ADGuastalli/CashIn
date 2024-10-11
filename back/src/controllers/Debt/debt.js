const { Debt, DebtCategory, Data, User } = require('../../models/index');  // Importar el modelo Debt

function convertDate(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day); 
}
// CREATE: Crear un nuevo registro en la tabla Debt
const createDebt = async (req, res) => {
  try {
    const { debt_category_id, debt, mount, date, data_id, recurrence, mount_cuote, cuote, rate } = req.body;

    if (!debt_category_id || !debt || !mount || !date || ! data_id || !mount_cuote|| ! cuote|| ! rate) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const newDebt = await Debt.create({ debt_category_id, debt, mount, date, data_id, recurrence, mount_cuote, cuote, rate});
    res.status(201).json(newDebt);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla Debt
const getAllDebts = async (req, res) => {
  const { id } = req.params;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; 
  const currentYear = currentDate.getFullYear();

  try {
    const userWithDebt = await User.findOne({
      where: { user_id: id },  
      include: {
        model: Data,           
        include: {
          model: Debt,       
          where: {
            date: {
              [Op.gte]: new Date(`${currentYear}-${currentMonth}-01`), 
              [Op.lt]: new Date(currentYear, currentMonth, 1) 
            }
          }
        }
      }
    });
    if (!userWithDebt) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    if (userWithDebt.Datum !== null && userWithDebt.Datum.Debt !== null) {
      const debts = userWithDebt.Datum.Expense;
      const mappedDebts = await Promise.all(debts.map(async (expense) => {
        const idCategory = debts.debt_category_id;
  
        // Obtener los datos de ExpenseCategory y PayMethod
        const debtCategory = await DebtCategory.findByPk(idCategory)
          
        return {
          debt_id: item.debt_id,
          debt_category: debtCategory ? debtCategory : null,
          debt: item.debt,
          mount: item.mount,
          rate: item.rate,
          mount_cuote: item.mount_cuote,
          date: item.date
        };
      }));
      res.status(200).json(mappedDebts);
    }

  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getDebtById = async (req, res) => {
  try {
    const { id } = req.params;
    const debt = await Debt.findByPk(id);

    if (!debt) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(debt);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updateDebt = async (req, res) => {
  try {
    const { id } = req.params;
    const { debt_category_id, debt, mount, date } = req.body;

    if (!debt_category_id || !debt || !mount || !date) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const existingDebt = await Debt.findByPk(id);

    if (!existingDebt) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingDebt.update({ debt_category_id, debt, mount, date });
    res.status(200).json(existingDebt);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deleteDebt = async (req, res) => {
  try {
    const { id } = req.params;
    const debt = await Debt.findByPk(id);

    if (!debt) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await debt.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createDebt,
  getAllDebts,
  getDebtById,
  updateDebt,
  deleteDebt
};
