/* ********************************* Type de la navigation ******************************** */
export type NavigateParams = {
    Home: undefined,
    Login: {
        email: string,
    },
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