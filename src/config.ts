import path from 'path';

export const dataDirectory = (type: string) =>
  path.join(__dirname, '../data', type);
