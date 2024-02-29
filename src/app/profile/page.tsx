'use client'

import { FormEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MultipleSelectionSkills from "@/components/MultipleSelectionSkills";

export default function Profile() {
  const [ nameIsEdit, setNameIsEdit ] = useState<boolean>(false);
  const [ experienceIsEdit, setExperienceIsEdit ] = useState<boolean>(false);
  const [ skillsIsEdit, setSkillsIsEdit ] = useState<boolean>(false);
  const [ developIsEdit, setDevelopIsEdit ] = useState<boolean>(false);

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

  const skills = [
    {
      id:1,
      skill: 'html',
      grade_1:'test 1',
      grade_2:'test 2',
      grade_3:'test 3',
      grade_4:'test 4',
      grade_5:'test 5'
    },
    {
      id:2,
      skill: 'css',
      grade_1:'test 1',
      grade_2:'test 2',
      grade_3:'test 3',
      grade_4:'test 4',
      grade_5:'test 5'
    }
  ]

  function handleClick(param:'name' | 'experience' | 'skills' | 'develop') {
    switch(param) {
      case 'name':
        setNameIsEdit(true)
        break;
      case 'experience':
        setExperienceIsEdit(true)
        break;
      case 'skills':
        setSkillsIsEdit(true)
        break;
      case 'develop':
        setDevelopIsEdit(true)
        break;
    }
  }

  function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      formValues[key] = (value as string);
    });
    switch(e.currentTarget.id) {
      case 'name':
        const { name } = formValues;
        setNameIsEdit(false);
        console.log(name)
        break;
      case 'experience':
        const { dateStart, dateEnd, company, achiev, stack } = formValues;
        setExperienceIsEdit(false);
        console.log( dateStart, dateEnd, company, achiev, stack )
        break;
      case 'skills':
        const { skills } = formValues;
        setSkillsIsEdit(false);
        console.log(skills)
        break;
      case 'develop':
        const { skills:develop } = formValues;
        setDevelopIsEdit(false);
        console.log(develop)
        break;
    }
  }

  return(
    <>
    <h1>Личный кабинет</h1>
    <ol>
      <li>
        { nameIsEdit ? 
          <form 
            id="name"
            onSubmit={handleSubmit}>
            <TextField id="name" label="ФИО" name="name" />
          </form> : <p>ФИО</p> 
        }
        { nameIsEdit ? <Button disabled >Редактировать</Button> : <Button onClick={() => handleClick('name')}>Редактировать</Button> }
        <Button>Очистить</Button>
      </li>

      <li>
      { experienceIsEdit ? 
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <form 
              id="experience"
              onSubmit={handleSubmit}
            >
              <DatePicker name="dateStart" label="Начало периода" />
              <DatePicker name="dateEnd" label="Конец периода" />
              <TextField id="company" label="Компания" name="company" />
              <Textarea name='achiev' minRows={2} placeholder='Достижения' />
              <Textarea name='stack' minRows={2} placeholder='Cтэк'/>
              <Button type='submit'>Добавить</Button>
            </form>
          </LocalizationProvider>
         : <p>Опыт работы</p> 
        }
        { experienceIsEdit ? <Button disabled >Редактировать</Button> : <Button onClick={() => handleClick('experience')}>Редактировать</Button> }
        <Button>Очистить</Button>
      </li>

      <li>
        { skillsIsEdit ? 
          <form 
            id="skills"
            onSubmit={handleSubmit}
          >
            <MultipleSelectionSkills optionSkills={skills} />
            <Button type='submit'>Добавить</Button>
          </form> : <p>Навыки</p> 
        }
        { skillsIsEdit ? <Button disabled >Редактировать</Button> : <Button onClick={() => handleClick('skills')}>Редактировать</Button> }
        <Button>Очистить</Button>
      </li>

      <li>
        { developIsEdit ? 
          <form 
            id="develop"
            onSubmit={handleSubmit}
          >
            <MultipleSelectionSkills optionSkills={skills} />
            <Button type='submit'>Добавить</Button>
          </form> : <p>План развития</p>
        }
        { developIsEdit ? <Button disabled >Редактировать</Button> : <Button onClick={() => handleClick('develop')}>Редактировать</Button> }
        <Button>Очистить</Button>
      </li>
    </ol>
    </>
  )
}
