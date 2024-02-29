'use client'

import {TextField, Button} from '@mui/material';
import { FormEvent } from 'react';
import styles from './signIUp.module.css';
import Link from 'next/link';

export default function SignUp() {

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
        <TextField
            required
            id="confirm-password"
            label="Пароль"
            name="confirm-password"
        />
        <Button type='submit' variant="outlined">Регистрация</Button>
      </form>
      <Link href='/sign-in'>Войти</Link>
    </div>
  )
}