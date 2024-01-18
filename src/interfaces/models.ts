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
