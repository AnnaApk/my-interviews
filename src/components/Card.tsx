'use client'
import React from "react";
import { IVacancy } from "@/interfases/modeles";
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

interface ICardProps {
  vacancy: IVacancy;
}

const Item = styled(Paper)(() => ({
  padding: '16px',
  textAlign: 'center',
  flexGrow: 1,
  background: 'rgba(0, 0, 0, 0.1)',
}));

export default function Card({ vacancy }: ICardProps) {
  const {
    date,
    time,
    title,
    description,
    company,
    recruiter,
    contact,
  } = vacancy;

  return (
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
        <Item style={{whiteSpace:'pre-wrap'}}> {description}</Item>
        <Item>{company}</Item>
        <Item>{recruiter}</Item>
        <Item>{contact}</Item>
      </Stack>
    </Paper>
  )
}
