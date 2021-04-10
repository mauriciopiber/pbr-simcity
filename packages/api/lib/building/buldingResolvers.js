"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
    Query: {
        async buildings(_, _args, context) {
            const { dataSources } = context;
            const { building } = dataSources;
            return await building.getAll();
        },
        async building(_, args, context) {
            const { dataSources } = context;
            const { building } = dataSources;
            return await building.findOneBySlug(args.slug);
        },
    },
    Building: {
        async items(parent, _args, context) {
            const { dataSources } = context;
            const { item } = dataSources;
            const items = await item.findManyByBuilding(parent._id);
            return items;
        },
    },
};
exports.default = resolvers;
