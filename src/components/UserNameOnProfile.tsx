import { IUser } from "@/interfaces/models";
import { Button, TextField } from "@mui/material";
import { FormEvent, useState } from "react";

interface IProps {
    user: IUser;
    handleSubmit: (name: string) => void;
}
export default function UserNameOnProfile({user, handleSubmit}:IProps) {

  const [ nameIsEdit, setNameIsEdit ] = useState<boolean>(false);

  function handleClick() {
    setNameIsEdit(true)
  }
    
  function onSubmit(e:FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const formValues: Record<string, string> = {};
    formData.forEach((value, key) => {
      formValues[key] = (value as string);
    });
    handleSubmit(formValues.name)
    setNameIsEdit(false)
  }
    
  return (
    <>
      { nameIsEdit ? 
        <form 
          // className={styles.block}
          id="name"
          onSubmit={onSubmit}>
          <TextField id="name" label='ФИО' name="name" placeholder="" />
          <Button type="submit">Изменить</Button>
        </form> :
        <h3>{user.name}</h3>
      }
      { !nameIsEdit && <Button onClick={handleClick} >Редактировать</Button> } 
    </>
  )
}