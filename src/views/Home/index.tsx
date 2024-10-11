import marvelService from "../../service/marvel.service";
import { GuessingImage } from "./_components/GuessingImage";

export default async function HomeView() {
  const heroListResponse = await marvelService.getHerosList();
  const filteredHeroList = heroListResponse.data.results.filter(
    (hero) =>
      hero.thumbnail.path !==
      "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available"
  );
  const randomIndex = Math.floor(Math.random() * filteredHeroList.length);
  const chosenHero = filteredHeroList[randomIndex];
  const optionsNames = filteredHeroList.map((hero) => hero.name) ?? [];

  return (
    <div className="flex flex-col bg-gray-300 rounded-md py-2 px-4 gap-5">
      <h1 className="font-medium text-xl">Marvel character guessing game</h1>
      <GuessingImage hero={chosenHero} options={optionsNames} />
    </div>
  );
}
