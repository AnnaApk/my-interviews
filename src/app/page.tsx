'use client'
import styles from './page.module.css'
import Form from '@/components/Form'
import Card from '@/components/Card'
import { IForm, IVacancy, ISkillForm } from '@/interfaces/models'
import useSWR, { useSWRConfig }  from 'swr';

const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then((responseStream) => responseStream.json())

export default function Home () {
  const { error, isLoading, data } = useSWR<{ data: IVacancy[], sk: ISkillForm[] }>('/api/vacancies', fetcher);
  
  const { mutate } = useSWRConfig();

  // console.log('derbwer', data)

  function handleSubmitAddCard({date, time, title, skills, description, company, recruiter, contact}: IForm) {
    mutate(
      '/api/vacancies',
      fetcher('/api/vacancies', {
        method: 'POST',
        body: JSON.stringify({
          date,
          time,
          title,
          skills,
          description,
          company,
          recruiter,
          contact,
        }),
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
      
      <div className={styles.card_container}>

        {error && <p>An error has occurred.</p>}

        {isLoading && <p>Loading...</p>}

        {data?.data?.map((vacancy) => (<Card key={vacancy.id} vacancy={vacancy} handleDelete={handleDelete} />))}

      </div>
      
      <Form  handleSubmit={handleSubmitAddCard} optionSkills={data?.sk}  />

    </main>

  )
}
