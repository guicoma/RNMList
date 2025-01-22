import { extractArrayURLIds, extractURLId, isEmpty } from "../utils"

const validURLs = [
    "https://rickandmortyapi.com/api/location/1",
    "https://rickandmortyapi.com/api/episode/25",
    "https://rickandmortyapi.com/api/character/300"
];
const validURLIDs = ["1", "25", "300"];

const invalidURLs = [
    "https://rickandmortyapi.com/api/location/",
    "https://rickandmortyapi.com/api/episode/abc",
    "https://rickandmortyapi.com/api/123/1",
    "",
    "someRandomString"
];

describe('Utility functions tests', () => {
    it('should return true if string is empty', () => {
        expect(isEmpty('')).toStrictEqual(true)
        expect(isEmpty(' ')).toStrictEqual(true)
    })
    
    it('should extract ID from empty string', () => {
        expect(()=> {
            extractURLId('')
        }).toThrow('Invalid URL: "".');
    })
    
    it('should throw when extracting ID from an invalid string', () => {
        let invalidString = invalidURLs[0]
        expect(()=> {
            extractURLId(invalidString)
        }).toThrow(`Invalid URL: "${invalidString}".`);
    })
    
    it('should return an empty array when extracting last item (IDS) from an empty array', () => {
        expect(extractArrayURLIds([])).toEqual([])
    });
    
    it('should extract last item (IDS) from an array of URLS', () => {
        expect(extractArrayURLIds(validURLs)).toHaveLength(validURLs.length);
        expect(extractArrayURLIds(validURLs)).toEqual(validURLIDs);
    });
    
    it('should extract last item (IDS) from an array with one or more invalid string', () => {
        const testArray = [...validURLs, ...invalidURLs]
        expect(extractArrayURLIds(invalidURLs)).toHaveLength(0);
        expect(extractArrayURLIds(testArray)).toHaveLength(validURLs.length);
        expect(extractArrayURLIds(testArray)).toEqual(validURLIDs);
    });
})

