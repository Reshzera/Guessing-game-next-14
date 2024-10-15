"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Hero } from "../../../../service/responses/getHeroList";
import Autocomplete from "../Autocomplete";

type GuessingImageProps = {
  heros: Hero[];
};

const numberBlurMapper: Record<number, string> = {
  12: "blur-md",
  8: "blur",
  4: "blur-sm",
};

enum GameStatus {
  PLAYING = "playing",
  WIN = "win",
}

type StatusMessage = {
  butonText: string;
  message: string;
};

const StatusMessage: Record<GameStatus, StatusMessage> = {
  [GameStatus.PLAYING]: {
    butonText: "Submit",
    message: "Guess the hero name",
  },
  [GameStatus.WIN]: {
    butonText: "Play again",
    message: "You win!",
  },
};

export function GuessingImage({ heros }: GuessingImageProps) {
  const [blurLevel, setBlurLevel] = useState<number>(12);
  const [hero, setHero] = useState<Hero | undefined>();
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PLAYING);

  const inputRef = useRef<HTMLInputElement>(null);
  const imageUrl = !!hero
    ? `${hero?.thumbnail.path}.${hero?.thumbnail.extension}`
    : "/";

  const options = heros.map((hero) => hero.name);

  const blurClass =
    numberBlurMapper[blurLevel as keyof typeof numberBlurMapper];

  const handleSubmit = () => {
    if (!inputRef.current) return;

    const inputValue = inputRef.current.value;

    //Reset game
    if (gameStatus === GameStatus.WIN) {
      setGameStatus(GameStatus.PLAYING);
      setBlurLevel(12);
      handleRandomHero();
      inputRef.current.value = "";
      return;
    }

    //Win condition
    if (inputValue === hero?.name) {
      setBlurLevel(0);
      setGameStatus(GameStatus.WIN);
      return;
    }

    //Wrong answer
    setBlurLevel((prev) => (prev > 0 ? prev - 4 : prev));
  };

  const handleRandomHero = () => {
    const randomIndex = Math.floor(Math.random() * heros.length);
    setHero(heros[randomIndex]);
  };

  const handleChangeAutocomplete = (value: string) => {
    if (!inputRef.current) return;

    inputRef.current.value = value;
  };

  useEffect(() => {
    handleRandomHero();
  }, [heros]);

  useEffect(() => {
    console.log("Hero changed", hero?.name);
  }, [hero]);

  return (
    <div className="flex flex-col gap-3 w-full items-center justify-center">
      <h2>{StatusMessage[gameStatus].message}</h2>

      <Image
        className={`rounded-md ${blurClass}`}
        src={imageUrl}
        alt={`${hero?.name}`}
        width={200}
        height={200}
      />

      <Autocomplete
        options={options}
        ref={inputRef}
        handleChange={handleChangeAutocomplete}
      />

      <button
        className="bg-blue-500 text-white p-2 rounded-md w-full"
        onClick={handleSubmit}
      >
        {StatusMessage[gameStatus].butonText}
      </button>
    </div>
  );
}
