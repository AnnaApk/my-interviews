'use client'
import styles from './form.module.css'

import {TextField, Button} from '@mui/material';
import {DatePicker, TimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ChangeEvent, FormEvent, useState } from 'react';

export default function Form() {

  const [date, setDate] = useState<String | null>(null);
  const [time, setTime] = useState<String | null>(null);;
  const [vacancy, setVacancy] = useState('');
  const [description, setDescription] = useState('');
  const [company, setCompany] = useState('');
  const [recruiter, setRecruiter] = useState('');
  const [contact, setContact] = useState('');

  function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log({date, time, vacancy, description, company, recruiter, contact})
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
    setVacancy(e.target.value)
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
          id="outlined-required"
          label="Название вакансии"
          value={vacancy}
          onChange={handleVacancyChange}
          //style={{width: '70vw'}}
        />
        <TextField
          required
          id="outlined-required"
          label="Описание вакансии"
          value={description}
          onChange={handleDescriptionChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Название компании"
          value={company}
          onChange={handleCompanyChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Имя рекрутера"
          value={recruiter}
          onChange={handleRecruiterChange}
        />
        <TextField
          required
          id="outlined-required"
          label="Контакты рекрутера"
          value={contact}
          onChange={handleContactChange}
        />
        <Button type='submit' variant="outlined">Добавить</Button>
      </form>
    </LocalizationProvider>
  )
}