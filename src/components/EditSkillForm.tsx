'use client'
import styles from './addSkillAdmin.module.css';

import {TextField, Button } from '@mui/material';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';

import { ChangeEvent, FormEvent, useState } from 'react';
import { ISkill } from '@/interfaces/models';

interface FormProps {
  handleSubmit: (params:ISkill) => void;
  el: ISkill;
}
export default function EditSkill({handleSubmit, el }:FormProps) {
  
  const { id } = el;
  const [ inputSkill, setInputSkill] = useState<string>(el.skill);
  const [ inputGrade1, setInputGrade1] = useState<string>(el.grade_1);
  const [ inputGrade2, setInputGrade2] = useState<string>(el.grade_2);
  const [ inputGrade3, setInputGrade3] = useState<string>(el.grade_3);
  const [ inputGrade4, setInputGrade4] = useState<string>(el.grade_4);
  const [ inputGrade5, setInputGrade5] = useState<string>(el.grade_5);

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
          id="skill"
          label="Навык"
          name="skill"
          placeholder='Например, HTML'
          value={inputSkill}
          onChange={(e) => setInputSkill(e.target.value)}
        />
        <Textarea
          required
          id='grade_1'
          name='grade_1'
          minRows={2}
          placeholder='HTML 1: ...'
          value={inputGrade1}
          onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setInputGrade1(e.target.value)}
        />
         <Textarea
          required
          id='grade_2'
          name='grade_2'
          minRows={2}
          placeholder='HTML 2: ...'
          value={inputGrade2}
          onChange={(e) => setInputGrade2(e.target.value)}
        />
         <Textarea
          required
          id='grade_3'
          name='grade_3'
          minRows={2}
          placeholder='HTML 3: ...'
          value={inputGrade3}
          onChange={(e) => setInputGrade3(e.target.value)}
        />
         <Textarea
          required
          id='grade_4'
          name='grade_4'
          minRows={2}
          placeholder='HTML 4: ...'
          value={inputGrade4}
          onChange={(e) => setInputGrade4(e.target.value)}
        />
         <Textarea
          required
          id='grade_5'
          name='grade_5'
          minRows={2}
          placeholder='HTML 5: ...'
          value={inputGrade5}
          onChange={(e) => setInputGrade5(e.target.value)}
        />
        <Button type='submit' variant="outlined">Редактировать</Button>
      </form>
    </div>
  )
}
