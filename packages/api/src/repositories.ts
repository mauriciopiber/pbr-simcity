import fs from 'fs';
import path from 'path';

function createRepository(client: any): any {
  const dataSources: any = {};

  // Load `*.js` under current directory as properties
  //  i.e., `User.js` will become `exports['User']` or `exports.User`
  fs.readdirSync(path.join(__dirname)).forEach(function (dir) {
    if (dir.match(/\.(ts|js)$/)) {
      return;
    }

    fs.readdirSync(path.join(__dirname, dir)).forEach(function (file): void {
      if (
        file.match(/Repository.(ts|js)$/) !== null &&
        file !== 'index.ts' &&
        file !== 'index.js'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const classRepository = require(path.resolve(__dirname, dir, file));

        if (!classRepository.default) {
          return;
        }

        const name: string = classRepository.default.name.replace(
          'Repository',
          '',
        );

        const className = name.charAt(0).toLocaleLowerCase() + name.slice(1);

        dataSources[className] = new classRepository.default(
          client.db().collection(className),
        );
      }
    });
  });

  return dataSources;
}

export default createRepository;
