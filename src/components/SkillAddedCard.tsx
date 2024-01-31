import { Button } from "@mui/material";
import styles from './skillAddedCard.module.css';

interface IProps {
  title: string;
  id: number;
  deleteClick: (id: number) => void;
}

export default function SkillAddedCard({title, id, deleteClick}:IProps) {

  return (
    <div className={styles.skill_item} >
      <p className={styles.skill_title} >{title}</p>
      <Button>Поправить</Button>
      <Button onClick={()=> deleteClick(id)}>Удалить</Button>
    </div>
  )
}