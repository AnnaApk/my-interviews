// import Image from 'next/image'
import styles from './page.module.css'
import Form from '@/components/Form'
import Card from '@/components/Card'
import { IVacancy } from '@/interfases/modeles'

export default async function Home () {
  // we need a full url here as we are in the server side
  const vacancies: IVacancy[] = await fetch(`${process.env.BASE_URL}/api/vacancies`, { cache: 'no-cache' })
    .then(responseStream => responseStream.json())
    .then(response => response.data)
    .catch(error => console.log(error))

  console.log("vacancies: ", vacancies); // eslint-disable-line

  return (

    <main className={styles.main}>

      {vacancies?.map((vacancy) => (<Card key={vacancy.id} vacancy={vacancy} />))}

      <Form />

    </main>

  )
}
