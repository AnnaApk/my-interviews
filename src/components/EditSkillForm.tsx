'use client'
import styles from './addSkillAdmin.module.css';

import {TextField, Button } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

import { FormEvent } from 'react';
import { ISkill } from '@/interfaces/models';

interface FormProps {
  handleSubmit: (params:ISkill) => void;
  el: ISkill;
}
export default function EditSkill({handleSubmit, el }:FormProps) {
  
  const { id } = el;

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
    handleSubmit({ id, skill, grade_1, grade_2, grade_3, grade_4, grade_5})
  }

  return (
    <div className={styles.form_container}>
      <h1>Редактировать навык:</h1>
      <form onSubmit={onSubmit} className={styles.form}>
        <TextField
          required
          label="Навык"
          name="skill"
          placeholder='Например, HTML'
          defaultValue={el.skill}
        />
        <Textarea
          required
          name='grade_1'
          minRows={2}
          placeholder='HTML 1: ...'
          defaultValue={el.grade_1}
        />
         <Textarea
          required
          name='grade_2'
          minRows={2}
          placeholder='HTML 2: ...'
          defaultValue={el.grade_2}
        />
         <Textarea
          required
          name='grade_3'
          minRows={2}
          placeholder='HTML 3: ...'
          defaultValue={el.grade_3}
        />
         <Textarea
          required
          name='grade_4'
          minRows={2}
          placeholder='HTML 4: ...'
          defaultValue={el.grade_4}
        />
         <Textarea
          required
          name='grade_5'
          minRows={2}
          placeholder='HTML 5: ...'
          defaultValue={el.grade_5}
        />
        <Button type='submit' variant="outlined">Редактировать</Button>
      </form>
    </div>
  )
}
