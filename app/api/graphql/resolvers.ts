import { promises as fs } from "fs";

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

const addCharacterToFile = async (character) => {
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

const addEpisodeToFile = async (episode) => {
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

const addLocationToFile = async (location) => {
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
    episode: async (parent, args) => {
      const episodes = await fetchEpisodes();
      return episodes.find((episode) => episode.id === args.id);
    },
    episodes: fetchEpisodes,
    location: async (parent, args) => {
      const locations = await fetchLocations();
      return locations.find((location) => location.id === args.id);
    },
    locations: fetchLocations,
    character: async (parent, args) => {
      const characters = await fetchCharacters();
      return characters.find((character) => character.id === args.id);
    },
    characters: fetchCharacters,
  },
  Mutation: {
    addCharacter: (parent, args) => {
      const data = { ...args };
      const newCharacter = addCharacterToFile(data);
      return newCharacter;
    },
    addEpisode: (parent, args) => {
      const data = { ...args };
      const newEpisode = addEpisodeToFile(data);
      return newEpisode;
    },
    addLocation: (parent, args) => {
      const data = { ...args };
      const newLocation = addLocationToFile(data);
      return newLocation;
    },
  },
};
export default resolvers;
