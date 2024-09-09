import path from "path";

import { payloadCloud } from "@payloadcms/plugin-cloud";
import { postgresAdapter } from "@payloadcms/db-postgres";
import { webpackBundler } from "@payloadcms/bundler-webpack";
import { slateEditor } from "@payloadcms/richtext-slate";
import { buildConfig } from "payload/config";

import Users from "./collections/Users";
import Roles from "./collections/Roles";
import Posts from "./collections/Posts";
import type { ContextType } from "payload/dist/admin/components/utilities/DocumentInfo/types";
import { Locale } from "payload/dist/config/types";

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    livePreview: {
      collections: [Posts.slug],
      url: ({
        data,
        documentInfo,
      }: {
        data: Record<string, any>;
        documentInfo: ContextType;
        locale: Locale;
      }) => {
        console.log(
          `live preview data`,
          JSON.stringify(data),
          JSON.stringify(documentInfo),
        );
        return "http://localhost:3000/admin";
      },
      breakpoints: [
        { name: "phone", height: 500, width: 300, label: "iPhone 15" },
      ],
    },
  },
  editor: slateEditor({}),
  collections: [Users, Posts, Roles],
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
  },
  plugins: [payloadCloud()],
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI,
    },
  }),
});
