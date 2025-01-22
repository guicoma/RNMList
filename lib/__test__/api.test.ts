import * as API from "@/lib/api";
import { mockCharacter, mockLocation, mockPagedCharacter } from "../__mocks__/api";

jest.mock('../api');

describe('API tests', () => {

    it('should return paged characters', async () => {
        const result = await API.getPagedCharacters(1);
        expect(result).toEqual(mockPagedCharacter);
    });

    it('should return a character', async () => {
        const result = await API.getCharacter('1');
        expect(result).toEqual(mockCharacter);
    });

    it.failing('if getCharacter of an invalid id', async () => {
        const result = await API.getCharacter('6');
        expect(result).toEqual(mockCharacter);
    });

    it('should return multiple characters', async () => {
        const result = await API.getCharacters(['1', '2']);
        expect(result).toEqual([mockCharacter]);
    });

    it.failing('if requesting getCharacters of an empty array', async () => {
        const result = await API.getCharacters([]);
        expect(result).toEqual([mockCharacter]);
    });

    it('should return a location', async () => {
        const result = await API.getLocation('1');
        expect(result).toEqual(mockLocation);
    });

    it.failing('if getLocation of an invalid id', async () => {
        const result = await API.getLocation('0');
        expect(result).toEqual(mockLocation);
    });

});