import React from "react";
interface PropTitleOwners {
  titleName: string;
}
const TitleOwner: React.FC<PropTitleOwners> = ({ titleName }) => {
  return (
    <>
      <h1 style={{ fontFamily: "var(--kv-font-sans-serif)", color: "var(--color-title)" }}>
        {titleName}
      </h1>
    </>
  );
};

export default TitleOwner;
