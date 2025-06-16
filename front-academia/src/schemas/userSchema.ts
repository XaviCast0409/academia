// src/schemas/userSchema.ts
import * as yup from 'yup';

export const userSchema = yup.object({
  name: yup.string().required('Nombre requerido'),
  email: yup.string().email('Email inválido').required('Email requerido'),
  password: yup.string().min(6, 'Mínimo 6 caracteres').required('Contraseña requerida'),
  roleId: yup.number().required('Rol requerido'),
  pokemonId: yup.number().required('Pokémon requerido'),
  section: yup.string().required('Sección requerida')
});
