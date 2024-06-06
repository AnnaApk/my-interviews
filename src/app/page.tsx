'use client'

import styles from './page.module.css'
import Form from '@/components/Form'
import Card from '@/components/Card'
import { IVacancyForm, IVacancy, ISkill, IVacancySkills } from '@/interfaces/models'
import useSWR, { useSWRConfig }  from 'swr';
import AuthComponent from '@/components/AuthComponent'
import Link from 'next/link'
import { useSession } from 'next-auth/react'

const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then((responseStream) => responseStream.json())

interface IPropsAddVac extends IVacancyForm {
  skills: string;
}

export default function Home (pageProps: any) {
  const { error, isLoading, data } = useSWR<{ data: IVacancy[], sk: ISkill[], vacancySkills: IVacancySkills[] }>('/api/vacancies', fetcher);
  
  const { mutate } = useSWRConfig();

  const { data: session } = useSession();

  function handleSubmitAddCard({date, time, title, skills, description, company, recruiter, contact}: IPropsAddVac) {
    let id;

    const reqBody = skills.split(',').map(key => {
      const skillID = parseInt(key.slice(0 , key.length - 1))
      const skillLevel = parseInt(key[key.length -1])
      return {skillID, skillLevel}
    })

    mutate(
      '/api/vacancies',
      fetcher('/api/vacancies', {
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
      }).then(data => (id = data?.data.rows[0].id))
      .then((id:number) => {
        mutate(
          `/api/vacancies/:${id}`,
          fetcher(`/api/vacancies/:${id}`, {
            method: 'POST',
            body: JSON.stringify({
              vacancyID: id,
              reqBody,
            }),
          })
        )
      })
    )
  }

  function handleDelete(id: number) {
    if (confirm('Вы хотите удалить эту карточку безвозвратно?')) {
      mutate(
        '/api/vacancies',
        fetcher('/api/vacancies', {
          method: 'DELETE',
          body: JSON.stringify({id}),
        })
      ) 
    }
  }

  return (

    <main className={styles.main}>

      <AuthComponent />

      { session?.user ? <Link href='/profile'>Профиль пользователя</Link> : <></>}
      
      <div className={styles.card_container}>

        {error && <p>An error has occurred.</p>}

        {isLoading && <p>Loading...</p>}

        {data?.data?.map((vacancy) => {
          const localSkills = data?.vacancySkills.filter(el => el.vacancy_id === vacancy.id)
          const propsSkills = localSkills.map(el => {
            const x = data.sk.filter(skill => skill.id === el.skill_id)
            return `${x[0].skill}-${el.skill_required_level}`
          })
          return (<Card key={vacancy.id} vacancy={vacancy} skills={propsSkills} handleDelete={handleDelete} />)
        }
        )}

      </div>
      
      <Form  handleSubmit={handleSubmitAddCard} optionSkills={data?.sk}  />

    </main>

  )
}
