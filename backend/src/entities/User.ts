import {
  Collection,
  Entity,
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
  password: string;
  
  @Property()
  mobile?: string;

  @Property()
  studyProgram?: string;

  @Property()
  preferences?: string[];

  @Property()
  skills?: string[];

  @Property()
  bio?: string;

  @OneToMany(() => User, user => user)
  favorites? = new Collection<User>(this);

  @Property()
  creationDate: Date = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt?: Date = new Date();
}
