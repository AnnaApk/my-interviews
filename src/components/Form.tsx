"use client"

import { IVacancyForm, ISkill} from '@/interfaces/models';
import styles from './form.module.css';
import {TextField, Button} from '@mui/material';
import {DatePicker, TimePicker, LocalizationProvider} from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { FormEvent } from 'react';
import MultipleSelectionSkills from './MultipleSelectionSkills';

interface IPropsAddVac extends IVacancyForm {
  skills: string;
}

interface FormProps {
  handleSubmit: (params: IPropsAddVac) => void;
  optionSkills: ISkill[] | undefined;
}

export default function Form({handleSubmit, optionSkills}:FormProps) {

  function onSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      // Explicitly cast value to string
      formValues[key] = (value as string);
    });
    const { date, time, title, skills, description, company, recruiter, contact } = formValues;
    handleSubmit({ date, time, title, skills, description, company, recruiter, contact })
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <form id='form' onSubmit={onSubmit} className={styles.form}>
        <DatePicker name="date" label="Дата" />
        <TimePicker name="time" label="Время" />
        <TextField
          required
          id="title"
          label="Название вакансии"
          name="title"
        />
        <MultipleSelectionSkills optionSkills={optionSkills} />
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
