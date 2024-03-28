import Spinner from 'react-bootstrap/Spinner';
import cn from 'classnames'


import styles from './Loader.module.css';

export const Loader = ({ size, variant = 'primary' }) => (
    <div className={cn(styles.wrapper, styles[size])}>
        <Spinner
            animation="border"
            variant={variant}
        />
    </div>
);
