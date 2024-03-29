import Spinner from 'react-bootstrap/Spinner';
import styles from './Loader.module.css';
import cn from 'classnames';

export const Loader = ({ size, variant = 'primary' }) => (
        <div className={cn(styles.wrapper, styles[size])}>
            <Spinner 
                animation="border"
                variant={variant}
            />
        </div>
    );