export type CharacterStatus = 'Alive' | 'Dead' | 'unknown';
export type CharacterLocation = {
    name: string,
    url: string
}
export type Character = {
    id: number,
    name: string,
    status: CharacterStatus,
    species: string,
    type: string,
    gender: string,
    origin: CharacterLocation,
    location: CharacterLocation,
    image: string,
    episode: string[],
    url: string,
    created: string,
};
export type PagedCharacter = {
    info: {
        count: number,
        pages: number,
        next: string | null,
        prev: string | null
    },
    results : Character[]
}


export type Episode = {
    id:	number,
    name: string,
    air_date: string,
    episode: string,
    characters:	string[],
    url: string,
    created: string,
};

export type Location = {
    id:	number,
    name: string,
    type: string,
    dimension: string,
    residents: string[],
    url: string,
    created: string,
};

export type LocationParams = {
    id: string,
};