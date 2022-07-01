import * as Yup from "yup";

export const validationSchema = Yup.object({
    firstName: Yup.string().required("Veuillez saisir votre prénom"),
    lastName: Yup.string().required("Veuillez saisir votre nom"),
    email: Yup.string()
      .email("Veuillez saisir une adresse mail valide")
      .required("Veuillez saisir une adresse mail"),
    password: Yup.string()
      .min(6, "Veuillez saisir au moins 6 caractères")
      .required("Veuillez saisir un mot de passe"),
    confirmPassword: Yup.string()
      .required("Veuillez confirmer votre mot de passe")
      .oneOf([Yup.ref("password")], "Les mots de passe ne correspondent pas"),
  }).required();


export const validationSchemaLogin = Yup.object({
    email: Yup.string()
      .email("Veuillez saisir une adresse mail valide")
      .required("Veuillez saisir une adresse mail"),
    password: Yup.string()
      .min(6, "Veuillez saisir au moins 6 caractères")
      .required("Veuillez saisir un mot de passe"),
  }).required();