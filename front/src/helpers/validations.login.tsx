import { IErrorsLogin, IErrorsRegister, IUserProfile } from "../interface/interfaceUser";

const validateLogin = (
  values: IErrorsLogin,
  fieldsToValidate: string[]
): IErrorsLogin => {
  const errors: IErrorsLogin = {};

  if (fieldsToValidate.includes("email") && !values.email) {
    errors.email = "*";
  }

  if (fieldsToValidate.includes("password") && !values.password) {
    errors.password = "*";
  } else if (values.password) {
    if (values.password.length < 8 || values.password.length > 15) {
      errors.password = "La contraseña debe tener entre 8 y 15 caracteres.";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos una mayúscula.";
    } else if (!/[a-z]/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos una minúscula.";
    } else if (!/\d/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos un número.";
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(values.password)) {
      errors.password =
        "La contraseña debe contener al menos un carácter especial.";
    }
  }

  return errors;
};

const validateRegister = (
  values: IErrorsRegister,
  fieldsToValidate: string[]
): IErrorsRegister => {
  const errors: IErrorsRegister = {};

  if (fieldsToValidate.includes("name") && !values.name) {
    errors.name = "*";
  } else if (values.name) {
    if (values.name.length < 3 || values.name.length > 80) {
      errors.name = "El nombre debe tener entre 3 y 80 caracteres.";
    }
  }

  if (fieldsToValidate.includes("username") && !values.username) {
    errors.username = "*";
  }

  if (fieldsToValidate.includes("email") && !values.email) {
    errors.email = "*";
  } else if (values.email) {
    if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "El email es incorrecto. Ejemplo: example@example.com";
    }
  }

  if (fieldsToValidate.includes("city") && !values.city) {
    errors.city = "*";
  } else if (values.city) {
    if (values.city.length < 2 || values.city.length > 20) {
      errors.city = "La ciudad debe tener entre 2 y 20 caracteres.";
    }
  }

  if (fieldsToValidate.includes("country") && !values.country) {
    errors.country = "*";
  } else if (values.country) {
    if (values.country.length < 2 || values.country.length > 20) {
      errors.country = "El pais debe tener entre 2 y 20 caracteres.";
    }
  }

  if (fieldsToValidate.includes("password") && !values.password) {
    errors.password = "*";
  } else if (values.password) {
    if (values.password.length < 8 || values.password.length > 15) {
      errors.password = "La contraseña debe tener entre 8 y 15 caracteres.";
    } else if (!/[A-Z]/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos una mayúscula.";
    } else if (!/[a-z]/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos una minúscula.";
    } else if (!/\d/.test(values.password)) {
      errors.password = "La contraseña debe contener al menos un número.";
    } else if (!/[!@#$%^&*()_+{}\[\]:;<>,.?~\-]/.test(values.password)) {
      errors.password =
        "La contraseña debe contener al menos un carácter especial.";
    }
  }

  if (fieldsToValidate.includes("confirmPassword")) {
    if (!values.confirmPassword) {
      errors.confirmPassword = "*";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Las contraseñas no coinciden";
    }
  }

  if (fieldsToValidate.includes("birthdate") && !values.birthdate) {
    errors.birthdate = "*";
  } else if (values.birthdate) {
    // Verifica que `birthdate` sea una cadena válida
    if (!/\d{4}-\d{2}-\d{2}/.test(values.birthdate)) {
      errors.birthdate = "La fecha es inválida.";
    }
  }

  return errors;
};

const validateForm = (formData: IUserProfile): {[key:string]:string} => {
  const newErrors: { [key: string]: string } = {};

  if (!formData.name) newErrors.name = 'El nombre es obligatorio.';
  if (!formData.last_name) newErrors.last_name = 'El apellido es obligatorio.';
  if (!formData.email) newErrors.email = 'El correo electrónico es obligatorio.';
  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)) newErrors.email = 'El correo electrónico no es válido.';
  if (!formData.country) newErrors.country = 'El país es obligatorio.';
  if (!formData.city) newErrors.city = 'La ciudad es obligatoria.';
  if (!formData.birthdate) newErrors.birthdate = 'La fecha de nacimiento es obligatoria.';
  if (isNaN(formData.family_group) || formData.family_group < 0) newErrors.son_quantity = 'El número de hijos debe ser un número positivo.';

  

  return newErrors;
};


export { validateRegister, validateLogin, validateForm };
