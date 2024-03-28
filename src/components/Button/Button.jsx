import ButtonB from 'react-bootstrap/Button'
import styles from './Button.module.css'

export const Button = ({ type }) => {
    return (
        <ButtonB type={type} variant="primary" className={styles.btn}>Поиск</ButtonB>
    )
}

