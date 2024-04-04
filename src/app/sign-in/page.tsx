'use client'

import {TextField, Button} from '@mui/material';
import { FormEvent } from 'react';
import styles from './signIn.module.css';
import Link from 'next/link';

export default function SignIn() {

  function onSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      // Explicitly cast value to string
      formValues[key] = (value as string);
    });
    const { email, password } = formValues;
    console.log(email, password)
  }

  return (

    <div className={styles.container}>
      <form onSubmit={onSubmit} className={styles.form}>
        <TextField
            required
            id="email"
            label="Email"
            name="email"
        />
        <TextField
            required
            id="password"
            label="Пароль"
            name="password"
        />
        <Button type='submit' variant="outlined">Войти</Button>
      </form>
      <Link  href='/sign-up'>Регистрация</Link>
    </div>
  )
}
