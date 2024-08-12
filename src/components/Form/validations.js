import * as yup from "yup";

export const signUpvalidations = yup.object().shape({
    firstName: yup.string().required("First name is required!"),
    lastName: yup.string().required("Last name is required!"),
    email: yup.string().email().required("Email is required"),
    agreement: yup.bool().oneOf([true], "Field must be checked !"),
    password: yup.string().min(8, "Password must be at least 8 characters").required("Password is required").matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#_\$%\^&\*]).{8,}$/, "Enter a strong password"),
    passwordConfirm: yup.string().oneOf([yup.ref("password"), "Passwords must match !"]).required("Password confirmation required !"),
})

export const loginValidations = yup.object().shape({
    email: yup.string().email().required("Email is required"),
    password: yup.string().required("Password is required"),
})