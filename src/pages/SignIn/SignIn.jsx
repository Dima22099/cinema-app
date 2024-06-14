import React from 'react';
import { NavLink } from 'react-router-dom';  
import { useTranslation } from 'react-i18next';

import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'; 

import cn from 'classnames';

import styles from './SignIn.module.css';


export const SignIn = () => {   
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        login: Yup.string()
        .min(2, t('signIn.login_min'))
        .max(100, t('signIn.login_max'))
        .required(t('signIn.login_required')),

        password: Yup.string()
        .min(6, t('signIn.password_min'))
        .required(t('signIn.password_required')),
    });

    const initialValues = { login: '', password: '', };

    const handleSubmit = values => {
        setTimeout(() => {
            console.log('values2', values);
        }, 500);
    }
return (
    <div className={styles.mainBlock}>
        <div className={styles.form}>
            <h1>{t('signIn.registration_form')}</h1>
            <Formik 
                initialValues={initialValues} 
                validationSchema={validationSchema} 
                onSubmit={handleSubmit}
            >
                {({ errors, touched, handleSubmit }) => (
                <form onSubmit={handleSubmit} className={styles.form_label}>
                <label htmlFor="login" className={styles.form_label_child}>
                {t('signIn.login')}
                <Field name="login" type="text" className={cn({[styles.error] : errors.login && touched.login})}/>
                <ErrorMessage className={cn({[styles.err_message] : errors.login && touched.login})} name="login" component="div" />
                </label>

                <label htmlFor="password" className={styles.form_label_child}>
                {t('signIn.password')}
                <Field name="password" type="password" className={cn({[styles.error] : errors.password && touched.password})}/>
                <ErrorMessage className={cn({[styles.err_message] : errors.password && touched.password})} name="password" component="div" />
                </label>

                <button 
                    type="submit" 
                    className={styles.form_label_button}
                    disabled={errors.login || errors.password}
                >
                    {t('signIn.sign_in')}
                </button>
                </form>
                )}
            </Formik>
        <NavLink to={'/SignUp'} className={styles.link}>
            {t('signUp.sign_up')}
        </NavLink>
        </div>
    </div>

    )
}