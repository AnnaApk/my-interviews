'use client'
import styles from './page.module.css'
import Form from '@/components/Form'
import Card from '@/components/Card'
import { IForm, IVacancy } from '@/interfaces/models'
import { useEffect, useState } from 'react';
import useSWR from 'swr';

export default function Home () {
  const [vacancies, setVacancies] = useState<IVacancy[]>([])

  const fetcher = (url: string) => fetch(url)
  .then((res) => res.json())
  .then(response => setVacancies(response.data));
  
  const { error, isLoading } = useSWR('/api/vacancies', fetcher)
  
  useEffect(() => {
    getVacancies()
  }, [])

  // if (error) return "An error has occurred.";
  // if (isLoading) return "Loading...";
  return (

    <main className={styles.main}>

      { error 
        ? <p>An error has occurred.</p>
        : isLoading
        ? <p>Loading...</p>
        : vacancies?.map((vacancy) => (<Card key={vacancy.id} vacancy={vacancy} />))
      }

      <Form  handleSubmit={handleSubmit} />

    </main>

  )

  function getVacancies() {
    fetch(`/api/vacancies`, { cache: 'no-cache' })
    .then(responseStream => responseStream.json())
    .then(response => setVacancies(response.data))
    .catch(error => console.log(error))
  }

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
      }
    )
    .then(() => getVacancies())
    .catch(error => console.log(error))

    const myForm = document.getElementById("form") as HTMLFormElement;

    if (myForm) {
      myForm.reset();
    }
  }
}
