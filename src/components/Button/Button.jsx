import styles from './Button.module.css';


export const Button = ({ title }) => {
    return (
        <button className={styles.button}>
            <h1 className={styles.button_title}>{title}</h1>
        </button>
    );
};
