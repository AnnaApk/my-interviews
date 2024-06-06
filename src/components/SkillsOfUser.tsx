import { Button, Stack } from "@mui/material";
import MultipleSelectionSkills from "./MultipleSelectionSkills";
import { ISkill, IUserSkill } from "@/interfaces/models";
import { FormEvent, useState } from "react";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import closeIcon from '../../public/icons8-close.svg';

interface IProps {
  skills: ISkill[];
  userSkills: IUserSkill[];
  handleAddSkills: (arg: string) => void;
  handleDelete: (skillID: number) => void;
}

export default function SkillsOfUser({skills, userSkills, handleAddSkills, handleDelete}:IProps) {

  const [ isEdit, setIsEdit] = useState<boolean>(false);

  function handleSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      // Explicitly cast value to string
      formValues[key] = (value as string);
    });
    const {skills} = formValues;

    handleAddSkills(skills)
    setIsEdit(false)
  }

  const Item = styled(Paper)(() => ({
    padding: '16px',
    textAlign: 'center',
    flexGrow: 1,
    background: 'rgba(0, 0, 0, 0.1)',
  }));

  return (
    <div style={{display:'grid', gap: 15}}>
      <h3>Навыки</h3>
      <Paper style={{padding:'15px', gap: '15px' }}>
        <Stack
          spacing={{ xs: 1, sm: 2 }}
          direction="row"
          useFlexGap
          flexWrap="wrap"
        >
          { userSkills.map(el => { 
            const x = skills.filter(skill => skill.id === el.skill_id)
            const str = `${x[0].skill}-${el.skill_level}`
            return <Item key={el.skill_id} style={{position: 'relative'}}>
              {str}
              <Button onClick={()=> handleDelete(el.skill_id)} style={{padding:0, minWidth: 'fit-content', position:'absolute', top: 5, right: 5}} >
                <Image alt="удалить этот скилл пользоваьеля" src={closeIcon}/>
              </Button>
              </Item>
          })}
        </Stack>
      </Paper>
      { isEdit ? 
        <form 
          id="skills"
          onSubmit={handleSubmit}
          style={{display:'flex', flexDirection:'column', width:'fit-content', gap: '15px' }}
        >
          <MultipleSelectionSkills optionSkills={skills} />
          <Button type='submit'>Добавить</Button>
        </form>
        : <Button onClick={()=> setIsEdit(true)} style={{width:'fit-content'}}>Добавить</Button>
      }
    </div>
  )
}