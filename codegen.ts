import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "http://localhost:3000/api/graphql",
  // documents: "app/**/*.ts",
  // documents: "app/api/graphql/*.ts",
  generates: {
    "app/api/graphql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
