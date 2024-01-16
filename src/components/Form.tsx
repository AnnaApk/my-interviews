"use client"

import styles from './form.module.css'

import {TextField, Button} from '@mui/material';
import {DatePicker, TimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormEvent } from 'react';

export default function Form() {

  function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // TODO:get data from form
    const {date, time, title, description, company, recruiter, contact} = Object.fromEntries(new FormData(e.currentTarget));

    fetch('/api/vacancies', {
        method: 'POST',
        body: JSON.stringify({
          date,
          time,
          title,
          description,
          company,
          recruiter,
          contact,
        }),
      }
    )
    const myForm = document.getElementById("form") as HTMLFormElement;

    if (myForm) {
      myForm.reset();
    }
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form id='form' onSubmit={handleSubmit} className={styles.form}>
        <DatePicker name="date" label="Дата" />
        <TimePicker name="time" label="Время" />
        <TextField
          required
          id="title"
          label="Название вакансии"
          name="title"
        />
        <TextField
          required
          id="description"
          label="Описание вакансии"
          name="description"
        />
        <TextField
          required
          id="company"
          label="Название компании"
          name="company"
        />
        <TextField
          required
          id="name-recruiter"
          label="Имя рекрутера"
          name="recruiter"
        />
        <TextField
          required
          id="contact-recruiter"
          label="Контакты рекрутера"
          name="contact"
        />
        <Button type='submit' variant="outlined">Добавить</Button>
      </form>
    </LocalizationProvider>
  )
}
