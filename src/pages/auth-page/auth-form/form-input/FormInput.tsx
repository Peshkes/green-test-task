import {FieldError, FieldValues, Path, UseFormRegister} from 'react-hook-form';
import styles from './formInput.module.css';

type Props<T extends FieldValues> = {
    id: Path<T>;
    register: UseFormRegister<T>;
    label: string;
    type?: string;
    error?: FieldError;
};


const FormInput = <T extends FieldValues>({id, type = 'text', register, label, error}: Props<T>) => {
    return (
        <div className={styles.inputContainer}>
            <input
                {...register(id)}
                id={id as string}
                type={type}
                className={`${styles.input} ${error ? styles.errorInput : ''}`}
                placeholder={label}
            />
            {error && <p className={styles.errorMessage}>{error.message}</p>}
        </div>
    );
};

export default FormInput;
