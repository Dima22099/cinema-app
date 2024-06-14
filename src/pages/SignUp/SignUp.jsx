import React from 'react';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import {Formik, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup'; 

import cn from 'classnames';

import styles from './SignUp.module.css';


export const SignUp = () => {
    const { t } = useTranslation();

    const validationSchema = Yup.object().shape({
        name: Yup.string()
        .min(2, t('signUp.name_min'))
        .max(100, t('signUp.name_max'))
        .required(t('signUp.name_required')),

        login: Yup.string()
        .min(4, t('signUp.login_min'))
        .max(100, t('signUp.login_max'))
        .required(t('signUp.login_required')),

        password: Yup.string()
        .min(6, t('signUp.password_min'))
        .required(t('signUp.password_required')),
        confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')],t('signUp.confirmPassword'))
        .required(t('signUp.confirmPassword_required')),
    });

    const initialValues = {
    name: '',
    login: '',
    password: '',
    confirmPassword: '',
 };

    const handleSubmit = values => {
        setTimeout(() => {
            console.log('values2', values);
        }, 500);
    }
return (
    <div className={styles.mainBlock}>
        <div className={styles.form}>
            <h1>{t('signUp.registration_form')}</h1>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {({ errors, touched, handleSubmit }) => (
                <form onSubmit={handleSubmit} className={styles.form_label}>

                <label htmlFor="name" className={styles.form_label_child}>
                {t('signUp.name')}
                <Field name="name" type="text" className={cn({[styles.error] : errors.name && touched.name})}/>
                <ErrorMessage className={cn({[styles.err_message] : errors.name && touched.name})} name="name" component="div" />
                </label>

                <label htmlFor="login" className={styles.form_label_child}>
                {t('signUp.login')}
                <Field name="login" type="text" className={cn({[styles.error] : errors.login && touched.login})}/>
                <ErrorMessage className={cn({[styles.err_message] : errors.login && touched.login})} name="login" component="div" />
                </label>

                <label htmlFor="password" className={styles.form_label_child}>
                {t('signUp.password')}
                <Field name="password" type="password" className={cn({[styles.error] : errors.password && touched.password})}/>
                <ErrorMessage className={cn({[styles.err_message] : errors.password && touched.password})} name="password" component="div" />
                </label>

                <label htmlFor="confirmPassword" className={styles.form_label_child}>
                {t('signUp.confirm_password')}
                <Field name="confirmPassword" type="password" className={cn({[styles.error] : errors.confirmPassword && touched.confirmPassword})}/>
                <ErrorMessage className={cn({[styles.err_message] : errors.confirmPassword && touched.confirmPassword})} name="confirmPassword" component="div" />
                </label>
                <button 
                    type="submit" 
                    className={styles.form_label_button}
                    disabled={errors.name || errors.login || errors.password || errors.confirmPassword}
                >
                {t('signUp.sign_up')}
                </button>
                </form>
                )}
            </Formik>
        <NavLink to={'/SignIn'} className={styles.link}>
            {t("signIn.sign_in")}
        </NavLink>
        </div>
  </div>
    )
}