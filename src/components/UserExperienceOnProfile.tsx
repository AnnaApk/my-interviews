import { IExperience, IExperienceForm } from "@/interfaces/models";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useState, FormEvent } from "react";

import ExperienceRowInTable from "./ExperienceRowInTable";

interface IProps {
  experience: IExperience[];
  handleAddSubmit: ({date_start, date_end, company, achiev, stack}:IExperienceForm) => void;
  handleDelete: (id: number) => void;
  handleEditExperience: ({id, date_start, date_end, company, achiev, stack}:IExperience) => void;
}

export default function UserExperienceOnProfile({experience, handleAddSubmit, handleDelete, handleEditExperience }: IProps) {
  const [ isEdit, setIsEdit ] = useState<boolean>(false);

  const Textarea = styled(TextareaAutosize)(() => `
    box-sizing: border-box;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 1rem;
    font-weight: 400;
    line-height: 1.43rem;
    padding: 16.5px 14px;
    border-radius: 4px;
    background: none;
    border: 1px solid rgba(0, 0, 0, 0.23);
    &:hover {
      border-color: black;
    }
    &:focus {
      border-color: ;
      border: 2px solid #1976d2;
    }
    // firefox
    &:focus-visible {
      outline: 0;
    }
  `,
  );

  function handleClick() {
    setIsEdit(true)
  }

  function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      formValues[key] = (value as string);
    });
    const { date_start, date_end, company, achiev, stack } = formValues;
    handleAddSubmit({date_start, date_end, company, achiev, stack})
    setIsEdit(false)
  }

  return (
    <>
    
        <p>Опыт работы</p> 

      { !!experience.length && <Table aria-label="simple table">
        {/* sx={{ minWidth: 750 }} */}
        <TableHead>
          <TableRow>
            <TableCell></TableCell> 
            <TableCell>C-По</TableCell> 
            <TableCell>Компания</TableCell>
            <TableCell>Достижения</TableCell>
            <TableCell>Стэк</TableCell>
            <TableCell></TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {experience?.map((row) => (
            <ExperienceRowInTable key={row.id} row={row} handleDelete={handleDelete}
            handleEditExperience={handleEditExperience}
            />
          ))}
        </TableBody>
      </Table>  } 
   
    { isEdit && 
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form 
          id="experience"
          onSubmit={handleSubmit}
          style={{display: 'grid', gap: 15 }}
        >
          <DatePicker name="date_start" label="Начало периода" />
          <DatePicker name="date_end" label="Конец периода" />
          <TextField id="company" label="Компания" name="company" />
          <Textarea name='achiev' minRows={2} placeholder='Достижения' />
          <Textarea name='stack' minRows={2} placeholder='Cтэк'/>
          <Button type='submit'>Добавить</Button>
        </form>
      </LocalizationProvider> 
    }
    { !isEdit && <Button onClick={handleClick}>Добавить</Button> }
    </>
  )
}
