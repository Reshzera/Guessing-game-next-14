import marvelService from "../../service/marvel.service";
import { GuessingImage } from "./_components/GuessingImage";

export default async function HomeView() {
  const heroListResponse = await marvelService.getHerosList();
  const filteredHeroList = heroListResponse.data.results.filter(
    (hero) => hero.thumbnail.path !== process.env.NEXT_PUBLIC_NOT_FOUND_IMAGE
  );

  return (
    <div className="flex flex-col bg-gray-300 rounded-md py-2 px-4 gap-5">
      <h1 className="font-medium text-xl">Marvel character guessing game</h1>
      <GuessingImage heros={filteredHeroList} />
    </div>
  );
}
