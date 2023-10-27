import type { Character } from "../api/graphql/graphql";
import Image from "next/image";

const Character = (props: Character) => {
  const { name, image } = props;
  return (
    <article className="character">
      <Image src={image ?? ""} alt={name ?? ""} width={300} height={300} />
      <div className="character-footer">
        <h3>{name}</h3>
      </div>
    </article>
  );
};
export default Character;
