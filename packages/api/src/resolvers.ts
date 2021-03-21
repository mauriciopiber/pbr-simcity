import path from 'path';
import { mergeResolvers, fileLoader } from 'merge-graphql-schemas';

const resolvers = fileLoader(path.join(__dirname, '**/*Resolvers.**'));

export default mergeResolvers(resolvers);
