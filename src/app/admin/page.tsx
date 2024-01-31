'use client'
import AddSkillAdmin from "@/components/AddSkillAdmin";
import { ISkillForm, ISkill } from "@/interfaces/models";
import useSWR, { useSWRConfig }  from 'swr';
import styles from './page-admin.module.css';
import SkillAddedCard from "@/components/SkillAddedCard";
import { useState } from "react";
import EditSkill from "@/components/EditSkillForm";

const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then((responseStream) => responseStream.json());

export default function Admin() {
  const { error, isLoading, data } = useSWR<{data: [ISkill]}>('/admin/api/skills', fetcher);
  const [ isEditMode, setIsEditMode ] = useState<boolean>(false);
  const [ editSkill, setEditSkill ] = useState<ISkill | null >(null);
  
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

  function handleDeleteSkill(id: number) {
    if (confirm('Вы хотите удалить эту карточку безвозвратно?')) {
      mutate(
        '/admin/api/skills',
        fetcher('/admin/api/skills', {
          method: 'DELETE',
          body: JSON.stringify({id}),
        })
      ) 
    }
  }

  function handleSetEditMode(id: number) {
    setIsEditMode(true);
    let skill = data?.data.find(value => value.id == id);
    skill ? setEditSkill(skill) : alert('Навык не найден! Править нечего =( ...');
  }

  function handleEditSkill({id, skill, grade_1, grade_2, grade_3, grade_4, grade_5}: ISkill) {
    mutate(
      '/admin/api/skills',
      fetcher('/admin/api/skills', {
        method: 'PATCH',
        body: JSON.stringify({
          id,
          skill,
          grade_1,
          grade_2,
          grade_3,
          grade_4,
          grade_5
        }),
      })
    )
    setIsEditMode(false);
    setEditSkill(null);
  }

  return (
    <>
      <div className={styles.container}>

        <p style={{width:'100%'}}>Уже дoбавленные навыки:</p>

        {error && <p>An error has occurred.</p>}

        {isLoading && <p>Loading...</p>}

        {data?.data?.map((el) => (
          <SkillAddedCard key={el.id} title={el.skill} id={el.id} deleteClick={handleDeleteSkill} editMode={handleSetEditMode} />
        )) }

      </div>

      { isEditMode && editSkill ? 
          <EditSkill handleSubmit={handleEditSkill} el={editSkill} />
         :
        <AddSkillAdmin handleSubmit={handleAddSkillToSQL} />
      }
      
    </>
  )
}
