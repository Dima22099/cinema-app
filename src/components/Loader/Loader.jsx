import Spinner from 'react-bootstrap/Spinner';
import styles from './Loader.module.css';

export const Loader = ({ size, variant = 'primary' }) => {
    return (
        <div className={styles[size]}>
            <Spinner 
                animation="border"
                variant={variant}
            />
        </div>
    )
};