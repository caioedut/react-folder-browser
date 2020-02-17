"use strict";

var _interopRequireWildcard = require("@babel/runtime/helpers/interopRequireWildcard");

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = FolderBrowser;
exports.defaultProps = exports.propTypes = void 0;

var _extends2 = _interopRequireDefault(require("@babel/runtime/helpers/extends"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _slicedToArray2 = _interopRequireDefault(require("@babel/runtime/helpers/slicedToArray"));

require("./styles.css");

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _reactFileDrop = _interopRequireDefault(require("react-file-drop"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var propTypes = {
  title: _propTypes["default"].node,
  loading: _propTypes["default"].node,
  deleting: _propTypes["default"].node,
  uploading: _propTypes["default"].node,
  error: _propTypes["default"].node,
  empty: _propTypes["default"].node,
  drop: _propTypes["default"].node,
  exists: _propTypes["default"].string,
  "delete": _propTypes["default"].string,
  columnName: _propTypes["default"].node,
  columnSize: _propTypes["default"].node,
  columnPreview: _propTypes["default"].node,
  columnActions: _propTypes["default"].node,
  ignoreDuplicated: _propTypes["default"].bool,
  buttonRefresh: _propTypes["default"].shape({
    title: _propTypes["default"].node,
    className: _propTypes["default"].string,
    children: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].arrayOf(_propTypes["default"].node)]),
    onClick: _propTypes["default"].func.isRequired
  }),
  buttonUpload: _propTypes["default"].shape({
    title: _propTypes["default"].node,
    className: _propTypes["default"].string,
    children: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].arrayOf(_propTypes["default"].node)]),
    onChange: _propTypes["default"].func.isRequired
  }),
  buttonDownload: _propTypes["default"].shape({
    title: _propTypes["default"].node,
    className: _propTypes["default"].string,
    children: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].arrayOf(_propTypes["default"].node)]),
    download: _propTypes["default"].oneOfType([_propTypes["default"].bool, _propTypes["default"].string])
  }),
  buttonDelete: _propTypes["default"].shape({
    title: _propTypes["default"].node,
    className: _propTypes["default"].string,
    children: _propTypes["default"].oneOfType([_propTypes["default"].node, _propTypes["default"].arrayOf(_propTypes["default"].node)]),
    onClick: _propTypes["default"].func.isRequired
  })
};
exports.propTypes = propTypes;
var defaultProps = {
  title: 'Files',
  loading: 'Loading...',
  deleting: 'Deleting...',
  uploading: 'Uploading...',
  error: 'Error',
  empty: 'No files.',
  drop: 'Drop files here',
  exists: 'File already exists. Continue?',
  "delete": 'Do you want to remove the file?',
  columnName: 'Name',
  columnSize: 'Size',
  columnPreview: '',
  columnActions: '',
  ignoreDuplicated: true,
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

function FolderBrowser(props) {
  var _useState = (0, _react.useState)(null),
      _useState2 = (0, _slicedToArray2["default"])(_useState, 2),
      files = _useState2[0],
      setFiles = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = (0, _slicedToArray2["default"])(_useState3, 2),
      modalFileUrl = _useState4[0],
      setModalFileUrl = _useState4[1];

  (0, _react.useEffect)(function () {
    return setFiles(props.files);
  }, [props.files]);

  var buttonRefresh = _objectSpread({}, defaultProps.buttonRefresh, {}, props.buttonRefresh);

  var buttonUpload = _objectSpread({}, defaultProps.buttonUpload, {}, props.buttonUpload);

  var buttonDownload = _objectSpread({}, defaultProps.buttonDownload, {}, props.buttonDownload);

  var buttonDelete = _objectSpread({}, defaultProps.buttonDelete, {}, props.buttonDelete);

  var additionalColumns = props.additionalColumns;

  function _handleDrop(files, e) {
    _handleChange({
      target: {
        files: files
      }
    }, files);
  }

  function _handleChange(e) {
    var files = e.target.files;

    if (files) {
      var exists = false; // Check if exists

      var _loop = function _loop() {
        var file = _Array$from[_i];

        if (data.find(function (_ref) {
          var name = _ref.name;
          return file.name === name;
        })) {
          exists = true;
          return "break";
        }
      };

      for (var _i = 0, _Array$from = Array.from(files); _i < _Array$from.length; _i++) {
        var _ret = _loop();

        if (_ret === "break") break;
      }

      if (!exists || window.confirm(props.exists)) {
        buttonUpload.onChange(e, files);
      }

      e.target.value = null;
    }
  }

  function _handleFocus(e, file) {
    var $el = e.currentTarget;
    var $current = document.querySelector('.folder-browser-item-focused');
    $current && $current.classList.remove('folder-browser-item-focused');
    $el.classList.add('folder-browser-item-focused');
  } // Filter duplicated


  var data = files && (!props.ignoreDuplicated ? files : files.filter(function (a, i) {
    var exists = files.find(function (b) {
      return a.name === b.name;
    });
    return files.lastIndexOf(exists) === i;
  }));
  return _react["default"].createElement("div", {
    className: "folder-browser"
  }, modalFileUrl && _react["default"].createElement("div", {
    className: "folder-browser-modal",
    onClick: setModalFileUrl.bind(null, null)
  }, _react["default"].createElement("img", {
    src: modalFileUrl,
    alt: "",
    onClick: function onClick(e) {
      return e.stopPropagation();
    }
  }), _react["default"].createElement("div", {
    onClick: setModalFileUrl.bind(null, null)
  }, "\xD7")), _react["default"].createElement(_reactFileDrop["default"], {
    onDrop: _handleDrop
  }, _react["default"].createElement("div", {
    className: "folder-browser-dragbanner"
  }, props.drop), _react["default"].createElement("div", {
    className: "folder-browser-header"
  }, _react["default"].createElement("div", {
    className: "folder-browser-title"
  }, props.title), _react["default"].createElement("div", {
    className: "folder-browser-buttons"
  }, _react["default"].createElement("button", (0, _extends2["default"])({
    className: "folder-browser-button",
    type: "button",
    children: buttonRefresh.title
  }, buttonRefresh)), _react["default"].createElement("label", (0, _extends2["default"])({
    className: "folder-browser-button"
  }, buttonUpload, {
    onChange: null
  }), buttonUpload.children || buttonUpload.title, _react["default"].createElement("input", {
    className: "folder-browser-input",
    type: "file",
    name: "file",
    multiple: true,
    hidden: true,
    onChange: _handleChange
  })))), _react["default"].createElement("div", {
    className: "folder-browser-body"
  }, !data ? _react["default"].createElement("div", {
    style: {
      padding: '0 15px 15px'
    }
  }, props.loading) : !data.length ? _react["default"].createElement("div", {
    style: {
      padding: '0 15px 15px'
    }
  }, props.empty) : _react["default"].createElement("table", null, _react["default"].createElement("thead", null, _react["default"].createElement("tr", null, _react["default"].createElement("th", null, props.columnPreview), _react["default"].createElement("th", null, props.columnName), _react["default"].createElement("th", null), additionalColumns && additionalColumns.map(function (column, key) {
    return _react["default"].createElement("th", {
      key: key
    }, column.header);
  }), _react["default"].createElement("th", null, props.columnSize), _react["default"].createElement("th", null, props.columnActions))), _react["default"].createElement("tbody", null, data.map(function (file, i) {
    var isImage = ['gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'tif', 'tiff', 'webp'].some(function (ext) {
      return file.name.toLowerCase().endsWith(ext.toLowerCase());
    });
    return _react["default"].createElement("tr", {
      key: i,
      onClick: function onClick(e) {
        return _handleFocus(e, file);
      }
    }, _react["default"].createElement("td", null, isImage && _react["default"].createElement("div", {
      style: {
        position: 'relative',
        backgroundColor: '#eee',
        overflow: 'hidden',
        height: 38,
        width: 38
      }
    }, _react["default"].createElement("img", {
      src: file.url,
      alt: file.name,
      style: {
        cursor: 'pointer',
        objectFit: 'cover',
        height: '100%',
        width: '100%'
      },
      onClick: setModalFileUrl.bind(null, file.url)
    }))), _react["default"].createElement("td", {
      style: {
        width: '100%'
      }
    }, _react["default"].createElement("a", {
      href: file.url,
      target: '_blank',
      onClick: function onClick(e) {
        if (isImage) {
          e.preventDefault();
          setModalFileUrl(file.url);
        }
      }
    }, file.name)), _react["default"].createElement("td", {
      className: "folder-browser-nowrap"
    }, file.uploading && _react["default"].createElement("b", null, props.uploading), file.deleting && _react["default"].createElement("b", null, props.deleting), file.error && _react["default"].createElement("div", null, _react["default"].createElement("b", null, props.error))), additionalColumns && additionalColumns.map(function (column, key) {
      return _react["default"].createElement("th", {
        key: key
      }, column.render(file));
    }), _react["default"].createElement("td", {
      className: "folder-browser-nowrap",
      align: "right"
    }, formatBytes(file.size)), _react["default"].createElement("td", {
      className: "folder-browser-nowrap"
    }, _react["default"].createElement("a", (0, _extends2["default"])({
      className: "folder-browser-button",
      children: buttonDownload.title
    }, buttonDownload, {
      href: file.url
    })), _react["default"].createElement("button", (0, _extends2["default"])({
      className: "folder-browser-button",
      type: "button",
      children: buttonDelete.title
    }, buttonDelete, {
      onClick: function onClick(e) {
        if (window.confirm(props["delete"])) {
          buttonDelete.onClick(e, file);
        }
      }
    }))));
  }))))));
}

;
FolderBrowser.propTypes = propTypes;
FolderBrowser.defaultProps = defaultProps;
//# sourceMappingURL=FolderBrowser.js.map