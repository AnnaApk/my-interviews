'use client'
import styles from './page.module.css'
import Form from '@/components/Form'
import Card from '@/components/Card'
import { IForm, IVacancy } from '@/interfaces/models'
import { useEffect, useState } from 'react';

export default function Home () {
  const [vacancies, setVacancies] = useState<IVacancy[]>([])
  
  useEffect(() => {
    getVacancies()
  }, [])

  return (

    <main className={styles.main}>

      {vacancies?.map((vacancy) => (<Card key={vacancy.id} vacancy={vacancy} />))}

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
