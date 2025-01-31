import {FieldValues, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {authenticationValidationSchema} from "./authFormValidationSchema.ts";
import FormInput from "./form-input/FormInput.tsx";
import styles from './authForm.module.css'
import {useEffect, useRef} from "react";
import useAuth from "../../../features/auth/useAuth.ts";

const AuthForm = () => {
    const login = useAuth((state) => state.login);
    const abortControllerRef = useRef<AbortController | null>(null);

    const {
        register,
        handleSubmit,
        formState: {errors, isSubmitting},
    } = useForm({
        resolver: yupResolver(authenticationValidationSchema),
    });

    useEffect(() => {
        return () => {
            if (abortControllerRef.current) abortControllerRef.current.abort();
        };
    }, []);

    const onSubmit = handleSubmit(async (data: FieldValues) => {
        if (abortControllerRef.current) {
            abortControllerRef.current.abort();
        }

        const abortController = new AbortController();
        abortControllerRef.current = abortController;
        const signal = abortController.signal;

        await login(data.idInstance, data.apiTokenInstance, signal);
    });

    return (
        <form onSubmit={onSubmit} className={styles.form}>
            <FormInput
                id="idInstance"
                type="text"
                register={register}
                label="Id инстанса"
                error={errors.idInstance}
            />
            <FormInput
                id="apiTokenInstance"
                type="password"
                register={register}
                label="Токен инстанса"
                error={errors.apiTokenInstance}
            />

            <button className={isSubmitting ? styles.buttonDisabled : styles.button}
                type="submit"
                disabled={isSubmitting}
            >
                Войти
            </button>
        </form>
    )
}
export default AuthForm
