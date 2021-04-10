"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function createRepository(client) {
    const dataSources = {};
    // Load `*.js` under current directory as properties
    //  i.e., `User.js` will become `exports['User']` or `exports.User`
    fs_1.default.readdirSync(path_1.default.join(__dirname)).forEach((dir) => {
        if (dir.match(/\.(ts|js)$/)) {
            return;
        }
        fs_1.default.readdirSync(path_1.default.join(__dirname, dir)).forEach((file) => {
            // console.log(file);
            if (file.match(/Repository.(ts|js)$/) !== null
                && file !== 'index.ts'
                && file !== 'index.js') {
                // eslint-disable-next-line @typescript-eslint/no-var-requires
                const classRepository = require(path_1.default.resolve(__dirname, dir, file));
                if (!classRepository.default) {
                    return;
                }
                const name = classRepository.default.name.replace('Repository', '');
                const className = name.charAt(0).toLocaleLowerCase() + name.slice(1);
                dataSources[className] = new classRepository.default(client.db().collection(className));
            }
        });
    });
    // console.log(dataSources);
    return dataSources;
}
exports.default = createRepository;
