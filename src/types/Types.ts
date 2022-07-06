/* ********************************* Type de la navigation ******************************** */
export type NavigateParams = {
    Home: undefined,
    Login: {
        email: string,
    },
    SignUp: undefined,
    ForgotPassword: undefined,
    AddInfo: undefined,
    ModalUpdate: undefined,
}

/* ******************************* Type de Yup Formulaire SignUp*********** */

export type FormValuesSignUp = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string,
}