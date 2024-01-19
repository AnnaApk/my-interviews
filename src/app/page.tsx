'use client'

import useSWR, { useSWRConfig } from 'swr';

import Form from '@/components/Form'
import Card from '@/components/Card'
import { IForm, IVacancy } from '@/interfaces/models'

import styles from './page.module.css'

const fetcher = (url: string) => fetch(url).then((responseStream) => responseStream.json())

export default function Home () {
  const { error, isLoading, data } = useSWR<{ data: IVacancy[] }>('/api/vacancies', fetcher);

  // see https://swr.vercel.app/docs/mutation#revalidation
  const { mutate } = useSWRConfig();

  function handleSubmit({date, time, title, description, company, recruiter, contact}: IForm) {
    fetch('/api/vacancies', {
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
      .then(() => { mutate('/api/vacancies') })
      .catch(error => console.log(error))
  }

  return (
    <main className={styles.main}>

      {error && <p>An error has occurred.</p>}

      {isLoading && <p>Loading...</p>}

      {data?.data?.map((vacancy) => (<Card key={vacancy.id} vacancy={vacancy} />))}

      <Form  handleSubmit={handleSubmit} />

    </main>
  )
}
