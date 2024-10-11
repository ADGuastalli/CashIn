const { Op } = require('sequelize');
const { User, Data, Income, Dwelling, Saving, Expense, ExpenseCategory, Debt, DebtCategory } = require('../../models/index'); // Importar los modelos necesarios

const incomeAndSavingRecommendation = async (req, res) => {
  const userId = req.params.id;

  try {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    const categories = ['vehicular', 'personal', 'hipotecario'];

    // 1. Buscar el usuario con ingresos del mes actual, situación familiar (Dwelling), ahorros (Saving) y gastos (Expenses en Recreación y otros)
    const userData = await User.findOne({
      where: { user_id: userId },
      include: {
        model: Data,
        include: [
          {
            model: Income,
            required: false,
            where: {
              date: {
                [Op.gte]: new Date(`${currentYear}-${currentMonth}-01`),
                [Op.lt]: new Date(currentYear, currentMonth + 1, 1)
              }
            },
            attributes: ['mount']
          },
          {
            model: Dwelling,
            attributes: ['dwelling_id', 'dwelling']
          },
          {
            model: Saving,
            where: {
              date: {
                [Op.gte]: new Date(`${currentYear}-${currentMonth}-01`),
                [Op.lt]: new Date(currentYear, currentMonth + 1, 1)
              }
            },
            attributes: ['mount'],
            required: false
          },
          {
            model: Debt,
            required: false,
            where: {
              [Op.or]: categories.map(category => ({
                debt: {
                  [Op.iLike]: category
                }
              }))
            },
            attributes: ['mount_cuote'] // Incluir solo el monto de la cuota
          },
          {
            model: Expense,
            include: {
              model: ExpenseCategory,
              attributes: ['expense_category'] // No necesitamos traer las categorías, solo los montos de los gastos
            },
            attributes: ['expense', 'mount', 'date'], // Seleccionar los campos de monto y fecha de los gastos
            where: {
              date: {
                [Op.gte]: new Date(`${currentYear}-${currentMonth}-01`), // Desde el primer día del mes actual
                [Op.lt]: new Date(currentYear, currentMonth + 1, 1) // Hasta el primer día del mes siguiente
              }
            }
          }
        ]
      }
    });

    console.log(JSON.stringify(userData, null, 2));

    if (!userData) {
      return res.status(404).json({ message: 'User not found' });
    }

    const userDwelling = userData.Datum?.Dwelling;

    if (!userDwelling) {
      return res.status(404).json({ message: 'User dwelling not found.' });
    }

    // 2. Calcular el ingreso total del mes
    const calculateTotalIncome = (userWithIncome) => {
      if (userWithIncome && userWithIncome.Datum && userWithIncome.Datum.Incomes) {
        const incomes = userWithIncome.Datum.Incomes;
        const totalIncome = incomes.reduce((total, income) => {
          return total + parseFloat(income.dataValues.mount);
        }, 0);
        return totalIncome;
      } else {
        return 0;
      }
    };

    const totalIncome = calculateTotalIncome(userData);

    // 3. Calcular los ahorros del usuario en el mes actual
    const savings = userData.Datum?.Savings || [];
    const monthlySavings = savings.reduce((total, saving) => {
      return total + parseFloat(saving.mount);
    }, 0);

    const expenses = userData.Datum?.Expenses || [];


    const homeServiceExpenses = expenses.filter(expense => 
      expense.ExpenseCategory.expense_category.toLowerCase() === 'servicios domesticos'
    );
    const recreationExpenses = expenses.filter(expense => 
      expense.ExpenseCategory.expense_category.toLowerCase() === 'recreacion'
    );
    const feedingExpenses = expenses.filter(expense =>
      expense.ExpenseCategory.expense_category.toLowerCase() === 'alimentacion'
    );
    const transportationCostsExpenses = expenses.filter(expense =>
      expense.ExpenseCategory.expense_category.toLowerCase() === 'transporte'
    )
    const insuranceAndMedicalExpenses = expenses.filter(expense => 
      expense.ExpenseCategory.expense_category.toLowerCase() === 'seguros' || 
      expense.ExpenseCategory.expense_category.toLowerCase() === 'seguros de salud'
    )
    const miscellaneousExpenses = expenses.filter(expense => 
      expense.ExpenseCategory.expense_category.toLowerCase() === 'gastos varios' ||
      expense.ExpenseCategory.expense_category.toLowerCase() === 'Miscelaneos'
    )

    // Calcular el monto total de los "Servicios Domésticos"
    const totalHomeServiceExpenses = homeServiceExpenses.reduce((total, expense) => {
      return total + parseFloat(expense.mount);
    }, 0);
    // Calcular el monto total de los "Recreacion"
    const totalRecreationExpenses = recreationExpenses.reduce((total, expense) => {
      return total + parseFloat(expense.mount);
    }, 0);
    //cacular el monto total de 'Alimentacion'
    const totalFeedingExpenses = feedingExpenses.reduce((total, expense) => {
      return total + parseFloat(expense.mount);
    }, 0);
    //cacular el monto total de 'Transporte'
    const totalTransportationCostsExpenses = transportationCostsExpenses.reduce((total, expense) => {
      return total + parseFloat(expense.mount);
    }, 0);
    //cacular el monto total de 'insuranceAndMedicalExpenses'
    const totalInsuranceAndMedicalExpenses = insuranceAndMedicalExpenses.reduce((total, expense) => {
      return total + parseFloat(expense.mount);
    }, 0);
    //cacular el monto total de 'Gastos varios y Micelaneos'
    const totalMiscellaneousExpenses = miscellaneousExpenses.reduce((total, expense) => {
      return total + parseFloat(expense.mount);
    }, 0);

    // 5. Calcular el monto total de préstamos en el mes actual
    const debts = userData.Datum?.Debts || [];
    const loanExpenses = debts.reduce((total, debt) => {
      return total + parseFloat(debt.mount_cuote);
    }, 0);
    
    // 6. Definir los porcentajes recomendados
    const recommendedPercentages = {
      recommendedDistributionFamily: { 
        savingAmount: 15, 
        fun: 5, 
        loans: 30, 
        homeServicesAndExpenses: 8,
        feeding: 15,
        transportationCosts: 8,
        insuranceAndMedicalExpenses: 5,
        miscellaneousExpenses: 4,
        description: 'Family (Recommended Distribution)' 
      },
      youngLivingWithParents: {
        fixedExpenses: 50,
        savingAmount: 20, 
        fun: 30, 
        description: 'Young living with parents' 
      }, 
      singleParentWithChildren: { 
        savingAmount: 10, 
        fun: 10, 
        loans: 30,
        homeServicesAndExpenses: 10,
        feeding:18,
        transportationCosts: 8,
        insuranceAndMedicalExpenses: 5,
        miscellaneousExpenses: 2,
        description: 'Single parent with children' 
      },
      couplesWithoutChildren: { 
        savingAmount: 20, 
        fun: 10, 
        loans: 25,
        homeServicesAndExpenses: 10,
        feeding: 15,
        transportationCosts: 10,
        insuranceAndMedicalExpenses: 5,
        miscellaneousExpenses: 5,
        description: 'Couples without children' 
      },
      independentSingle: { 
        savingAmount: 20, 
        fun: 10, 
        loans: 30,
        homeServicesAndExpenses: 10,
        feeding: 12,
        transportationCosts: 8,
        insuranceAndMedicalExpenses: 5,
        miscellaneousExpenses: 5,
        description: 'Independent single' 
      },
      retiredPerson: { 
        savingAmount: 15, 
        fun: 10, 
        loans: 10,
        homeServicesAndExpenses: 20,
        feeding: 15,
        transportationCosts: 5,
        insuranceAndMedicalExpenses: 15,
        miscellaneousExpenses: 10,
        description: 'Retired person' 
      },
      personInCareerTransition: { 
        savingAmount: 20, 
        fun: 3, 
        loans: 15, 
        homeServicesAndExpenses: 25,
        feeding: 20,
        transportationCosts: 5,
        insuranceAndMedicalExpenses: 10,
        miscellaneousExpenses: 2,
        description: 'Person in career transition' 
      },
      freelanceVariableIncome: { 
        savingAmount: 25, 
        fun: 3, 
        loans: 15, 
        homeServicesAndExpenses: 25,
        feeding: 20,
        transportationCosts: 5,
        insuranceAndMedicalExpenses: 10,
        miscellaneousExpenses: 2,
        description: 'Freelance or variable income workers' 
      },
    };
    
    // 7. Definir el porcentaje de ahorro recomendado basado en la situación familiar
    const calculateRecommendedPercentage = (dwelling) => {
      switch (dwelling) {
        case 'Familia(distibuicion recomendada)':
          return recommendedPercentages.recommendedDistributionFamily;
          case 'Joven que vive con sus padres':
            return recommendedPercentages.youngLivingWithParents; // Sin cálculo de préstamos
            case 'Padre/Madre soltero(a) con hijos':
              return recommendedPercentages.singleParentWithChildren;
              case 'Parejas sin hijos':
                return recommendedPercentages.couplesWithoutChildren;
                case 'Soltero(a) independiente':
                  return recommendedPercentages.independentSingle;
                  case 'Persona Jubilada':
                    return recommendedPercentages.retiredPerson;
                    case 'Personas en transicion laboral':
                      return recommendedPercentages.personInCareerTransition;
                      case 'Personas con trabajos freelance o ingresos variables':
            return recommendedPercentages.freelanceVariableIncome;
            default:
              return { savingAmount: 15, fun: 5, loans: 0 }; // Valores por defecto
            }
          };
          
          const recommendedPercentage = calculateRecommendedPercentage(userDwelling.dwelling);
          const recommendedSaving = (totalIncome * recommendedPercentage.savingAmount) / 100;
          const recommendedFun = (totalIncome * recommendedPercentage.fun) / 100;
          const recommendedLoans = (totalIncome * (recommendedPercentage.loans || 0)) / 100;
          const recommendedHomeServices = (totalIncome * (recommendedPercentage.homeServicesAndExpenses || 0)) / 100;
          const recommendedFeeding = (totalIncome * (recommendedPercentage.feeding || 0)) / 100;
          const recommendedTransportationCostsExpenses = (totalIncome * (recommendedPercentage.transportationCosts || 0)) / 100;
          const recommendedInsuranceAndMedicalExpenses = (totalIncome * ( recommendedPercentage.insuranceAndMedicalExpenses || 0)) /100;
          const recommendedMiscellaneousExpenses = (totalIncome * (recommendedPercentage.miscellaneousExpenses || 0)) /100;

          const savingPercentage = (monthlySavings / totalIncome) * 100 || 0;
          const loanPercentage = (loanExpenses / totalIncome) * 100 || 0;
          const recreationServicePercentage = (totalRecreationExpenses / totalIncome) * 100 || 0;
          const homeServicePercentage = (totalHomeServiceExpenses / totalIncome) * 100 || 0;
          const feedingPercentage = (totalFeedingExpenses / totalIncome) * 100 || 0;
          const transportationCostsPercentage = (totalTransportationCostsExpenses / totalIncome) * 100 || 0;
          const insuranceAndMedicalExpensesPercentage = (totalInsuranceAndMedicalExpenses / totalIncome) * 100 || 0;
          const miscellaneousExpensesPercentage = (totalMiscellaneousExpenses / totalIncome) * 100 || 0;

          // 8. Responder con el cálculo de ahorro, recreación, préstamos y "Servicios Domésticos"
          const response = [
            {
              MontoAhorro: {
          currentSaving: monthlySavings.toFixed(2),
          currentSavingPercentage: savingPercentage.toFixed(2),
          recommendedSaving: recommendedSaving.toFixed(2),
          recommendedSavingPercentage: recommendedPercentage.savingAmount.toFixed(2)
        },
        MontoRecreacion: {
          currentFun: totalRecreationExpenses.toFixed(2),
          currentFunPercentage: recreationServicePercentage.toFixed(2),
          recommendedFun: recommendedFun.toFixed(2),
          recommendedFunPercentage: recommendedPercentage.fun.toFixed(2)
        },
        MontoPrestamos: {
          currentLoan: loanExpenses.toFixed(2),
          currentLoanPercentage: loanPercentage.toFixed(2),
          recommendedLoan: recommendedLoans.toFixed(2),
          recommendedLoanPercentage: recommendedPercentage.loans?.toFixed(2) || 0
        },
        MontoServiciosDomesticos: {
          currentHomeServices: totalHomeServiceExpenses.toFixed(2),
          currentHomeServicesPercentage: homeServicePercentage.toFixed(2),
          recommendedHomeServices: recommendedHomeServices.toFixed(2),
          recommendedHomeServicesPercentage: recommendedPercentage.homeServicesAndExpenses?.toFixed(2) || 0
        },
        MontoAlimentacion: {
          currentFeeding: totalFeedingExpenses.toFixed(2),
          currentFeedingPercentage: feedingPercentage.toFixed(2),
          recommendedFeeding: recommendedFeeding.toFixed(2),
          recommendedFeedingPercentage: recommendedPercentage.feeding?.toFixed(2) || 0
        },
        MontoGastosTransporte: {
          currentTransportationCosts: totalTransportationCostsExpenses.toFixed(2),
          currentTransportationCostsPercentage: transportationCostsPercentage.toFixed(2),
          recommendedTransportationCosts: recommendedTransportationCostsExpenses.toFixed(2),
          recommendedTransportationCostsPercentage: recommendedPercentage.transportationCosts?.toFixed(2) || 0
        },
        MontoGastosSegurosyGastosMedicos: {
          currentInsuranceAndMedicalExpenses: totalInsuranceAndMedicalExpenses.toFixed(2),
          currentInsuranceAndMedicalExpensesPercentage: insuranceAndMedicalExpensesPercentage.toFixed(2),
          recommendedInsuranceAndMedicalExpenses: recommendedInsuranceAndMedicalExpenses.toFixed(2),
          recommendedInsuranceAndMedicalExpensesPercentage: recommendedPercentage.insuranceAndMedicalExpenses?.toFixed(2) || 0
        },
        MontomGastosVariosMiselaneos: {
          currentMiscellaneousExpenses: totalMiscellaneousExpenses.toFixed(2),
          currentMiscellaneousExpensesPercentage: miscellaneousExpensesPercentage.toFixed(2),
          recommendedMiscellaneousExpenses: recommendedMiscellaneousExpenses.toFixed(2),
          recommendedMiscellaneousExpensesPercentage: recommendedPercentage.miscellaneousExpenses?.toFixed(2) || 0
        },
        TotalIncome: {
          currentIncome: totalIncome.toFixed(2),
        }
      }
    ];

    res.json(response);

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = { incomeAndSavingRecommendation };
