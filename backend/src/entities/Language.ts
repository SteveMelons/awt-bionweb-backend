import {
    Entity,
    PrimaryKey,
    Property,
    SerializedPrimaryKey,
  } from "@mikro-orm/core";
import { ObjectId } from "@mikro-orm/mongodb";

@Entity()
export class Language{
    @PrimaryKey()
    _id: ObjectId;
  
    @SerializedPrimaryKey()
    id: string;

    @Property({unique: true})
    name: string;
}