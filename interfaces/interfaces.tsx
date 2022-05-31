export interface Character {
    id: number;
    name: string;
    image: {
      uri: string,
      ratio: number,
    };
    species: string;
    homeworld: string;
    status: string;
    costumeImages: image[];
  }

  interface image {
    uri: string,
    ratio: number
  }