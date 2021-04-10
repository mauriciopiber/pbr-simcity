"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function toFixedNumber(num, digits, base) {
    const pow = Math.pow(base || 10, digits);
    return Math.round(num * pow) / pow;
}
const resolvers = {
    Query: {
        async items(_, args, context) {
            const { dataSources } = context;
            const { item } = dataSources;
            console.log(args);
            return await item.findManyByFilter(args);
        },
        async item(_, args, context) {
            const { dataSources } = context;
            const { item } = dataSources;
            const model = await item.findOneBySlug(args.slug);
            return Object.assign({}, model);
            // return await item.findBySlug(args.slug);
        },
    },
    Item: {
        async building(parent, _args, context) {
            const { dataSources } = context;
            const { building } = dataSources;
            return await building.findById(parent.building);
        },
        async usedIn(parent, _args, context) {
            const { dataSources } = context;
            const { item } = dataSources;
            const { _id } = parent;
            return await item.findItemDependsById(_id);
        },
        async profit(parent, _args, context) {
            const { dataSources } = context;
            const { item } = dataSources;
            const { maxValue } = parent;
            const dependencyValues = await item.findItemDependencyCost(parent.depends);
            // const productionTime = item.productionTime + dependencyValues.time;
            const { productionTime } = parent;
            const { cost } = dependencyValues;
            const profit = maxValue - cost;
            const profitByMinute = toFixedNumber(profit / productionTime, 2, 10);
            const profitByHour = toFixedNumber((profit / productionTime) * 60, 2, 10);
            return {
                cost,
                profit,
                profitByMinute,
                profitByHour,
            };
        },
    },
    ItemDepends: {
        async item(parent, _args, context) {
            const { dataSources } = context;
            const { item } = dataSources;
            return await item.findById(parent.item);
        },
    },
};
exports.default = resolvers;
