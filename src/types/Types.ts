/* ********************************* Type de la navigation ******************************** */
export type NavigateParams = {
    Home: undefined,
    Login: undefined,
    SignUp: undefined,
    SecondSignUp: undefined,
    ForgotPassword: undefined,
}

/* ******************************* Type de Yup Formulaire SignUp*********** */

export type FormValuesSignUp = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}