import * as yup from 'yup'

const loginSchema = yup.object().shape({
    username: yup
        .string()
        .trim()
        .required('Username is required')
        .min(6, 'Username must be at least 6 characters long')
        .max(20, 'Username cannot be more than 20 characters long'),
    password: yup
        .string()
        .trim()
        .required('Password is required')
        .min(6, 'Password must be at least 8 characters long')
        .max(25, 'Password cannot be more than 25 characters long'),
})

export default loginSchema