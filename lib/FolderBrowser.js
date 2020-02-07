"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.defaultProps = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("./styles.css");

var _react = _interopRequireWildcard(require("react"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var defaultProps = {
  title: 'Files',
  loading: 'Loading...',
  empty: 'No files.',
  columnName: 'Name',
  columnSize: 'Size',
  columnPreview: '',
  columnActions: '',
  buttonRefresh: {
    title: 'Refresh'
  },
  buttonUpload: {
    title: 'Upload file'
  },
  buttonDownload: {
    title: 'Download',
    target: '_blank',
    download: true
  },
  buttonDelete: {
    title: 'Delete'
  }
};
exports.defaultProps = defaultProps;

function formatBytes(bytes) {
  var decimals = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;

  if (bytes === 0) {
    return '0 Bytes';
  }

  var k = 1024;
  var dm = decimals < 0 ? 0 : decimals;
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
  var i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

var FolderBrowser = function FolderBrowser(props) {
  var _useState = (0, _react.useState)(),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      files = _useState2[0],
      setFiles = _useState2[1];

  (0, _react.useEffect)(function () {
    return setFiles(props.files);
  }, [props.files]);

  var buttonRefresh = _objectSpread({}, defaultProps.buttonRefresh, {}, props.buttonRefresh);

  var buttonUpload = _objectSpread({}, defaultProps.buttonUpload, {}, props.buttonUpload);

  var buttonDownload = _objectSpread({}, defaultProps.buttonDownload, {}, props.buttonDownload);

  var buttonDelete = _objectSpread({}, defaultProps.buttonDelete, {}, props.buttonDelete);

  function _handleFocus(e, file) {
    var $el = e.currentTarget;
    var $current = document.querySelector('.folder-browser-item-focused');
    $current && $current.classList.remove('folder-browser-item-focused');
    $el.classList.add('folder-browser-item-focused');
  }

  return _react["default"].createElement("div", {
    id: "folder-browser"
  }, _react["default"].createElement("div", {
    id: "folder-browser-header"
  }, _react["default"].createElement("div", {
    id: "folder-browser-title"
  }, props.title), _react["default"].createElement("div", {
    id: "folder-browser-buttons"
  }, _react["default"].createElement("button", (0, _extends2["default"])({
    className: "folder-browser-button",
    type: "button",
    children: buttonRefresh.title
  }, buttonRefresh)), _react["default"].createElement("label", (0, _extends2["default"])({
    className: "folder-browser-button"
  }, buttonUpload, {
    onChange: null
  }), buttonUpload.children || buttonUpload.title, _react["default"].createElement("input", {
    type: "file",
    name: "file",
    hidden: true,
    onChange: function onChange(e) {
      buttonUpload.onChange(e, e.target.files);
      e.target.value = null;
    }
  })))), _react["default"].createElement("div", {
    id: "folder-browser-body"
  }, !files ? _react["default"].createElement("div", {
    style: {
      padding: '0 15px 15px'
    }
  }, props.loading) : !files.length ? _react["default"].createElement("div", {
    style: {
      padding: '0 15px 15px'
    }
  }, props.empty) : _react["default"].createElement("table", null, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", null, props.columnPreview), _react["default"].createElement("th", null, props.columnName), _react["default"].createElement("th", null), _react["default"].createElement("th", null, props.columnSize), _react["default"].createElement("th", null, props.columnActions))), _react["default"].createElement("tbody", null, files.map(function (file, i) {
    return _react["default"].createElement("tr", {
      key: i,
      onClick: function onClick(e) {
        return _handleFocus(e, file);
      }
    }, _react["default"].createElement("td", null, ['gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'tif', 'tiff', 'webp'].some(function (ext) {
      return file.name.toLowerCase().endsWith(ext.toLowerCase());
    }) && _react["default"].createElement("div", {
      style: {
        position: 'relative',
        backgroundColor: '#eee',
        overflow: 'hidden',
        height: 38,
        width: 38
      }
    }, _react["default"].createElement("img", {
      src: file.path,
      alt: file.name,
      style: {
        objectFit: 'cover',
        height: '100%',
        width: '100%'
      }
    }))), _react["default"].createElement("td", {
      style: {
        width: '100%'
      }
    }, _react["default"].createElement("a", {
      href: file.path,
      target: '_blank'
    }, file.name)), _react["default"].createElement("td", null, file.loading && _react["default"].createElement("b", null, "Enviando..."), file.error && _react["default"].createElement("div", null, _react["default"].createElement("b", null, "Falha no envio"))), _react["default"].createElement("td", {
      className: "folder-browser-nowrap"
    }, formatBytes(file.size)), _react["default"].createElement("td", {
      className: "folder-browser-nowrap"
    }, _react["default"].createElement("a", (0, _extends2["default"])({
      className: "folder-browser-button",
      children: buttonDownload.title
    }, buttonDownload, {
      href: file.path
    })), _react["default"].createElement("button", (0, _extends2["default"])({
      className: "folder-browser-button",
      type: "button",
      children: buttonDelete.title
    }, buttonDelete, {
      onClick: function onClick(e) {
        return buttonDelete.onClick(e, file);
      }
    }))));
  })))));
};

FolderBrowser.defaultProps = defaultProps;
var _default = FolderBrowser;
exports["default"] = _default;
//# sourceMappingURL=FolderBrowser.js.map