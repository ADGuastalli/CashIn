interface Expense {
    expense_id?: string,
    expense_category: string,
    pay_method: string,
    expense: string,
    mount: number,
    date?: string,
    recurrence?: boolean,
}

export type  {
    Expense
}
