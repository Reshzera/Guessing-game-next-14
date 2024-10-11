import md5 from "md5";
import httpClient from "./httpClient";
import { HeroListResponse } from "./responses/getHeroList";

class MarvelService {
  private generateAuthParams() {
    const ts = new Date().getTime();
    const privateKey = process.env.NEXT_PUBLIC_MARVEL_PRIVATE_KEY;
    const publicKey = process.env.NEXT_PUBLIC_MARVEL_PUBLIC_KEY;
    const hash = md5(`${ts}${privateKey}${publicKey}`);

    return `ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  }

  async getHerosList() {
    const res = await httpClient.get<HeroListResponse>(
      `/v1/public/characters?${this.generateAuthParams()}`
    );

    return res;
  }
}

export default new MarvelService();
