const { Income , User , IncomeCategory, Data} = require('../../models/index');
const { Op } = require('sequelize')

function convertDate(dateString) {
  const [day, month, year] = dateString.split('/').map(Number);
  return new Date(year, month - 1, day); // Los meses en JavaScript son 0-indexados
}
// CREATE: Crear un nuevo registro en la tabla Income
const createIncome = async (req, res) => {
  try {
    const { income_category, income, mount, date, user_id} = req.body;

    if (income_category == null || income == null || mount == null|| date == null || user_id  == null) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const formattedDate = convertDate(date);

    const userdata =  await User.findOne({
      where: {user_id},
      include: [{
        model: Data,
        attributes: ['data_id']
      }]
    })

    const data_id = userdata.Datum.data_id

    const incomeType = await IncomeCategory.findOne({ where: { income_category: income_category.toLowerCase() } });
    if (!incomeType) {
      return res.status(400).json({ error: 'Tipo de ingreso no encontrado' });
    }
    const income_category_id = incomeType.income_category_id

    const newIncome = await Income.create({ 
      income_category_id,
      income, 
      mount, 
      date: formattedDate, 
      data_id
     });

    res.status(201).json(newIncome);
  } catch (error) {
    console.error('Error al crear el registro:', error);
    res.status(500).json({ error: 'Error al crear el registro' });
  }
};

// READ: Obtener todos los registros de la tabla Income
const getAllIncomes = async (req, res) => {
  const { id } = req.params;
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1; 
  const currentYear = currentDate.getFullYear();

  try {
    const userWithIncome = await User.findOne({
      where: { user_id: id },  
      include: {
        model: Data,           
        include: {
          model: Income,       
          where: {
            date: {
              [Op.gte]: new Date(`${currentYear}-${currentMonth}-01`), 
              [Op.lt]: new Date(currentYear, currentMonth, 1) 
            }
          }
        }
      }
    });
    if (!userWithIncome) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    if (userWithIncome.Datum !== null && userWithIncome.Datum.Income !== null){
      const incomes = userWithIncome.Datum.Income;
      const mappedIncome = await Promise.all(incomes.map(async (income) => {
        const idCategory = income.income_category_id;
  
        const incomeCategory = await IncomeCategory.findByPk(idCategory)
  
        return {
          income_id: income.income_id,
          income_category: incomeCategory ? incomeCategory.income_category : null,
          income: income.income, 
          mount: income.mount, 
          date: income.date 
        };
      }));
  
      res.status(200).json(mappedIncome.length > 0 ? mappedIncome : []);
    }
  } catch (error) {
    console.error('Error al obtener los registros:', error);
    res.status(500).json({ error: 'Error al obtener los registros' });
  }
};

// READ: Obtener un registro por ID
const getIncomeById = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findByPk(id);

    if (!income) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    res.status(200).json(income);
  } catch (error) {
    console.error('Error al obtener el registro:', error);
    res.status(500).json({ error: 'Error al obtener el registro' });
  }
};

// UPDATE: Actualizar un registro existente
const updateIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const { monthly_income_id, income, mount, date } = req.body;

    if (monthly_income_id == null || income == null || mount == null || date == null) {
      return res.status(400).json({ error: 'Faltan datos requeridos' });
    }

    const existingIncome = await Income.findByPk(id);

    if (!existingIncome) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await existingIncome.update({ monthly_income_id, income, mount, date });
    res.status(200).json(existingIncome);
  } catch (error) {
    console.error('Error al actualizar el registro:', error);
    res.status(500).json({ error: 'Error al actualizar el registro' });
  }
};

// DELETE: Eliminar un registro por ID
const deleteIncome = async (req, res) => {
  try {
    const { id } = req.params;
    const income = await Income.findByPk(id);

    if (!income) {
      return res.status(404).json({ error: 'Registro no encontrado' });
    }

    await income.destroy();
    res.status(200).json({ message: 'Registro eliminado exitosamente' });
  } catch (error) {
    console.error('Error al eliminar el registro:', error);
    res.status(500).json({ error: 'Error al eliminar el registro' });
  }
};

module.exports = {
  createIncome,
  getAllIncomes,
  getIncomeById,
  updateIncome,
  deleteIncome
};
