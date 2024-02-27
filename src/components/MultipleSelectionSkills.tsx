'use client'

import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import { useState } from 'react';
import { ISkill } from '@/interfaces/models';

interface IProps {
  optionSkills: ISkill[] | undefined;
}
interface IPrev {
  key: number;
  skill_id?: number;
  skill: string;
  grade?: number;
  desc?: string | number;
}

export default function MultipleSelectionSkills({optionSkills}: IProps) {
  const [ selectedSkills, setSelectedSkills] = useState<string[]>([]);   // type

  const skills2 = optionSkills?.reduce((prev:IPrev[], el:ISkill):IPrev[] => {
    for (let i=0; i<=5; i++) {
      if (i === 0) {
        const header = {
          key: el.id * 10,
          skill: el.skill,
        }
        prev.push(header);
      } else {
        let str = `grade_${i}` as keyof ISkill;
        let grade_item: IPrev = {
          key: el.id * 10 + i,
          skill_id: el.id,
          skill: el.skill,
          grade: i,
          desc: el[str],
        }
        prev.push(grade_item);
      }
    }
    return prev;
  }, []);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value }
    } = event;
    console.log('value', value)
    // let val = skills2?.find((el) => el.key === parseInt(value[0]))
    console.log('val', value)
    setSelectedSkills(typeof value === 'string' ? value.split(',') : value);
  };

  function checkSelected(el:IPrev):boolean {
    let res = false
    const selected:IPrev[] = [];
    selectedSkills.map(el => {
      let val:IPrev | undefined = skills2?.find(skills2El => skills2El.key === parseInt(el))
      if (val !== undefined) {
        selected.push(val);
      }
    })
    if (!!selected.find(selEl => selEl.skill === el.skill && el.key !== selEl.key))  res=true
    return res
  } 


  return (
    <FormControl>
      <InputLabel id="label">Навыки</InputLabel>
        <Select
          labelId="label"
          name='skills'
          id="skills"
          multiple
          value={selectedSkills}
          onChange={handleChange}
          input={<OutlinedInput id="skillsInput" name='skillsInput' label="Навыки" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((skillKey) => {
              const selectedSkill = skills2?.find((item) => item.key === parseInt(skillKey));
              return selectedSkill ? <Chip key={selectedSkill.key} label={`${selectedSkill.skill} ${selectedSkill.grade}`} /> : null;
              })}
            </Box>
          )}
        >
          {
            skills2?.map((item) => {
              if (!('desc' in item)) {  // header
                return (
                  <MenuItem key={item.key} disabled>{item.skill}</MenuItem>
                )
              } else { 
                const mood = checkSelected(item);         // options
                return (
                  <MenuItem key={item.key} value={item.key} disabled={mood}>{item.desc}</MenuItem>
                )
              }
            })
          }
        </Select>
      </FormControl>
  )
}
