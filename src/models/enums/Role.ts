import { Option } from "payload/types";

export enum Role {
  ADMIN = "admin",
  EDITOR = "editor",
}

export const OPTIONS: Option[] = [
  { label: "Admin", value: Role.ADMIN },
  { label: "Editor", value: Role.EDITOR },
];
