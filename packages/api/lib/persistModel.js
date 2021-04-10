"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const itemList_1 = require("./itemList");
const mongodb_1 = require("mongodb");
async function persistModel(buildings, items) {
    const mongoStr = 'mongodb://localhost:27017/simcity';
    const client = new mongodb_1.MongoClient(mongoStr, { useUnifiedTopology: true });
    try {
        client.connect();
        const buildingsCollection = client.db().collection('building');
        const { ops: buildingsDb } = await buildingsCollection.insertMany(buildings);
        //
        const itemsCollection = client.db().collection('item');
        const itemsWithBuildings = items.map((p) => {
            const building = buildingsDb.find((a) => a.name === p.building.name);
            return Object.assign(Object.assign({}, p), { building: building._id });
        });
        const { ops: itemsDb } = await itemsCollection.insertMany(itemsWithBuildings);
        const itemsWithDepends = itemsDb.map((a) => {
            const { depends } = a;
            const dependsWithId = depends.map((b) => {
                const itemId = itemsDb.find((c) => c.name === b.item.name);
                return Object.assign(Object.assign({}, b), { item: itemId._id });
            });
            return Object.assign(Object.assign({}, a), { depends: dependsWithId });
        });
        const itemPromises = itemsWithDepends.map(async (a) => {
            const { _id } = a, rest = __rest(a, ["_id"]);
            return await itemsCollection.updateOne({ _id: { $eq: _id } }, { $set: rest });
        });
        await Promise.all(itemPromises);
        // const userCollection = client.db().collection('user');
        // await userCollection.insertMany(userList);
    }
    catch (e) {
        console.error(e);
        throw e;
    }
    finally {
        await client.close();
    }
    // const calculateItems: IItemPrint[] = profit(buildings, items.filter(p => p.level <= 21));
    // renderTable(calculateItems)
}
persistModel(itemList_1.buildingsList, itemList_1.itemsList);
