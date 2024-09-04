import { User } from "payload/auth";
import { Access } from "payload/config";
import { Role } from "../models/enums/Role";

export const isEditor: Access<User> = ({ req: { user } }) => {
  console.log(`user.role`, user.role);
  return user.role === Role.EDITOR;
};
