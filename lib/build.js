"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var fs = require('fs-extra');

var _require = require('child_process'),
    execSync = _require.execSync;

console.clear();
(0, _asyncToGenerator2["default"])(
/*#__PURE__*/
_regenerator["default"].mark(function _callee() {
  var path;
  return _regenerator["default"].wrap(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          path = 'lib';
          console.log('Removing old build...');
          fs.removeSync(path);
          console.log('Generating new build for production...');
          execSync('mkdir ' + path);
          execSync('babel -d ' + path + ' src -s');
          fs.copyFile('src/styles.css', 'lib/styles.css', function (err) {
            if (err) throw err;
            console.log('Production build is ready!');
          });

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _callee);
}))();
//# sourceMappingURL=build.js.map