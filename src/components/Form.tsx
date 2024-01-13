"use client"

import styles from './form.module.css'

import {TextField, Button} from '@mui/material';
import {DatePicker, TimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Form() {

  const [date, setDate] = useState<String | null>(null);
  const [time, setTime] = useState<String | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [recruiter, setRecruiter] = useState('');
  const [contact, setContact] = useState('');

  function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // TODO:get data from form
    const data = Object.fromEntries(new FormData(e.currentTarget));
    console.log("data: ", data); // eslint-disable-line
    // In this case you can use uncontrolled component with defaultValue

    console.log({date, time, title, description, company, recruiter, contact})
    fetch(
      '/api/vacancies',
      {
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

  }

  function handleDateChange(value:{$d:Date} | null) {
    if (value) {
      const day = value.$d.getDate();
      const month = value.$d.getMonth() + 1;
      const year = value.$d.getFullYear();
      const a = day <= 9 ? '0' : '';
      const b = month <= 9 ? '0' : '';
      setDate(`${a}${day}.${b}${month}.${year}`)
    }
  }
  function handleTimeChange(value:{$d:Date} | null) {
    if (value) {
      const minutes = value.$d.getMinutes();
      const hours = value.$d.getHours();
      const a = hours <= 9 ? '0' : '';
      const b = minutes <= 9 ? '0' : '';
      setTime(`${a}${hours}:${b}${minutes}`)
    }
  }
  function handleVacancyChange(e:ChangeEvent<HTMLInputElement>) {
    setTitle(e.target.value)
  }
  function handleDescriptionChange(e:ChangeEvent<HTMLInputElement>) {
    setDescription(e.target.value)
  }
  function handleCompanyChange(e:ChangeEvent<HTMLInputElement>) {
    setCompany(e.target.value)
  }
  function handleRecruiterChange(e:ChangeEvent<HTMLInputElement>) {
    setRecruiter(e.target.value)
  }
  function handleContactChange(e:ChangeEvent<HTMLInputElement>) {
    setContact(e.target.value)
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <DatePicker onChange={handleDateChange} />
        <TimePicker onChange={handleTimeChange} />
        <TextField
          required
          id="title"
          label="Название вакансии"
          value={title}
          onChange={handleVacancyChange}
          //style={{width: '70vw'}}
        />
        <TextField
          required
          id="description"
          label="Описание вакансии"
          value={description}
          onChange={handleDescriptionChange}
        />
        <TextField
          required
          id="company"
          label="Название компании"
          value={company}
          onChange={handleCompanyChange}
        />
        <TextField
          required
          id="name-recruiter"
          label="Имя рекрутера"
          value={recruiter}
          onChange={handleRecruiterChange}
        />
        <TextField
          required
          id="contact-recruiter"
          label="Контакты рекрутера"
          value={contact}
          onChange={handleContactChange}
        />
        <Button type='submit' variant="outlined">Добавить</Button>
      </form>
    </LocalizationProvider>
  )
}
