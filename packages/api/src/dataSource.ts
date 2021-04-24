import fs from 'fs';
import path from 'path';

function createDataSource(client: any): any {
  const dataSources: any = {};

  // Load `*.js` under current directory as properties
  //  i.e., `User.js` will become `exports['User']` or `exports.User`
  fs.readdirSync(path.join(__dirname)).forEach((dir) => {
    if (dir.match(/\.(ts|js)$/)) {
      return;
    }

    fs.readdirSync(path.join(__dirname, dir)).forEach((file): void => {
      // console.log(file);
      if (
        file.match(/DataSource.(ts|js)$/) !== null
        && file !== 'index.ts'
        && file !== 'index.js'
      ) {
        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const classDataSource = require(path.resolve(__dirname, dir, file));

        if (!classDataSource.default) {
          throw new Error('DataSource without default');
        }

        const name: string = classDataSource.default.name.replace(
          'DataSource',
          '',
        );

        // eslint-disable-next-line @typescript-eslint/no-var-requires
        const classRepository = require(path.resolve(__dirname, dir, file.replace('DataSource', 'Repository')));

        if (!classRepository.default) {
          return;
        }

        // const name: string = classRepository.default.name.replace(
        //   'Repository',
        //   '',
        // );

        const className = name.charAt(0).toLocaleLowerCase() + name.slice(1);

        const repository = new classRepository.default(
          client.db().collection(className),
        );

        const dataSource = new classDataSource.default(
          repository,
        );

        dataSources[className] = dataSource;
      }
    });
  });

  // console.log(dataSources);
  return dataSources;
}

export default createDataSource;
