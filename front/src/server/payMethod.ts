import { API } from "../helpers/helper";


export const getPayMethod_categoryAll = async () => {
    const response = await fetch(`${API}/paymethod`, {
      method: "GET",
    });
    const data = await response.json();
    console.log("paymethd__" , data)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const newData = data.map((item: any) => item.pay_method);
    return newData
  }