"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { Hero } from "../../../../service/responses/getHeroList";
import Autocomplete from "../Autocomplete";

const blurLevels = [80, 40, 20, 10, 5, 0];

type GuessingImageProps = {
  heros: Hero[];
};

enum GameStatus {
  PLAYING = "playing",
  WIN = "win",
}

type StatusMessage = {
  buttonText: string;
  message: string;
};

const StatusMessage: Record<GameStatus, StatusMessage> = {
  [GameStatus.PLAYING]: {
    buttonText: "Submit",
    message: "Guess the hero's name",
  },
  [GameStatus.WIN]: {
    buttonText: "Play again",
    message: "You guessed correctly!",
  },
};

export function GuessingImage({ heros }: GuessingImageProps) {
  const [hero, setHero] = useState<Hero | undefined>();
  const [gameStatus, setGameStatus] = useState<GameStatus>(GameStatus.PLAYING);
  const [blurLevelIndex, setBlurLevelIndex] = useState(0);

  const inputRef = useRef<HTMLInputElement>(null);

  const imageUrl = hero
    ? `${hero.thumbnail.path}.${hero.thumbnail.extension}`
    : "/";
  const blur = blurLevels[blurLevelIndex];
  const imageEncoded = encodeURIComponent(imageUrl);
  const blurredImageUrl = `/api/blur-image?url=${imageEncoded}&blur=${blur}`;

  const options = heros.map((hero) => hero.name);

  const handleSubmit = () => {
    if (!inputRef.current) return;

    const inputValue = inputRef.current.value.trim();

    // Reset the game
    if (gameStatus === GameStatus.WIN) {
      setGameStatus(GameStatus.PLAYING);
      setBlurLevelIndex(0);
      handleRandomHero();
      inputRef.current.value = "";
      return;
    }

    // Win condition
    if (inputValue.toLowerCase() === hero?.name.toLowerCase()) {
      setGameStatus(GameStatus.WIN);
      setBlurLevelIndex(blurLevels.length);
      return;
    }

    // Incorrect guess: reduce blur level
    setBlurLevelIndex((prevIndex) => {
      const nextIndex = prevIndex + 1;
      return nextIndex < blurLevels.length ? nextIndex : prevIndex;
    });
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [heros]);

  return (
    <div className="flex flex-col gap-3 w-full items-center justify-center">
      <h2>{StatusMessage[gameStatus].message}</h2>

      <Image
        className="rounded-md"
        src={blurredImageUrl}
        alt={hero?.name || "Hero"}
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
        {StatusMessage[gameStatus].buttonText}
      </button>
    </div>
  );
}
