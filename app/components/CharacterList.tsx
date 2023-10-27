import Character from "./Character";
import type { Character as CharacterType } from "../api/graphql/graphql";

interface CharacterListProps {
  characters: CharacterType[];
}
const CharacterList = ({ characters }: CharacterListProps) => {
  if (characters.length < 1) {
    return (
      <section className="section">
        <h2 className="section-title">
          no characters matched your search criteria
        </h2>
      </section>
    );
  }
  return (
    <section className="section">
      <h1 className="section-title">characters</h1>
      <div className="characters-center">
        {characters.map((item) => {
          return <Character key={item.id} {...item} />;
        })}
      </div>
    </section>
  );
};
export default CharacterList;
