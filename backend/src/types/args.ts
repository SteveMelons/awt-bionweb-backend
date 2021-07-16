import { Course } from "../entities/Course";
import { Language } from "../entities/Language";
import { Preference } from "../entities/Preference";
import { StudyProgram } from "../entities/StudyProgram";
import { University } from "../entities/University";

export interface UpdateUserArgs {
  skills: Preference[]; // array of ids
  studyprogram: StudyProgram; // array of ids
  mobile: string;
  preferences: Preference[]; // array of ids
  bio: string;
  languages: Language[]; // array of ids
  courses: Course[]; // array of ids
  university: University; // array of ids
  avatar: string;
}
