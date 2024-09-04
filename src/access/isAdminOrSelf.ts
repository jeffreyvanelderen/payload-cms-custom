import { Access } from "payload/config";
import { Role } from "../models/enums/Role";

export const isAdminOrSelf: Access = ({ req: { user } }) => {
  if (user) {
    if (user?.role?.value === Role.ADMIN) return true;

    // If any other type of user, only provide access to themselves
    return {
      id: {
        equals: user.id,
      },
    };
  }

  // Reject everyone else
  return false;
};
