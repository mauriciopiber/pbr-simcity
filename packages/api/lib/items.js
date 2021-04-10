"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const itemList_1 = require("./itemList");
const calculator_1 = require("./calculator");
const cli_table_1 = __importDefault(require("cli-table"));
function renderTable(items) {
    // instantiate
    var table = new cli_table_1.default({
        head: [
            'Item',
            'Time',
            'Max Value',
            'Cost',
            'Profit',
            'Per Min',
            'Per Hour',
        ],
        colWidths: [50, 10, 10, 10, 10, 10, 10],
    });
    const renderData = items.map((p) => Object.values(p));
    table.push(...renderData);
}
function calculateProfit(items) {
    const calculateItems = calculator_1.profit(items.filter((p) => p.level <= 21));
    renderTable(calculateItems);
}
calculateProfit(itemList_1.itemsList);
