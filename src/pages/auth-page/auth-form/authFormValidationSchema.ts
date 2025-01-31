import * as yup from 'yup';

export const authenticationValidationSchema = yup.object().shape({
    idInstance: yup
        .string()
        .min(10, 'Должен содержать минимум 8 символов')
        .max(10, 'Должен содержать максимум 12 символов')
        .required('Id инстанса обязателен'),
    apiTokenInstance: yup
        .string()
        .min(10, 'Должен содержать минимум 10 символов')
        .required('Токен инстанса обязателен'),
});
