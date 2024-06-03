export interface IVacancyForm {
  company: string;
  contact: string;
  date: string;
  description: string;
  recruiter: string;
  time: string;
  title: string;
}

export interface IVacancy extends IVacancyForm {
  id: number;
}

export interface ISkillForm {
  skill: string;
  grade_1: string;
  grade_2: string;
  grade_3: string;
  grade_4: string;
  grade_5: string;
}

export interface ISkill extends ISkillForm {
  id: number;
}

export interface IVacancySkills {
  vacancy_id: number;
  skill_id: number;
  skill_required_level: number;
}

export interface IUser {
  id: number;
  name: string;
  email: string;
  emailVerified: null;
  image: string | null;
}

export interface IExperienceForm {
  date_start: string;
  date_end: string;
  company: string;
  achiev: string;
  stack: string;
}
export interface IExperience extends IExperienceForm {
  id: number;
}
export interface IExperienceFull extends IExperience{
  user_id: number;
}
