const calculateSavingsPlan = (monthlyIncome, savingsGoal, savingsPercentage, annualInterestRate) => {
    const monthlyInterestRate = annualInterestRate / 100 / 12;
    let savingsProgress = [];
    let totalSavings = 0; // Comienza en 0
  
    // Calcular el ahorro mensual basado en el porcentaje del ingreso
    const monthlySavings = (monthlyIncome * savingsPercentage) / 100;
  
    for (let month = 1; ; month++) {
      // Agregar el ahorro mensual al total acumulado
      totalSavings += monthlySavings;
  
      // Calcular el interés ganado en el total acumulado
      const interestEarned = totalSavings * monthlyInterestRate;
  
      // Sumar el interés ganado al total
      totalSavings += interestEarned;
  
      // Agregar al progreso del mes
      savingsProgress.push({
        mes: month,
        ahorroTotal: totalSavings.toFixed(2), // Total ahorrado hasta ahora
        interesGanado: interestEarned.toFixed(2), // Interés ganado en este mes
        ahorroMensual: monthlySavings.toFixed(2) // Ahorro mensual en este mes
      });
  
      // Salir del bucle si se ha alcanzado la meta
      if (totalSavings >= savingsGoal) {
        // Calcular años y meses necesarios para alcanzar la meta
        const totalMonths = month; // Total de meses hasta alcanzar la meta
        const years = Math.floor(totalMonths / 12);
        const remainingMonths = totalMonths % 12;
  
        return {
          totalSavings: totalSavings.toFixed(2),
          savingsProgress,
          tiempoNecesario: {
            años: years,
            meses: remainingMonths,
            totalMeses: totalMonths // Para referencia
          }
        };
      }
    }
  };
  
  const simulateSavingsPlan = (req, res) => {
    const { monthlyIncome, savingsGoal, savingsPercentage, annualInterestRate } = req.body;
  
    // Validar los parámetros de entrada
    if (!monthlyIncome || !savingsGoal || !savingsPercentage || !annualInterestRate || 
        monthlyIncome <= 0 || savingsGoal <= 0 || savingsPercentage < 0 || annualInterestRate < 0) {
      return res.status(400).json({ error: 'Los parámetros de entrada deben ser válidos.' });
    }
  
    const { totalSavings, savingsProgress, tiempoNecesario } = calculateSavingsPlan(monthlyIncome, savingsGoal, savingsPercentage, annualInterestRate);
    
    res.status(200).json({
      mensaje: 'Simulación del plan de ahorro completada',
      ahorroTotalFinal: totalSavings,
      progresoMensual: savingsProgress,
      tiempoNecesario // Incluye el tiempo necesario para alcanzar la meta
    });
  };
  
  module.exports = {
    simulateSavingsPlan,
  };
  