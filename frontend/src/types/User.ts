export interface Me {
  id: string;
  username: string;
  name: string;
  avatar: string;
  email: string;
  mobile?: string;
  university?: string;
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
  name: string;
  avatar: string;
  email: string;
  mobile?: string;
  university?: string;
  studyProgram?: string;
  preferences?: string[];
  skills?: string[];
  bio?: string;
  creationDate: Date;
}
