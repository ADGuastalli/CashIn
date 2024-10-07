interface Expense {
    expense_id?: string,
    expense_category: string,
    pay_method: string,
    expense: string,
    mount: number,
    date?: string,
    recurrence?: boolean,
}

interface Income {
    income_id?: string,
    income_category: string,
    income: string, 
    mount: number, 
    date?: string,
    recurrence?: boolean
}

interface PersonalProperty {
    personal_property_id?: string, 
    personal_property_type: string,
    personal_property: string, 
    mount: number, 
    date?: string 
}

interface Deuda {
    debt_id?: string,
    debt_category: string, 
    debt: string, 
    mount: number, 
    date?: string,
    rate?: number, 
    cuote?: number , 
    recurrence?: boolean, 
    mount_cuote?: number
}

interface ICategoriasContext {
    expense_Category : string[], 
    income_category : string[],
    payMethod: string[],
    debtCategory: string[],
    personalProperty: string[],
}

interface ITotalesData {
    totalIncomes: number,
    totalExpense: number,
    totalSaving: number,
}

type Meta = {
    goal_id?: string;
    goal: string;
    mount: string;
    time_months: string;
    percentage: string;
    date?: string;
  };


export type  {
    Expense,
    Income,
    ICategoriasContext,
    PersonalProperty,
    Deuda,
    ITotalesData,
    Meta
}
