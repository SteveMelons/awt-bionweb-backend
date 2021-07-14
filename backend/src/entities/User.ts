import {
  Collection,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";
import { Course } from "./Course";
import { Language } from "./Language";
import { Preference } from "./Preference";
import { StudyProgram } from "./StudyProgram";
import { University } from "./University";

@Entity()
export class User {
  @PrimaryKey()
  _id: ObjectId;

  @SerializedPrimaryKey()
  id: string;

  @Property({ unique: true })
  username: string;

  @Property({ unique: true })
  email: string;

  @Property()
  name: string;

  @Property()
  avatar?: string;

  @Property()
  password: string;

  @Property()
  mobile?: string;

  @ManyToOne()
  university?: University;

  @ManyToOne()
  studyProgram?: StudyProgram;

  @ManyToMany(() => Preference)
  preferences = new Collection<Preference>(this);

  @ManyToMany(() => Preference)
  skills = new Collection<Preference>(this);

  @ManyToMany(() => Language)
  languages = new Collection<Language>(this);

  @ManyToMany(() => Course)
  courses = new Collection<Course>(this);

  @Property()
  bio?: string;

  @ManyToMany(() => User)
  favorites = new Collection<User>(this);

  @Property()
  creationDate: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
