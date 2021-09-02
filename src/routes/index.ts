import { Router } from 'express';

import { getTypes, listElements, getElement } from '../modules/filehandler';

import mountObjectsWithRespectiveType from '../helpers/mountObjectsWithRespectiveType';

const router = Router();

router.get('/', async (request, response) => {
  const types = await getTypes();

  return response.status(200).json({ types });
});

router.get('/:type', async (request, response) => {
  const { type } = request.params;

  const elements = await listElements(type);

  const elementsWithRespectiveType = mountObjectsWithRespectiveType(
    elements as string[],
    type
  );

  return response.status(200).json(elementsWithRespectiveType);
});

router.get('/:type/:name', async (request, response) => {
  const { type, name } = request.params;

  const detailedElement = await getElement(type, name);

  const elementReturned = mountObjectsWithRespectiveType(detailedElement, type);

  return response.status(200).json(elementReturned);
});

export default router;
