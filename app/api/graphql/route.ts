import { readFileSync } from "fs";
import { startServerAndCreateNextHandler } from "@as-integrations/next";

import { ApolloServer } from "@apollo/server";

import { NextRequest } from "next/server";

import resolvers from "./resolvers";

const typeDefs = readFileSync(
  process.cwd() + "/app/api/graphql/schema.graphql",
  { encoding: "utf-8" }
);

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server);

export async function GET(req: NextRequest) {
  return handler(req);
}

export async function POST(req: NextRequest) {
  return handler(req);
}
