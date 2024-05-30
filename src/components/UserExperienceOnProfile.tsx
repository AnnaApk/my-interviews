import { IExperience } from "@/interfaces/models";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Button, Table, TableBody, TableCell, TableHead, TableRow, TextField } from "@mui/material";
import { useState, FormEvent } from "react";
import Image from 'next/image';
import deleteIcon from  '../../public/icons8-delete.svg';
import editIcon from  '../../public/icons8-edit.svg';

interface IProps {
  experience: IExperience[];
  handleAddSubmit: ({dateStart, dateEnd, company, achiev, stack}: {dateStart: string;
   dateEnd:string;
   company:string;
   achiev:string;
   stack:string;
  }) => void;
  handleDelete: (id: number) => void;
}

export default function UserExperienceOnProfile({experience, handleAddSubmit, handleDelete}: IProps) {
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
    const { dateStart, dateEnd, company, achiev, stack } = formValues;
    handleAddSubmit({dateStart, dateEnd, company, achiev, stack})
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
            <TableCell>C</TableCell> 
            {/* align="right" */}
            <TableCell>По</TableCell>
            <TableCell>Компания</TableCell>
            <TableCell>Достижения</TableCell>
            <TableCell>Стэк</TableCell>
            <TableCell></TableCell> 
          </TableRow>
        </TableHead>
        <TableBody>
          {experience?.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell style={{padding: 0}}>
                <Button>
                <Image src={editIcon} alt='Иконка удаления' width={20}/>
                </Button>
              </TableCell>
              <TableCell component="th" scope="row">
                {row.date_start}
              </TableCell>
              <TableCell>{row.date_end}</TableCell>
              <TableCell>{row.company}</TableCell>
              <TableCell>{row.achiev}</TableCell>
              <TableCell>{row.stack}</TableCell>
              <TableCell  style={{padding: 0}}>
                <Button onClick={() => handleDelete(row.id)}>
                <Image src={deleteIcon} alt='Иконка удаления' width={20}/>
                </Button>
              </TableCell>
            </TableRow>
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
          <DatePicker name="dateStart" label="Начало периода" />
          <DatePicker name="dateEnd" label="Конец периода" />
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