import styles from './popup.module.css';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import { styled } from '@mui/system';
import { Button, TextField } from '@mui/material';
import { IExperience, IExperienceForm } from '@/interfaces/models';
import dayjs from 'dayjs';
import { FormEvent } from 'react';

interface IProps {
  el: IExperience;
  handleCloseCLick: () => void;
  handleChangeExp: ({}:IExperienceForm) => void;
}

export default function Popup({el, handleCloseCLick, handleChangeExp}:IProps) {

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

function handleSubmit(e:FormEvent<HTMLFormElement>) {
  e.preventDefault();
  const formData = new FormData(e.currentTarget);
  const formValues: Record<string, string> = {};
  formData.forEach((value, key) => {
    formValues[key] = (value as string);
  });
  const { date_start, date_end, company, achiev, stack } = formValues;
  handleChangeExp({date_start, date_end, company, achiev, stack})

}

  return (
    <>
      <div className={styles.popup} onClick={handleCloseCLick}>
        <div className={styles.popup__contentcontainer} onClick={(e)=> e.stopPropagation()}>

          <LocalizationProvider dateAdapter={AdapterDayjs}>
        <form 
          id="experience"
          onSubmit={handleSubmit}
          style={{display: 'grid', gap: 15 }}
        >
          <DatePicker name="date_start" label="Начало периода" defaultValue={dayjs(el.date_start)} />
          <DatePicker name="date_end" label="Конец периода" defaultValue={dayjs(el.date_end)} />
          <TextField id="company" label="Компания" name="company" defaultValue={el.company} />
          <Textarea name='achiev' minRows={2} placeholder='Достижения' defaultValue={el.achiev} />
          <Textarea name='stack' minRows={2} placeholder='Cтэк' defaultValue={el.stack}/>
          <Button type='submit'>Редактировать</Button>
        </form>
      </LocalizationProvider> 

        </div>
      </div>
    </>
  )
}