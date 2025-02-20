import { HttpResponse, http } from 'msw';

import { MOCK_CHARACTERS_DATA } from './mockCharacterData';

export const handlers = [
  http.get('https://rickandmortyapi.com/api/character/:id', ({ params }) => {
    const id = Array.isArray(params.id) ? params.id[0] : params.id;
    const character = MOCK_CHARACTERS_DATA[id];

    if (!character) {
      return new HttpResponse(null, { status: 404 });
    }

    return HttpResponse.json(character);
  }),
];
