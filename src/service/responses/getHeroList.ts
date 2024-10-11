interface Url {
  type: string;
  url: string;
}

interface Thumbnail {
  path: string;
  extension: string;
}

interface ComicItem {
  resourceURI: string;
  name: string;
}

interface Comics {
  available: number;
  returned: number;
  collectionURI: string;
  items: ComicItem[];
}

interface StoryItem {
  resourceURI: string;
  name: string;
  type: string;
}

interface Stories {
  available: number;
  returned: number;
  collectionURI: string;
  items: StoryItem[];
}

interface EventItem {
  resourceURI: string;
  name: string;
}

interface Events {
  available: number;
  returned: number;
  collectionURI: string;
  items: EventItem[];
}

interface SeriesItem {
  resourceURI: string;
  name: string;
}

interface Series {
  available: number;
  returned: number;
  collectionURI: string;
  items: SeriesItem[];
}

export interface Hero {
  id: number;
  name: string;
  description: string;
  modified: Date;
  resourceURI: string;
  urls: Url[];
  thumbnail: Thumbnail;
  comics: Comics;
  stories: Stories;
  events: Events;
  series: Series;
}

interface Data {
  offset: number;
  limit: number;
  total: number;
  count: number;
  results: Hero[];
}

export interface HeroListResponse {
  code: number;
  status: string;
  copyright: string;
  attributionText: string;
  attributionHTML: string;
  data: Data;
  etag: string;
}
