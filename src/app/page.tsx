// import Image from 'next/image'
import styles from './page.module.css'
import Form from '@/app/Form'
import Card from './Card'

export default function Home() {

  const data = {
    company:
    "Company",
    contact:
    "89164538622",
    date: 
    "06.01.2024",
    description: 
    `Пожелания к кандидату:  Знание CSS3, HTML5, опыт responsive/adaptive вёрстки; Уверенное знание JavaScript(ES6+), TypeScript; Опыт разработки с использованием React (от 1,5 лет) и Next.js; Понимание SPA и SSR; Умение работать с Git (мы используем GitHub); Будет плюсом:  Опыт работы со styled-components; Опыт написание jest тестов; Понимание и интерес к Crypto / Web3.0 сфере;`,
    recruiter: 
    "Anna",
    time: 
    "00:00",
    vacancy: 
    "junior-frontend"
    }

  return (

      <main className={styles.main}>

        <Card 
          date={data.date} 
          time={data.time} 
          vacancy={data.vacancy} 
          company={data.company} 
          description={data.description} 
          recruiter={data.recruiter} 
          contact={data.contact}
        />

        <Form />

      </main>
  
  )
}
