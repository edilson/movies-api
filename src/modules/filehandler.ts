import { dataDirectory } from '../config';
import { promises as fs, existsSync } from 'fs';
import path from 'path';

export async function getTypes(): Promise<string[]> {
  const typesAvailable = await fs.readdir(dataDirectory(''));

  return typesAvailable;
}

export async function listElements(type: string): Promise<string[] | null> {
  const existsType = existsSync(dataDirectory(type));

  if (!existsType) {
    throw new Error(`Type ${type} doesn't exist.`);
  }

  const elements = await fs.readdir(dataDirectory(type));

  if (type !== 'movies') {
    const namesWithoutSlugify = elements.map(nameFound => {
      const splitedName = nameFound.split('-').join(' ').split('.json');

      const capitalizedName = splitedName[0].replace(
        /\b(\w)/g,
        nameFoundCapitalized => nameFoundCapitalized.toUpperCase()
      );

      return capitalizedName;
    });

    return namesWithoutSlugify;
  }

  return elements;
}

export async function getElement(
  type: string,
  name: string
): Promise<Record<string, any>> {
  let filePath = path.join(dataDirectory(type), `${name}.json`).normalize();

  if (type === 'movies') {
    const yearAndNameSplited = name.split('_');

    const movieYear = yearAndNameSplited[0];
    const movieName = yearAndNameSplited[1];

    filePath = path
      .join(dataDirectory(type), `${movieYear}`, `${movieName}.json`)
      .normalize();
  }

  const fileExists = existsSync(filePath);

  if (!fileExists) {
    throw new Error(`Element ${type}/${name} not found`);
  }

  const file = await fs.readFile(filePath);

  try {
    const fileContent = JSON.parse(file.toString('utf-8'));

    return fileContent;
  } catch (error) {
    throw new Error(`Error trying to parse JSON of element ${type}/${name}`);
  }
}
