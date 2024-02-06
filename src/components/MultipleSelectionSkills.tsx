'use client'

import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import ListSubheader, { ListSubheaderProps } from '@mui/material/ListSubheader';

import { useState } from 'react';
import { ISkillForm } from '@/interfaces/models';

interface IProps {
  optionSkills: ISkillForm[] | undefined;
}

export default function MultipleSelectionSkills({optionSkills}: IProps) {
  const [ selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const skills2 = optionSkills?.reduce((prev:[string, string][], el:ISkillForm):[string, string][] => {
    Object.entries(el).forEach((value:[string, string]) => prev.push(value));
    return prev;
  }, []);

  const handleChange = (event: SelectChangeEvent<string[]>) => {
    const {
      target: { value },
    } = event;
    console.log('value',event, typeof value , value)
    setSelectedSkills(typeof value === 'string' ? value.split(',') : value);
  };

  let str = '';

  // function MyListSubheader(props: ListSubheaderProps) {
  //   return <ListSubheader {...props} />;
  // }
  
  // MyListSubheader.muiSkipListHighlight = true;

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
              {selected.map((value) => (
                <Chip key={value} label={value} />
              ))}
            </Box>
          )}
        >
          {skills2?.map((el) => { 
            if ( el[0] === 'skill' ) {
              str = el[0]
              return (
                <MenuItem key={el[1]} disabled>{el[1]}</MenuItem>
              )
            } else {
              let arr = el[1].split(':')
              let disabledMood = false;
              for (let k of selectedSkills) {
                let x = k.split(' ')
                let y = arr[0].split(' ')
                if (x[0] === y[0] && k !== arr[0]) disabledMood = true
                
              }
              return (
                <MenuItem key={arr[0]} value={`${arr[0]}`} disabled={disabledMood}>{arr[1]}</MenuItem>
              )
            }
          }
          )}
        </Select>
      </FormControl>
  );
}
