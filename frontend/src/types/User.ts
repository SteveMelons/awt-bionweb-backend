export interface Me {
  id: string;
  username: string;
  email: string;
  mobile?: string;
  studyProgram?: string;
  preferences?: string[];
  skills?: string[];
  bio?: string;
  favorites: User[];
  creationDate: Date;
}

export interface User {
  id: string;
  username: string;
  email: string;
  mobile?: string;
  studyProgram?: string;
  preferences?: string[];
  skills?: string[];
  bio?: string;
  creationDate: Date;
}
