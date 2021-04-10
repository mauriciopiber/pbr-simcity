"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = __importDefault(require("path"));
const merge_graphql_schemas_1 = require("merge-graphql-schemas");
const resolvers = merge_graphql_schemas_1.fileLoader(path_1.default.join(__dirname, '**/*Resolvers.**'));
exports.default = merge_graphql_schemas_1.mergeResolvers(resolvers);
