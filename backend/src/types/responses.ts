import { User } from "../entities/User";
import { FieldError } from "./errors";

export interface IdResponse {
  id?: string;
}

export interface IdFieldResponse {
  id?: string;
  errors: FieldError[];
}
