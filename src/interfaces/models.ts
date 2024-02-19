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
