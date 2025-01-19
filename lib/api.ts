import { Character, Episode, Location, PagedCharacter } from "@/types";

const apiBasePath = 'https://rickandmortyapi.com/api';

export const getPagedCharacters = async (page:number):Promise<PagedCharacter> => {
    try {
        const response = await fetch(`${apiBasePath}/character/?page=${page}`);
        if (response.status !== 200) throw new Error("error fetching");
        const json = await response.json();
        return json;
    } catch (error) {
        throw new Error("error fetching");
    }
}

export const getCharacter = async (id:string):Promise<Character> => {
    try {
        const response = await fetch(`${apiBasePath}/character/${id}`);
        if (response.status !== 200) throw new Error("error fetching");
        const json = await response.json();
        return json;
    } catch (error) {
        throw new Error("error fetching character");
    }
}

export const getCharacters = async (ids:string[]):Promise<Character[]> => {
    const response = await fetch(`${apiBasePath}/character/${ids.join(',')}`);
    const json = await response.json();
    return (ids.length === 1)? [json]:json;
}

export const getLocation = async (id:string):Promise<Location> => {
    const response = await fetch(`${apiBasePath}/location/${id}`);
    const json = await response.json();
    return json;
}

export const getEpisode = async (id:string):Promise<Episode> => {
    const response = await fetch(`${apiBasePath}/episode/${id}`);
    const json = await response.json();
    return json;
}