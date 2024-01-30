'use client'
import styles from './addSkillAdmin.module.css';

import {TextField, Button } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

import { FormEvent } from 'react';
import { ISkillForm } from '@/interfaces/models';
interface FormProps {
  handleSubmit: (params:ISkillForm) => void
}
export default function AddSkillAdmin({handleSubmit}:FormProps) {

  const Textarea = styled(TextareaAutosize)(() => `
    box-sizing: border-box;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.43rem;
    padding: 16.5px 14px;
    border-radius: 4px;
    background: none;
    border: 1px solid rgba(0, 0, 0, 0.23);
    &:hover {
      border-color: black;
    }
    &:focus {
      border-color: ;
      border: 2px solid #1976d2;
    }
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

  function onSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      // Explicitly cast value to string
      formValues[key] = (value as string);
    });
    const { skill, grade_1, grade_2, grade_3, grade_4, grade_5 } = formValues;
    handleSubmit({skill, grade_1, grade_2, grade_3, grade_4, grade_5})
  }

  return (
    <div className={styles.form_container}>
      <h1>Добавить навык в базу:</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <TextField
          required
          id="skill"
          label="Навык"
          name="skill"
          placeholder='Например, HTML'
        />
        <Textarea
          required
          id='grade_1'
          name='grade_1'
          minRows={2}
          placeholder='HTML 1: ...'
        />
         <Textarea
          required
          id='grade_2'
          name='grade_2'
          minRows={2}
          placeholder='HTML 2: ...'
        />
         <Textarea
          required
          id='grade_3'
          name='grade_3'
          minRows={2}
          placeholder='HTML 3: ...'
        />
         <Textarea
          required
          id='grade_4'
          name='grade_4'
          minRows={2}
          placeholder='HTML 4: ...'
        />
         <Textarea
          required
          id='grade_5'
          name='grade_5'
          minRows={2}
          placeholder='HTML 5: ...'
        />
        <Button type='submit' variant="outlined">Добавить</Button>
      </form>
    </div>
  )
}
