import { Access } from "payload/config";
import { Role } from "../models/enums/Role";

export const isEditorOrAdmin: Access = ({ req: { user } }) => {
  if (user) {
    return [Role.ADMIN, Role.EDITOR].includes(user.role?.value);
  }

  // Reject everyone else
  return false;
};
