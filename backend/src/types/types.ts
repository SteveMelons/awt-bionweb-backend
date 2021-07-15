export interface FiltersInterface {
  courses: BasicEntity[];
  languages: BasicEntity[];
  preferences: BasicEntity[];
  skills: BasicEntity[];
  studyprogram: BasicEntity[];
  university: BasicEntity[];
}

export interface BasicEntity {
  id: string;
  name: string;
}
