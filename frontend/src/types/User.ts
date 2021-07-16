import { BasicEntity } from "../api";

export interface Me {
  id: string;
  username: string;
  name: string;
  avatar?: string;
  email: string;
  mobile?: string;
  university?: BasicEntity;
  studyprogram?: BasicEntity;
  preferences?: BasicEntity[];
  languages?: BasicEntity[];
  courses?: BasicEntity[];
  skills?: BasicEntity[];
  bio?: string;
  favorites: User[];
  createdAt: string;
}

export interface User {
  id: string;
  username: string;
  name: string;
  avatar?: string;
  email: string;
  mobile?: string;
  university?: BasicEntity;
  studyprogram?: BasicEntity;
  preferences?: BasicEntity[];
  languages?: BasicEntity[];
  courses?: BasicEntity[];
  skills?: BasicEntity[];
  bio?: string;
  createdAt: string;
}
