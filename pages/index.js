import { useState } from "react";
import Head from "next/head";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import Board from "../components/board";
import { getScore } from "../lib/words";

const MAX_DEFAULT = 100000;
const initialSeed = `${Math.floor(Math.random() * Math.floor(MAX_DEFAULT))}`;

export default function CodeNames() {
  const { register, watch } = useForm({ defaultValues: { seed: initialSeed } });

  const [revealedWords, setRevealedWords] = useState(new Set());
  const [isSpyMaster, setIsSpyMaster] = useState(false);
  const [isNsfw, setIsNsfw] = useState(false);
  const watchSeed = watch("seed") || "";

  const handleWordClick = (num) => {
    const updatedRevealedWords = new Set(revealedWords);
    updatedRevealedWords.add(num);
    setRevealedWords(updatedRevealedWords);
  };

  const handleReset = (newSpyMasterState = false) => {
    setRevealedWords(new Set());
    setIsSpyMaster(newSpyMasterState);
  };
  const getScoreString = (color) => {
    const score = getScore(watchSeed, revealedWords);
    const colorScore = score[color];
    return colorScore ? colorScore : "Winner!";
  };
  return (
    <Wrapper>
      <Head>
        <title>Codenames</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <TopRow>
        {["blue", "red"].map((color) => {
          return <OneScore color={color}>{getScoreString(color)}</OneScore>;
        })}
        <Seed
          onChange={() => handleReset()}
          name="seed"
          placeholder="seed"
          ref={register}
        />
        <Form.Check
          value={isNsfw}
          onClick={() => {
            setIsNsfw(!isNsfw);
            setRevealedWords(new Set());
          }}
          label="NSFW"
        />
        <Reset variant="danger" onClick={() => handleReset()}>
          Reset
        </Reset>
        <SpyMaster variant="secondary" onClick={() => handleReset(true)}>
          SpyMaster
        </SpyMaster>
      </TopRow>
      <a></a>
      <Board
        seed={watchSeed}
        revealedWords={revealedWords}
        handleWordClick={handleWordClick}
        isSpyMaster={isSpyMaster}
        isNsfw={isNsfw}
      />
      <Footer>
        <GithubLink
          href="https://github.com/scefali/nextjs-codenames"
          target="_blank"
        >
          github.com/scefali/nextjs-codenames
        </GithubLink>
      </Footer>
    </Wrapper>
  );
}

const OneScore = styled("span")`
  color: ${(props) => props.color};
  font-size: 2em;
  flex-grow: 1;
  text-align: center;
  @media only screen and (max-width: 600px) {
    font-size: 1.5em !important;
  }
`;

const TopRow = styled("div")`
  display: flex;
  align-items: center;
  margin: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
`;

const Seed = styled("input")`
  margin: 5px;
  max-width: 12%;
  min-width: 100px;
`;

const Reset = styled(Button)`
  margin: 5px;
`;

const SpyMaster = styled(Button)`
  margin: 5px;
  margin-right: 50px;
`;

const Wrapper = styled("div")`
  font-size: 1.4em;
`;

const Footer = styled("div")`
  float: right;
  margin-right: 50px;
`;

const GithubLink = styled("a")`
  font-size: 0.8em;
`;
