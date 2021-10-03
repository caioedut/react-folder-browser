import './styles.css';

import React, {useEffect, useState} from 'react';
import PropTypes from 'prop-types';

import FileDrop from 'react-file-drop';

export const propTypes = {
  files: PropTypes.shape({
    name: PropTypes.string,
    url: PropTypes.string,
    size: PropTypes.number,
  }),
  title: PropTypes.node,
  loading: PropTypes.node,
  deleting: PropTypes.node,
  uploading: PropTypes.node,
  error: PropTypes.node,
  empty: PropTypes.node,
  drop: PropTypes.node,
  exists: PropTypes.string,
  delete: PropTypes.string,
  columnName: PropTypes.node,
  columnSize: PropTypes.node,
  columnPreview: PropTypes.node,
  columnActions: PropTypes.node,
  ignoreDuplicated: PropTypes.bool,
  buttonRefresh: PropTypes.shape({
    title: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    onClick: PropTypes.func.isRequired,
  }),
  buttonUpload: PropTypes.shape({
    title: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    onChange: PropTypes.func.isRequired,
  }),
  buttonDownload: PropTypes.shape({
    title: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    download: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.string,
    ]),
  }),
  buttonDelete: PropTypes.shape({
    title: PropTypes.node,
    className: PropTypes.string,
    children: PropTypes.oneOfType([
      PropTypes.node,
      PropTypes.arrayOf(PropTypes.node),
    ]),
    onClick: PropTypes.func.isRequired,
  }),
};

export const defaultProps = {
  files: [],
  title: 'Files',
  loading: 'Loading...',
  deleting: 'Deleting...',
  uploading: 'Uploading...',
  error: 'Error',
  empty: 'No files.',
  drop: 'Drop files here',
  exists: 'File already exists. Continue?',
  delete: 'Do you want to remove the file?',
  columnName: 'Name',
  columnSize: 'Size',
  columnPreview: '',
  columnActions: '',
  ignoreDuplicated: true,
  buttonRefresh: {
    title: 'Refresh',
  },
  buttonUpload: {
    title: 'Upload file',
  },
  buttonDownload: {
    title: 'Download',
    target: '_blank',
    download: true,
  },
  buttonDelete: {
    title: 'Delete',
  },
};

