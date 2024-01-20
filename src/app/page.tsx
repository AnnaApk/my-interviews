'use client'
import styles from './page.module.css'
import Form from '@/components/Form'
import Card from '@/components/Card'
import { IForm, IVacancy } from '@/interfaces/models'
import useSWR, { useSWRConfig }  from 'swr';

const fetcher = (url: string, init?: RequestInit) => fetch(url, init).then((responseStream) => responseStream.json())

export default function Home () {
  const { error, isLoading, data } = useSWR<{ data: IVacancy[] }>('/api/vacancies', fetcher);
  
  const { mutate } = useSWRConfig();

  function handleSubmitAddCard({date, time, title, description, company, recruiter, contact}: IForm) {
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
      })
    )
  }

  function handleDelete(id: number) {
    mutate(
      '/api/vacancies',
      fetcher('/api/vacancies', {
        method: 'DELETE',
        body: JSON.stringify({id}),
      })
    )  
  }

  return (

    <main className={styles.main}>
      <div className={styles.card_container}>
        {error && <p>An error has occurred.</p>}
        {isLoading && <p>Loading...</p>}
        {data?.data?.map((vacancy) => (<Card key={vacancy.id} vacancy={vacancy} handleDelete={handleDelete} />))}
      </div>
      
      <Form  handleSubmit={handleSubmitAddCard} />

    </main>

  )
}
