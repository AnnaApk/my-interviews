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

const skills = [
  {
    skill: 'html',
    grade_1: 'html 1: Вы можете создать приветствие, создав экземпляр объекта Greeter, или создать настраиваемое приветствие, расширив его.',
    grade_2: 'html 2: Вы можете создать приветствие, создав экземпляр объекта Greeter, или создать настраиваемое приветствие, расширив его.',
    grade_3: 'html 3: 3Вы можете создать приветствие, создав экземпляр объекта Greeter, или создать настраиваемое приветствие, расширив его.',
    grade_4: 'html 4: Вы можете создать приветствие, создав экземпляр объекта Greeter, или создать настраиваемое приветствие, расширив его.',
    grade_5: 'html 5: Вы можете создать приветствие, создав экземпляр объекта Greeter, или создать настраиваемое приветствие, расширив его.',
  },
  {
    skill: 'css',
    grade_1: 'css 1: Вы можете создать приветствие, создав экземпляр объекта Greeter, или создать настраиваемое приветствие, расширив его.',
    grade_2: 'css 2: Вы можете создать приветствие, создав экземпляр объекта Greeter, или создать настраиваемое приветствие, расширив его.',
    grade_3: 'css 3: можете создать приветствие, создав экземпляр объекта Greeter, или создать настраиваемое приветствие, расширив его.',
    grade_4: 'css 4: можете создать приветствие, создав экземпляр объекта Greeter, или создать настраиваемое приветствие, расширив его.',
    grade_5: 'css 5: можете создать приветствие, создав экземпляр объекта Greeter, или создать настраиваемое приветствие, расширив его.',
  },
];

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

  function MyListSubheader(props: ListSubheaderProps) {
    return <ListSubheader {...props} />;
  }
  
  MyListSubheader.muiSkipListHighlight = true;

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
              return (
                <MenuItem key={el[1]} disabled>{el[1]}</MenuItem>
              )
            } else {
              let arr = el[1].split(':')
              return (
                <MenuItem key={arr[0]} value={`${arr[0]}`}>{arr[1]}</MenuItem>
              )
            }
          }
          )}
        </Select>
      </FormControl>
  );
}
