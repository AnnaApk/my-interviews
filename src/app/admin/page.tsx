'use client'
import AddSkillAdmin from "@/components/AddSkillAdmin";
import { ISkillForm, ISkill } from "@/interfaces/models";
import useSWR, { useSWRConfig }  from 'swr';
import styles from './page-admin.module.css';
import { Button } from "@mui/material";

const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then((responseStream) => responseStream.json());

export default function Admin() {
  const { error, isLoading, data } = useSWR<{data: [ISkill]}>('/admin/api/skills', fetcher);
  
  const { mutate } = useSWRConfig();

  function handleAddSkillToSQL({skill, grade_1, grade_2, grade_3, grade_4, grade_5}:ISkillForm) {
    mutate(
      '/admin/api/skills',
      fetcher('/admin/api/skills', {
        method: 'POST',
        body: JSON.stringify({
          skill,
          grade_1,
          grade_2,
          grade_3,
          grade_4,
          grade_5,
        }),
      })
    )
  }

  return (
    <>
      <div className={styles.container}>

        <p style={{width:'100%'}}>Уже дoбавленные навыки:</p>

        {error && <p>An error has occurred.</p>}

        {isLoading && <p>Loading...</p>}

        {data?.data?.map((el) => (
          <div className={styles.skill_item} key={el.id}>
            <p className={styles.skill_title} >{el.skill}</p>
            <Button>Поправить</Button>
            <Button>Удалить</Button>
          </div>
        )) }
      </div>
      
      <AddSkillAdmin handleSubmit={handleAddSkillToSQL} />
    </>
  )
}
