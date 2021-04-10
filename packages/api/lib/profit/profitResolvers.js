"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const resolvers = {
    Query: {
        async profits(_, _args, context) {
            const { dataSources } = context;
            const { profit } = dataSources;
            return profit.getAll();
        },
        async profit(_, args, context) {
            const { dataSources } = context;
            const { profit } = dataSources;
            return profit.findById(args._id);
        },
    },
    Mutation: {
        async addProfit(_, args, context) {
            const { dataSources } = context;
            const { profit } = dataSources;
            return profit.addProfit(args);
        },
        async addItemToProfit(_, args, context) {
            const { dataSources } = context;
            const { profitItem, item } = dataSources;
            const response = await profitItem.addProfitItem(args.profit, args.item);
            const profitItemElm = await item.findById(args.item);
            return Object.assign(Object.assign({}, response), { item: profitItemElm });
        },
        async delItemFromProfit(_, args, context) {
            const { dataSources } = context;
            const { profitItem } = dataSources;
            return profitItem.removeById(args._id);
        },
        async editProfit(_, args, context) {
            const { dataSources } = context;
            const { profit } = dataSources;
            return profit.editProfit(args);
        },
        async delProfit(_, args, context) {
            const { dataSources } = context;
            const { profit } = dataSources;
            return profit.delProfit(args._id);
        },
    },
};
exports.default = resolvers;
