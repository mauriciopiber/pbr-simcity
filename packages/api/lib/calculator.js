"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.profit = exports.dependency = void 0;
function toFixedNumber(num, digits, base) {
    const pow = Math.pow(base || 10, digits);
    return Math.round(num * pow) / pow;
}
function dependency(items) {
    const cost = items.reduce(function (a, b) {
        var _a;
        const maxValue = ((_a = b === null || b === void 0 ? void 0 : b.item) === null || _a === void 0 ? void 0 : _a.maxValue) || 0;
        return a + maxValue * b.quantity;
    }, 0);
    const time = items.reduce(function (a, b) {
        var _a;
        const maxTime = ((_a = b === null || b === void 0 ? void 0 : b.item) === null || _a === void 0 ? void 0 : _a.productionTime) || 0;
        return a + maxTime;
    }, 0);
    return {
        cost,
        time,
    };
}
exports.dependency = dependency;
function profit(items) {
    const calculateItems = items.map((item) => {
        const maxValue = item.maxValue;
        const dependencyValues = dependency(item.depends);
        // const productionTime = item.productionTime + dependencyValues.time;
        const productionTime = item.productionTime;
        const cost = dependencyValues.cost;
        const profit = maxValue - cost;
        const profitByMinute = toFixedNumber(profit / productionTime, 2, 10);
        const profitByHour = toFixedNumber((profit / productionTime) * 60, 2, 10);
        return {
            name: item.name,
            time: productionTime,
            maxValue,
            cost,
            profit: profit,
            profitByMinute: profitByMinute,
            profitByHour: profitByHour,
        };
    });
    return calculateItems;
}
exports.profit = profit;
