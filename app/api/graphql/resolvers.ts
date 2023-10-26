import { promises as fs } from "fs";
import type { Character, Episode, Location } from "./graphql";

const fetchCharacters = async () => {
  try {
    const data = await fs.readFile(
      process.cwd() + "/app/api/graphql/db/Characters.json",
      { encoding: "utf-8" }
    );
    console.log(JSON.parse(data).elements.length);
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
    const newCharacter = { id: characters.length + 1, ...character };
    characters.push(newCharacter);
    const newFileContent = { elements: characters };
    await fs.writeFile(
      process.cwd() + "/app/api/graphql/db/Characters.json",
      JSON.stringify(newFileContent, null, 2),
      { encoding: "utf-8" }
    );
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
    const newEpisode = { id: episodes.length + 1, ...episode };
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
    const newLocation = { id: locations.length + 1, ...location };
    locations.push(newLocation);
    const newFileContent = { elements: locations };
    await fs.writeFile(
      process.cwd() + "/app/api/graphql/db/Locations.json",
      JSON.stringify(newFileContent, null, 2)
    );
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
      const data = { ...args };
      const newCharacter = addCharacterToFile(data);
      return newCharacter;
    },
    addEpisode: (_: {}, args: Episode) => {
      const data = { ...args };
      const newEpisode = addEpisodeToFile(data);
      return newEpisode;
    },
    addLocation: (_: {}, args: Location) => {
      const data = { ...args };
      const newLocation = addLocationToFile(data);
      return newLocation;
    },
  },
};
export default resolvers;
