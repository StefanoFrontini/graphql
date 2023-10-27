import { getClient } from "./lib/client";
import { gql } from "@apollo/client";
import Loading from "./components/Loading";
import CharacterList from "./components/CharacterList";
import Error from "./components/Error";

const GET_CHARACTERS = gql`
  query Characters {
    characters {
      id
      name
      image
    }
  }
`;

export default async function Home() {
  const { data, loading, error } = await getClient().query({
    query: GET_CHARACTERS,
  });
  if (error) return <Error msg={error.message} />;
  if (loading) return <Loading />;
  return <>{data && <CharacterList characters={data.characters} />}</>;
}
