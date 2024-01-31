import { Button } from "@mui/material";
import styles from './skillAddedCard.module.css';

interface IProps {
  title: string;
  id: number;
  deleteClick: (id: number) => void;
  editMode: (id: number) => void;
}

export default function SkillAddedCard({title, id, deleteClick, editMode }:IProps) {

  return (
    <div className={styles.skill_item} >
      <p className={styles.skill_title} >{title}</p>
      <Button onClick={()=> editMode(id)}>Поправить</Button>
      <Button onClick={()=> deleteClick(id)}>Удалить</Button>
    </div>
  )
}