'use client'
import deleteIcon from  '../../public/icons8-delete.svg';
import Image from 'next/image';
import style from './card.module.css';
import React, {MouseEvent} from "react";
import { IVacancy } from "@/interfaces/models";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

interface ICardProps {
  vacancy: IVacancy;
  handleDelete: (id: number) => void;
}

const Item = styled(Paper)(() => ({
  padding: '16px',
  textAlign: 'center',
  flexGrow: 1,
  background: 'rgba(0, 0, 0, 0.1)',
}));

export default function Card({ vacancy, handleDelete }: ICardProps) {
  const {
    id,
    date,
    time,
    title,
    description,
    company,
    recruiter,
    contact,
  } = vacancy;

  return (
    <div>
    <div >
      <button 
      className={style.button_delete} 
      onClick={handleClickDelete}>
        <Image src={deleteIcon} alt='Иконка удаления' width={20}/>
      </button>
    </div>
    <Paper style={{padding:'15px'}}>
      <Stack
        spacing={{ xs: 1, sm: 2 }}
        direction="row"
        useFlexGap
        flexWrap="wrap"
      >
        <Item>{date}</Item>
        <Item>{time}</Item>
        <Item>{title}</Item>
        {/* <Item>{skills}</Item> */}
        <Item style={{whiteSpace:'pre-wrap'}}> {description}</Item>
        <Item>{company}</Item>
        <Item>{recruiter}</Item>
        <Item>{contact}</Item>
      </Stack>
    </Paper>
    </div>
  )

  function handleClickDelete(e: MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    handleDelete(id);
  }
}
