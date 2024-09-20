import { IUserProfile  } from "@/interface/interfaceUser";

export function hasNullProperties(obj: IUserProfile){
    const propertiesToCheck: (keyof IUserProfile)[] = ['birthdate', 'city', 'country', 'email', 'last_name', 'name', 'userId'];

    // eslint-disable-next-line prefer-const
    for(let prop of propertiesToCheck){
        if(obj[prop] === null){
            return true
        }
    }
    return false
}