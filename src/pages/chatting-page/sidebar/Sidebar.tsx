import styles from './Sidebar.module.css';
import useAuth from "../../../features/auth/useAuth.ts";

export const Sidebar = () => {
    const image = useAuth(state => state.user?.avatar);
    console.log(image)
    return (
        <div className={styles.sidebar}>
            <button className={styles.profileButton}>
                <img
                    src={image}
                    alt="Profile"
                    className={styles.profileIcon}
                />
            </button>
        </div>
    );
};
