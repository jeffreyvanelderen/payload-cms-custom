import { CollectionConfig } from "payload/types";
import { isAdminOrSelf } from "../access/isAdminOrSelf";
import { isEditorOrAdmin } from "../access/isEditorOrAdmin";
import Users from "./Users";

const Posts: CollectionConfig = {
  // Unique, URL-friendly string that will act as an identifier for this Collection.
  slug: "posts",
  // Specify options if you would like this Collection to feature authentication
  // auth: false,
  // Admin-specific configuration - https://payloadcms.com/docs/configuration/collections#admin-options
  admin: {
    useAsTitle: "title",
  },
  // Provide access control functions to define exactly who should be able to do what with Documents in this Collection - https://payloadcms.com/docs/access-control/overview/#collections
  access: {
    create: isEditorOrAdmin,
    read: ({ req: { user } }) => {
      console.log(`for read posts - user.role`, user.role?.value);
      return true;
    },
    update: isAdminOrSelf,
    delete: isAdminOrSelf,
  },
  // Singular and plural labels for use in identifying this Collection throughout Payload. Auto-generated from slug if not defined.
  labels: {
    singular: "Post",
    plural: "Posts",
  },
  // Array of field types that will determine the structure and functionality of the data stored within this Collection. Click here for a full list of field types as well as how to configure them.
  fields: [
    // Email added by default
    // Add more fields as needed
    {
      name: "userId",
      saveToJWT: true,
      type: "relationship",
      relationTo: Users.slug,
      hasMany: true,
      index: true,
      hidden: true,
      defaultValue: ({ user }) => user?.id,
    },
    {
      name: "title",
      type: "text",
    },
    {
      name: "content",
      type: "richText",
    },
  ],
  // Entry points to "tie in" to Collection actions at specific points. https://payloadcms.com/docs/hooks/overview#collection-hooks
  // hooks: {},

  // Specify options if you would like this Collection to support file uploads.
  // upload: {}

  // Set to false to disable documents' automatically generated createdAt and updatedAt timestamps.
  // timestamps

  // Add custom routes to the REST API. Set to false to disable routes. More
  // endpoints: []

  // An object with singularName and pluralName strings used in schema generation. Auto-generated from slug if not defined. Set to false to disable GraphQL.
  // graphQL: false,

  // An object with property interface as the text used in schema generation. Auto-generated from slug if not defined.
  // typescript: {}

  // Pass a top-level field to sort by default in the collection List view. Prefix the name of the field with a minus symbol ("-") to sort in descending order.
  // defaultSort: {}

  // Extension point for adding custom data (e.g. for plugins)
  // custom: []

  // Custom table or collection name depending on the database adapter. Auto-generated from slug if not defined.
  // dbName: ''
};

export default Posts;
