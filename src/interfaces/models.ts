export interface IForm {
  company: string;
  contact: string;
  date: string;
  description: string;
  recruiter: string;
  time: string;
  title: string;
}

export interface IVacancy extends IForm {
  id: number;
}

export interface ISkill {
  skill: string;
  grade_1: string;
  grade_2: string;
  grade_3: string;
  grade_4: string;
  grade_5: string;
}
