import { IUserProfile } from "@/interface/interfaceUser";

export function hasNullProperties(obj: IUserProfile) {
  const propertiesToCheck: (keyof IUserProfile)[] = [
    "birthdate",
    "city_id",
    "country_id",
    "email",
    "last_name",
    "user_name",
    "user_id",
  ];

  // eslint-disable-next-line prefer-const
  for (let prop of propertiesToCheck) {
    if (obj[prop] === null) {
      return true;
    }
  }
  return false;
}