function formatBytes(bytes, decimals = 2) {
  if (bytes === 0) {
    return '0 Bytes';
  }

  if (!bytes) {
    return '-'
  }

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

export default function FolderBrowser(props) {
  const [files, setFiles] = useState(null);
  const [modalFileUrl, setModalFileUrl] = useState(null);

  useEffect(() => setFiles(props.files), [props.files]);

  const buttonRefresh = {...defaultProps.buttonRefresh, ...props.buttonRefresh};
  const buttonUpload = {...defaultProps.buttonUpload, ...props.buttonUpload};
  const buttonDownload = {...defaultProps.buttonDownload, ...props.buttonDownload};
  const buttonDelete = {...defaultProps.buttonDelete, ...props.buttonDelete};

  const {additionalColumns} = props;

  function _handleDrop(files, e) {
    _handleChange({target: {files}}, files);
  }

  function _handleChange(e) {
    const files = e.target.files;

    if (files) {
      let exists = false;

      // Check if exists
      for (const file of Array.from(files)) {
        if (data.find(({name}) => file.name === name)) {
          exists = true;
          break;
        }
      }

      if (!exists || window.confirm(props.exists)) {
        buttonUpload.onChange(e, files);
      }

      e.target.value = null;
    }
  }

  function _handleFocus(e, file) {
    const $el = e.currentTarget;

    const $current = document.querySelector('.folder-browser-item-focused');
    $current && $current.classList.remove('folder-browser-item-focused');

    $el.classList.add('folder-browser-item-focused');
  }

  // Filter duplicated
  const data = files && (
    !props.ignoreDuplicated ? files : files.filter((a, i) => {
      const exists = files.find((b) => a.name === b.name);
      return files.lastIndexOf(exists) === i;
    })
  );

  return (
    <div className="folder-browser">
      {modalFileUrl && (
        <div className="folder-browser-modal" onClick={setModalFileUrl.bind(null, null)}>
          <img src={modalFileUrl} alt="" onClick={(e) => e.stopPropagation()}/>
          <div onClick={setModalFileUrl.bind(null, null)}>×</div>
        </div>
      )}
      <FileDrop onDrop={_handleDrop}>
        <div className="folder-browser-dragbanner">
          {props.drop}
        </div>
        <div className="folder-browser-header">
          <div className="folder-browser-title">
            {props.title}
          </div>
          <div className="folder-browser-buttons">
            <button
              className="folder-browser-button"
              type="button"
              children={buttonRefresh.title}
              {...buttonRefresh}
            />
            <label className="folder-browser-button" {...buttonUpload} onChange={null}>
              {buttonUpload.children || buttonUpload.title}
              <input
                className="folder-browser-input"
                type="file"
                name="file"
                multiple
                hidden
                onChange={_handleChange}
              />
            </label>
          </div>
        </div>
        <div className="folder-browser-body">

          {!data ? (
            <div style={{padding: '0 15px 15px'}}>{props.loading}</div>
          ) : !data.length ? (
            <div style={{padding: '0 15px 15px'}}>{props.empty}</div>
          ) : (
            <table>
              <thead>
              <tr>
                <th>{props.columnPreview}</th>
                <th>{props.columnName}</th>
                <th/>

                {additionalColumns && additionalColumns.map((column, key) => (
                  <th key={key}>{column.header}</th>
                ))}

                <th>{props.columnSize}</th>
                <th>{props.columnActions}</th>
              </tr>
              </thead>
              <tbody>

              {data.map((file, i) => {
                const isImage = [
                  'gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'tif', 'tiff', 'webp'
                ].some((ext) => {
                  return file.name.toLowerCase().endsWith(ext.toLowerCase());
                });

                return (
                  <tr key={i} onClick={(e) => _handleFocus(e, file)}>
                    <td>
                      {isImage && (
                        <div style={{
                          position: 'relative',
                          backgroundColor: '#eee',
                          overflow: 'hidden',
                          height: 38,
                          width: 38,
                        }}>
                          <img
                            src={file.url}
                            alt={file.name}
                            style={{
                              cursor: 'pointer',
                              objectFit: 'cover',
                              height: '100%',
                              width: '100%',
                            }}
                            onClick={setModalFileUrl.bind(null, file.url)}
                          />
                        </div>
                      )}
                    </td>
                    <td style={{width: '100%'}}>
                      <a href={file.url} target={'_blank'} onClick={(e) => {
                        if (isImage) {
                          e.preventDefault();
                          setModalFileUrl(file.url);
                        }
                      }}>
                        {file.name}
                      </a>
                    </td>
                    <td className="folder-browser-nowrap">
                      {file.uploading && (
                        <b>{props.uploading}</b>
                      )}
                      {file.deleting && (
                        <b>{props.deleting}</b>
                      )}
                      {file.error && (
                        <div>
                          <b>{props.error}</b>
                        </div>
                      )}
                    </td>

                    {additionalColumns && additionalColumns.map((column, key) => (
                      <th key={key}>{column.render(file)}</th>
                    ))}

                    <td className="folder-browser-nowrap" align="right">
                      {formatBytes(file.size)}
                    </td>
                    <td className="folder-browser-nowrap">
                      <a
                        className="folder-browser-button"
                        children={buttonDownload.title}
                        {...buttonDownload}
                        href={file.url}
                      />
                      <button
                        className="folder-browser-button"
                        type="button"
                        children={buttonDelete.title}
                        {...buttonDelete}
                        onClick={(e) => {
                          if (window.confirm(props.delete)) {
                            buttonDelete.onClick(e, file);
                          }
                        }}
                      />
                    </td>
                  </tr>
                );
              })}

              </tbody>
            </table>
          )}

        </div>
      </FileDrop>
    </div>
  );

};

FolderBrowser.propTypes = propTypes;
FolderBrowser.defaultProps = defaultProps;
