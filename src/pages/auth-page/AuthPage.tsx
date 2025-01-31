import styles from './authPage.module.css'
import AuthForm from "./auth-form/AuthForm.tsx";

const AuthPage = () => {
    return (
        <div className={styles.container}>
            <h1 className={styles.header}><span className={styles.green}>Green</span> Chat Application</h1>
            <AuthForm/>
        </div>
    )
}
export default AuthPage
