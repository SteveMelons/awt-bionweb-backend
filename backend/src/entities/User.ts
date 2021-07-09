import { Course } from './course';
import { Language } from './language';
import { Preference } from './preference';
import {
  Collection,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
  SerializedPrimaryKey,
} from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

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
  avatar: string;

  @Property()
  password: string;

  @Property()
  mobile?: string;

  @Property()
  university?: string;

  @Property()
  studyProgram?: string;

  @ManyToMany(() => Preference)
  preferences? = new Collection<Preference>(this);

  @ManyToMany(() => Preference)
  skills? = new Collection<Preference>(this);

  @ManyToMany(() => Language)
  langeuages? = new Collection<Language>(this);

  @ManyToMany(() => Course)
  courses? = new Collection<Course>(this);

  @Property()
  bio?: string;

  @ManyToMany(() => User)
  favorites = new Collection<User>(this);

  @Property()
  creationDate: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
