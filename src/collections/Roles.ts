import { CollectionConfig } from "payload/types";
import { isAdmin } from "../access/isAdmin";

const Roles: CollectionConfig = {
  slug: "roles",
  admin: { useAsTitle: "name" },
  labels: { singular: "Role", plural: "Roles" },
  access: {
    create: () => false,
    read: () => true,
    update: () => false,
    delete: () => false,
  },
  fields: [
    // These 'populate' the fields of the Role type
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "value",
      type: "text",
      admin: {
        hidden: true,
      },
    },
  ],
};

export default Roles;
