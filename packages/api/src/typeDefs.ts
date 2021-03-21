import path from 'path';
import { mergeTypes, fileLoader } from 'merge-graphql-schemas';

const types = fileLoader(path.join(__dirname, '**/*Types.**'));

const flatTypes = mergeTypes(types, { all: true });
//
export default flatTypes;
