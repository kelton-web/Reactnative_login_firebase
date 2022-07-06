import * as Yup from "yup";
/* ********* Validation input signUp ****************/

export const validationSchemaHome = Yup.object({
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

/* ********* Validation input Update ****************/

export const validationSchemaUpdate = Yup.object({
    firstName: Yup.string().required("Veuillez saisir votre prénom"),
    lastName: Yup.string().required("Veuillez saisir votre nom"),
    email: Yup.string()
      .email("Veuillez saisir une adresse mail valide")
      .required("Veuillez saisir une adresse mail"),
    password: Yup.string()
      .min(6, "Veuillez saisir au moins 6 caractères")
      .required("Veuillez saisir un mot de passe"),
  }).required();

/* ********* Validation input signUp ****************/

export const validationSchema = Yup.object({
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

/* ********* Validation input login ****************/

export const validationSchemaLogin = Yup.object({
    email: Yup.string()
      .email("Veuillez saisir une adresse mail valide")
      .required("Veuillez saisir une adresse mail"),
    password: Yup.string()
      .min(6, "Veuillez saisir au moins 6 caractères")
      .required("Veuillez saisir un mot de passe"),
  }).required();