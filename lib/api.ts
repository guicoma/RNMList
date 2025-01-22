import { Character, Episode, Location, PagedCharacter } from "@/types";

const apiBasePath = 'https://rickandmortyapi.com/api';

const fetchFromApi = async <T>(endpoint: string): Promise<T> => {
    const response = await fetch(`${apiBasePath}${endpoint}`);
    if (!response.ok) throw new Error("error fetching");
    const json = await response.json();
    return json;
}

export const getPagedCharacters = async (page:number):Promise<PagedCharacter> => {
    return fetchFromApi<PagedCharacter>(`/character/?page=${page}`);
}

export const getCharacter = async (id:string):Promise<Character> => {
    return fetchFromApi<Character>(`/character/${id}`);
}

export const getCharacters = async (ids:string[]):Promise<Character[]> => {
    const json = await fetchFromApi<Character | Character[]>(`/character/${ids.join(',')}`);
    return (ids.length === 1) ? [json as Character] : json as Character[];
}

export const getLocation = async (id:string):Promise<Location> => {
    return fetchFromApi<Location>(`/location/${id}`);
}

export const getEpisode = async (id:string):Promise<Episode> => {
    return fetchFromApi<Episode>(`/episode/${id}`);
}