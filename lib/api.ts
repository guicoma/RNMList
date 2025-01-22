import { Character, Episode, Location, PagedCharacter } from "@/types";

const apiBasePath = 'https://rickandmortyapi.com/api';

const fetchFromApi = async <Type>(endpoint: string): Promise<Type> => {
    const response = await fetch(`${apiBasePath}${endpoint}`);
    if (!response.ok) throw new Error("error fetching");
    const json = await response.json();
    return json;
}

export const getPagedCharacters = async (page: number): Promise<PagedCharacter> => {
    return fetchFromApi<PagedCharacter>(`/character/?page=${page}`);
}

export const getCharacter = async (id: string): Promise<Character> => {
    return fetchFromApi<Character>(`/character/${id}`);
}

export const getCharacters = async (ids: string[]): Promise<Character[]> => {
    const json = await fetchFromApi<Character | Character[]>(`/character/${ids.join(',')}`);
    return (ids.length === 1) ? [json as Character] : json as Character[];
}

export const getLocation = async (id: string): Promise<Location> => {
    return fetchFromApi<Location>(`/location/${id}`);
}

export const getEpisode = async (id: string): Promise<Episode> => {
    return fetchFromApi<Episode>(`/episode/${id}`);
}

export const searchCharacter = async (params: SearchParams): Promise<PagedCharacter> => {
    let query = '';
    console.log(params);
    Object.entries(params).map((item) => {
        console.log(item);
        query += `${item.join('=')}&`
    })
    return fetchFromApi<PagedCharacter>(`/character/?${query}`)
}