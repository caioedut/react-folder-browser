const fs = require('fs-extra');
const {execSync} = require('child_process');

console.clear();

(async function () {
  const path = 'lib';

  console.log('Removing old build...');
  fs.removeSync(path);

  console.log('Generating new build for production...');
  execSync('mkdir ' + path);
  execSync('babel -d ' + path + ' src -s');

  fs.copyFile('src/styles.css', 'lib/styles.css', (err) => {
    if (err) throw err;

    console.log('Production build is ready!');
  });
})();
