import { API } from "@/helpers/helper";

export interface IBank {
  bank_id?: string | number;
  bank: string;
  country_id: string;
}

export const createBank = async (bank: IBank) => {
  try {
    const response = await fetch(`${API}/banks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bank),
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};

export const getAllBanks = async (): Promise<IBank[]> => {
  try {
    const response = await fetch(`${API}/banks`, {
      method: "GET",
    });
    const banks = await response.json();
    return banks;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getBankById = async (bank_id: string) => {
  try {
    const response = await fetch(`${API}/banks/${bank_id}`, {
      method: "GET",
    });
    const bank = await response.json();
    return bank;
  } catch (error) {
    console.error(error);
  }
};
