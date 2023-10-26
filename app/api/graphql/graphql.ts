/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Character = {
  __typename?: 'Character';
  created?: Maybe<Scalars['String']['output']>;
  episode: Array<Maybe<Episode>>;
  gender?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  image?: Maybe<Scalars['String']['output']>;
  location?: Maybe<Location>;
  name?: Maybe<Scalars['String']['output']>;
  origin?: Maybe<Location>;
  species?: Maybe<Scalars['String']['output']>;
  status?: Maybe<Scalars['String']['output']>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Episode = {
  __typename?: 'Episode';
  air_date?: Maybe<Scalars['String']['output']>;
  characters: Array<Maybe<Character>>;
  created?: Maybe<Scalars['String']['output']>;
  episode?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
};

export type Location = {
  __typename?: 'Location';
  created?: Maybe<Scalars['String']['output']>;
  dimension?: Maybe<Scalars['String']['output']>;
  id?: Maybe<Scalars['ID']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  residents: Array<Maybe<Character>>;
  type?: Maybe<Scalars['String']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCharacter?: Maybe<Character>;
  addEpisode?: Maybe<Episode>;
  addLocation?: Maybe<Location>;
};


export type MutationAddCharacterArgs = {
  gender?: InputMaybe<Scalars['String']['input']>;
  image?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  species?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['String']['input']>;
  type?: InputMaybe<Scalars['String']['input']>;
};


export type MutationAddEpisodeArgs = {
  air_date?: InputMaybe<Scalars['String']['input']>;
  episode?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
};


export type MutationAddLocationArgs = {
  dimension?: InputMaybe<Scalars['String']['input']>;
  name: Scalars['String']['input'];
  type?: InputMaybe<Scalars['String']['input']>;
};

export type Query = {
  __typename?: 'Query';
  character?: Maybe<Character>;
  characters?: Maybe<Array<Maybe<Character>>>;
  episode?: Maybe<Episode>;
  episodes?: Maybe<Array<Maybe<Episode>>>;
  location?: Maybe<Location>;
  locations?: Maybe<Array<Maybe<Location>>>;
};


export type QueryCharacterArgs = {
  id: Scalars['ID']['input'];
};


export type QueryEpisodeArgs = {
  id: Scalars['ID']['input'];
};


export type QueryLocationArgs = {
  id: Scalars['ID']['input'];
};
