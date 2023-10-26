import { promises as fs } from "fs";
import type { Character, Episode, Location } from "./graphql";

const fetchCharacters = async () => {
  try {
    const data = await fs.readFile(
      process.cwd() + "/app/api/graphql/db/Characters.json",
      { encoding: "utf-8" }
    );
    return JSON.parse(data).elements;
  } catch (error) {
    console.error(error);
  }
};

const fetchEpisodes = async () => {
  try {
    const episodes = await fs.readFile(
      process.cwd() + "/app/api/graphql/db/Episodes.json",

      { encoding: "utf-8" }
    );
    return JSON.parse(episodes).elements;
  } catch (error) {
    console.error(error);
  }
};

const fetchLocations = async () => {
  try {
    const locations = await fs.readFile(
      process.cwd() + "/app/api/graphql/db/Locations.json",
      { encoding: "utf-8" }
    );
    return JSON.parse(locations).elements;
  } catch (error) {
    console.error(error);
  }
};

const addCharacterToFile = async (character: Character) => {
  try {
    const fileContent = await fs.readFile(
      process.cwd() + "/app/api/graphql/db/Characters.json",
      { encoding: "utf-8" }
    );
    const characters = JSON.parse(fileContent).elements;
    const newCharacter = {
      __typename: "Character",
      id: (characters.length + 1).toString(),
      ...character,
    };
    characters.push(newCharacter);
    const newFileContent = { elements: characters };
    await fs.writeFile(
      process.cwd() + "/app/api/graphql/db/Characters.json",
      JSON.stringify(newFileContent, null, 2),
      { encoding: "utf-8" }
    );
    return newCharacter;
  } catch (error) {
    console.error(error);
  }
};

const addEpisodeToFile = async (episode: Episode) => {
  try {
    const fileContent = await fs.readFile(
      process.cwd() + "/app/api/graphql/db/Episodes.json",
      { encoding: "utf-8" }
    );
    const episodes = JSON.parse(fileContent).elements;
    const newEpisode = {
      __typename: "Episode",
      id: (episodes.length + 1).toString(),
      ...episode,
    };
    episodes.push(newEpisode);
    const newFileContent = { elements: episodes };
    await fs.writeFile(
      process.cwd() + "/app/api/graphql/db/Episodes.json",
      JSON.stringify(newFileContent, null, 2),
      { encoding: "utf-8" }
    );
    return newEpisode;
  } catch (error) {
    console.error(error);
  }
};

const addLocationToFile = async (location: Location) => {
  try {
    const fileContent = await fs.readFile(
      process.cwd() + "/app/api/graphql/db/Locations.json",
      { encoding: "utf-8" }
    );
    const locations = JSON.parse(fileContent).elements;
    const newLocation = {
      __typename: "Location",
      id: (locations.length + 1).toString(),
      ...location,
    };
    locations.push(newLocation);
    const newFileContent = { elements: locations };
    await fs.writeFile(
      process.cwd() + "/app/api/graphql/db/Locations.json",
      JSON.stringify(newFileContent, null, 2)
    );
    return newLocation;
  } catch (error) {
    console.error(error);
  }
};

const resolvers = {
  Query: {
    episode: async (_: {}, args: { id: string }) => {
      const episodes = await fetchEpisodes();
      return episodes.find((episode: Episode) => episode.id === args.id);
    },
    episodes: fetchEpisodes,
    location: async (_: {}, args: { id: string }) => {
      const locations = await fetchLocations();
      return locations.find((location: Location) => location.id === args.id);
    },
    locations: fetchLocations,
    character: async (_: {}, args: { id: string }) => {
      const characters = await fetchCharacters();
      return characters.find(
        (character: Character) => character.id === args.id
      );
    },
    characters: fetchCharacters,
  },
  Mutation: {
    addCharacter: (_: {}, args: Character) => {
      const newCharacter = addCharacterToFile(args);
      return newCharacter;
    },
    addEpisode: (_: {}, args: Episode) => {
      const newEpisode = addEpisodeToFile(args);
      return newEpisode;
    },
    addLocation: (_: {}, args: Location) => {
      const newLocation = addLocationToFile(args);
      return newLocation;
    },
  },
};
export default resolvers;
