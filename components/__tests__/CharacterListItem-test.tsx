import * as React from 'react';
import renderer from 'react-test-renderer';

import CharacterListItem from '../CharacterListItem';
import { Character } from '@/types';

const character: Character = {
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

it(`renders correctly`, () => {
  const tree = renderer.create(<CharacterListItem character={character} />).toJSON();

  expect(tree).toMatchSnapshot();
});
