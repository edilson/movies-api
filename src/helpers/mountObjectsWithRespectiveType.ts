export default function mountObjectsWithRespectiveType(
  elements: string[] | Record<string, any>,
  type: string
): Record<string, any> {
  if (Array.isArray(elements)) {
    const objectWithElements: Record<string, any> = {};

    objectWithElements[type] = elements;

    return objectWithElements;
  }

  const typeOnSingular = type.slice(0, -1);

  const elementReturned: Record<string, any> = {};

  elementReturned[typeOnSingular] = elements;

  return elementReturned;
}
