import styled from "@emotion/styled";

import { getWord, getColor } from "../lib/words";

const Item = ({
  num,
  seed,
  revealed,
  handleWordClick,
  isNsfw,
  isSpyMaster,
}) => {
  let color = "";
  if (isSpyMaster) {
    color = revealed ? "green" : getColor(seed, num);
  } else {
    color = revealed ? getColor(seed, num) : "";
  }
  return (
    <ItemWrapper>
      <Word color={color} onClick={() => handleWordClick(num)}>
        <FakeLink>{getWord(seed, num, isNsfw)}</FakeLink>
      </Word>
    </ItemWrapper>
  );
};

export default function Board({
  seed,
  handleWordClick,
  revealedWords,
  isSpyMaster,
  isNsfw,
}) {
  const array = Array(25).fill();
  return (
    <BoardWrapper>
      {array.map((_val, num) => (
        <Item
          key={num}
          num={num}
          seed={seed}
          handleWordClick={handleWordClick}
          revealed={revealedWords.has(num)}
          isSpyMaster={isSpyMaster}
          isNsfw={isNsfw}
        />
      ))}
    </BoardWrapper>
  );
}

const colorMap = {
  blue: "rgb(84, 120, 177)",
  beige: "rgb(209, 187, 163)",
  red: "rgb(202, 64, 95)",
  green: "rgb(121, 142, 92)",
  gray: "#6c757d",
};

const BoardWrapper = styled("div")`
  border: #ca405f;
  border-style: solid;
  border-radius: 8px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  margin: 10px;
`;

const Word = styled("div")`
  border-radius: 5px;
  border: 2px #dddddd solid;
  height: 100%;
  width: 100%;
	line-height : 99%;
  background-color: ${(props) => colorMap[props.color]} !important;

  /* Internet Explorer 10 */
  display: -ms-flexbox;
  -ms-flex-pack: center;
  -ms-flex-align: center;

  /* Firefox */
  display: -moz-box;
  -moz-box-pack: center;
  -moz-box-align: center;

  /* Safari, Opera, and Chrome */
  display: -webkit-box;
  -webkit-box-pack: center;
  -webkit-box-align: center;

  /* W3C */
  display: box;
  box-pack: center;
  box-align: center;

  &:hover {
    background: beige;
  }
  padding: 40px 10px;
  font-size: 1.3em !important;
  @media only screen and (max-width: 600px) {
    padding: 10px 10px;
    font-size: 1em !important;
  }
}
`;

const ItemWrapper = styled("div")`
  min-width: 20%;
  display: inline-block;
`;

const FakeLink = styled("a")`
  text-transform: uppercase;
  color: black;
  font-weight: bold;
  &:link,
  &:visited,
  &:active {
    color: black;
  }
`;
