'use client'

import { FormEvent, useState } from "react";
import { Button, TextField } from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import MultipleSelectionSkills from "@/components/MultipleSelectionSkills";
import styles from "./page.module.css";

import { useSession } from "next-auth/react";
import Link from "next/link";
import useSWR, { useSWRConfig }  from 'swr';

import { IUser, ISkill, IExperience, IExperienceForm, IUserSkill } from '@/interfaces/models'
import UserNameOnProfile from "@/components/UserNameOnProfile";
import UserExperienceOnProfile from "@/components/UserExperienceOnProfile";
import SkillsOfUser from "@/components/SkillsOfUser";
import { noop } from "swr/_internal";

const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then((responseStream) => responseStream.json())

export default function Profile() {
  const { data: session } = useSession();
  
  const { error, isLoading, data } = useSWR<{ user: IUser[] , experience: IExperience[], skills: ISkill[], userSkills: IUserSkill[] }>(`/api/users/?email=${session?.user?.email}`, fetcher);
  
  const { mutate } = useSWRConfig();

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

  function handleClick(param:'skills' | 'develop') {
    switch(param) {
      case 'skills':
        setSkillsIsEdit(true)
        break;
      case 'develop':
        setDevelopIsEdit(true)
        break;
    }
  }

  function handleNameChangeSubmit(name: string) {
    mutate(`api/users/?email=${session?.user?.email}`,
            fetcher(`api/users/?email=${session?.user?.email}`, {
              method: 'PATCH',
              body: JSON.stringify({
                name,
                id: data?.user[0].id,
              }),
            }).then(()=> mutate(`/api/users/?email=${session?.user?.email}`))
          )
  }

  function handleAddExperience({date_start, date_end, company, achieve, stack}: IExperienceForm) {
    mutate(`api/users/:${data?.user[0].id}/experience`,
      fetcher(`api/users/:${data?.user[0].id}/experience`, {
        method: 'POST',
        body: JSON.stringify({
          user_id: data?.user[0].id,
          date_start,
          date_end,
          company,
          achieve,
          stack, 
        })
      }).then(()=> mutate(`/api/users/?email=${session?.user?.email}`))
    )
  }

  function handleDeleteExperience(id: number) {
    mutate(`api/users/:${data?.user[0].id}/experience`,
      fetcher(`api/users/:${data?.user[0].id}/experience`, {
        method: 'DELETE',
        body: JSON.stringify({
          id
        })
      }).then(()=> mutate(`/api/users/?email=${session?.user?.email}`))
    )
  }

  function handleEditExperience({ id, date_start, date_end, company, achieve, stack}:IExperience) {
    mutate(`api/users/:${data?.user[0].id}/experience`,
      fetcher(`api/users/:${data?.user[0].id}/experience`, {
        method: 'PATCH',
        body: JSON.stringify({
          id, date_start, date_end, company, achieve, stack,
        })
      }).then(()=> mutate(`/api/users/?email=${session?.user?.email}`))
    )
  }

  function handleAddUserSkills(skills: string) {
    const reqBody = skills.split(',').map(key => {
      const skillID = parseInt(key.slice(0 , key.length - 1))
      const skillLevel = parseInt(key[key.length -1])
      return {skillID, skillLevel}
    })
    mutate(`api/users/:${data?.user[0].id}/skulls`,
    fetcher(`api/users/:${data?.user[0].id}/skills`, {
      method: 'POST',
      body: JSON.stringify({
        userID: data?.user[0].id,
        reqBody,
      })
    }).then(()=> mutate(`/api/users/?email=${session?.user?.email}`))
  )
  }

  function handleDeleteUserSkill(skillID: number) {
    mutate(`api/users/:${data?.user[0].id}/skulls`,
    fetcher(`api/users/:${data?.user[0].id}/skills`, {
      method: 'DELETE',
      body: JSON.stringify({
        userID: data?.user[0].id,
        skillID,
      })
    }).then(()=> mutate(`/api/users/?email=${session?.user?.email}`))
  )
  }

  return(

    <div className={styles.block}>
      { isLoading ? <p>isLoading ...</p> :
        <>
          <p>Вы авторизованы как {session?.user?.email}</p>
          <p>Вернуться на <Link href='/'>Главную страницу</Link></p>
          <h1>Личный кабинет</h1>

          {
            data && 
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li>
                <UserNameOnProfile user={data.user[0]} handleSubmit={handleNameChangeSubmit}/> 
              </li>
              <li>
                <UserExperienceOnProfile
                  experience={data.experience}
                  handleAddSubmit={handleAddExperience}
                  handleDelete={handleDeleteExperience}
                  handleEditExperience={handleEditExperience}
                />
              </li>
              <li>
                <SkillsOfUser 
                  skills={data.skills}
                  userSkills={data.userSkills}
                  handleAddSkills={handleAddUserSkills}
                  handleDelete={handleDeleteUserSkill}
                />
              </li>

            </ul>
          }

    {/* <ol>
      <li>
        { skillsIsEdit ? 
          <form 
            id="skills"
            // onSubmit={handleSubmit}
          >
            <MultipleSelectionSkills optionSkills={data?.skills} />
            <Button type='submit'>Добавить</Button>
          </form> : <p>Навыки</p> 
        }
        { skillsIsEdit ? <Button disabled >Редактировать</Button> : <Button onClick={ () => handleClick('skills')} >Редактировать</Button> }
      </li>
    </ol> */}
        </>
      }
   
    </div>
  )
}
