"use client";

import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { Hero } from "../../../../service/responses/getHeroList";
import Autocomplete from "../Autocomplete";

type GuessingImageProps = {
  hero: Hero;
  options: string[];
};

const numberBlurMapper = {
  12: "blur-md",
  8: "blur",
  4: "blur-sm",
};

export function GuessingImage({ hero, options }: GuessingImageProps) {
  const [blurLevel, setBlurLevel] = useState(12);

  const inputRef = useRef<HTMLInputElement>(null);
  const imageUrl = `${hero.thumbnail.path}.${hero.thumbnail.extension}`;

  const handleSubmit = () => {
    if (!inputRef.current) return;

    const inputValue = inputRef.current.value;

    if (inputValue === hero.name) {
      alert("Correct!");
      return;
    }

    setBlurLevel((prev) => (prev > 0 ? prev - 4 : prev));
  };

  const handleChangeAutocomplete = (value: string) => {
    if (!inputRef.current) return;

    inputRef.current.value = value;
  };

  const blurClass = useMemo(
    () => numberBlurMapper[blurLevel as keyof typeof numberBlurMapper],
    [blurLevel]
  );

  return (
    <div className="flex flex-col gap-3 w-full items-center justify-center">
      <Image
        className={`rounded-md ${blurClass}`}
        src={imageUrl}
        alt={hero.name}
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
        Submit
      </button>
    </div>
  );
}
