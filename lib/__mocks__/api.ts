import { Character, Episode, Location, PagedCharacter } from "@/types"

export const mockCharacter: Character = {
    "id": 1,
    "name": "Rick Sanchez",
    "status": "Alive",
    "species": "Human",
    "type": "",
    "gender": "Male",
    "origin": {
        "name": "Earth",
        "url": "https://rickandmortyapi.com/api/location/1"
    },
    "location": {
        "name": "Earth",
        "url": "https://rickandmortyapi.com/api/location/20"
    },
    "image": "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
    "episode": [
        "https://rickandmortyapi.com/api/episode/1",
        "https://rickandmortyapi.com/api/episode/2",
    ],
    "url": "https://rickandmortyapi.com/api/character/1",
    "created": "2017-11-04T18:48:46.250Z"
};

export const mockLocation: Location = {
    "id": 1,
    "name": "Citadel of Ricks",
    "type": "Space station",
    "dimension": "unknown",
    "residents": [
      "https://rickandmortyapi.com/api/character/8",
      "https://rickandmortyapi.com/api/character/14"
    ],
    "url": "https://rickandmortyapi.com/api/location/3",
    "created": "2017-11-10T13:08:13.191Z"
};

export const mockEpisode: Episode = {
    "id": 1,
    "name": "The Ricklantis Mixup",
    "air_date": "September 10, 2017",
    "episode": "S03E07",
    "characters": [
        "https://rickandmortyapi.com/api/character/1",
        "https://rickandmortyapi.com/api/character/2"
    ],
    "url": "https://rickandmortyapi.com/api/episode/28",
    "created": "2017-11-10T12:56:36.618Z"
};

export const mockPagedCharacter: PagedCharacter = {
    "info": {
        "count": 826,
        "pages": 42,
        "next": "https://rickandmortyapi.com/api/character/?page=2",
        "prev": null
    },
    "results": [mockCharacter]
}

export const getPagedCharacters = async (page: number): Promise < PagedCharacter > => {
    return new Promise((resolve, reject) => {
        process.nextTick(() =>
            page > 42
                ? reject()
                : resolve(mockPagedCharacter))
    })
}

export const getCharacter = async (id: string): Promise < Character > => {
    return new Promise((resolve, reject) => {
        process.nextTick(() =>
            id != "1"
                ? reject()
                : resolve(mockCharacter))
    })
}

export const getCharacters = async (ids:string[]):Promise<Character[]> => {
    return new Promise((resolve, reject) => {
        process.nextTick(() =>
            ids.length == 0
                ? reject()
                : resolve([mockCharacter]))
    })
}

export const getLocation = async (id:string):Promise<Location> => {
    return new Promise((resolve, reject) => {
        process.nextTick(() =>
            id != '1'
                ? reject()
                : resolve(mockLocation))
    })
}

export const getEpisode = async (id:string):Promise<Episode> => {
    return new Promise((resolve, reject) => {
        process.nextTick(() =>
            id != '1'
                ? reject()
                : resolve(mockEpisode))
    })
}