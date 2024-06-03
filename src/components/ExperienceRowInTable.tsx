import { Button, TableCell, TableRow} from "@mui/material";
import Image from 'next/image';
import deleteIcon from  '../../public/icons8-delete.svg';
import editIcon from  '../../public/icons8-edit.svg';
import { IExperience, IExperienceForm } from "@/interfaces/models";
import { useState } from "react";
import Popup from "./Popup";

interface IProps {
  row: IExperience;
  handleDelete: (id:number) => void;
  handleEditExperience: ({}:IExperience) => void;
}

export default function ExperienceRowInTable({row, handleDelete, handleEditExperience}:IProps) {
  const [ isEdit, setIsEdit ] = useState<boolean>(false);

  function handleClosePopup() {
    setIsEdit(false);
  }

  function handleChangeExp(arg:IExperienceForm) {
    handleEditExperience({...arg, id:row.id})
    setIsEdit(false);
  }

  return(
      
      <TableRow
      key={row.id}
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell style={{padding: 0}}>
       { isEdit ? 
        <Popup el={row} handleCloseCLick={handleClosePopup} handleChangeExp={handleChangeExp} /> :
        <Button onClick={() => setIsEdit(true)}>
          <Image src={editIcon} alt='Иконка редактирования' width={20}/>
        </Button>}
      </TableCell>
      <TableCell component="th" scope="row">
        <p style={{margin: 0}}>{row.date_start}</p>
        <p style={{margin: 0}}>{row.date_end}</p>
      </TableCell>
      <TableCell>{row.company}</TableCell>
      <TableCell>{row.achiev}</TableCell>
      <TableCell>{row.stack}</TableCell>
      <TableCell  style={{padding: 0}}>
        <Button onClick={() => handleDelete(row.id)}>
          <Image src={deleteIcon} alt='Иконка удаления' width={20}/>
        </Button>
      </TableCell>
    </TableRow>
   
  )
}