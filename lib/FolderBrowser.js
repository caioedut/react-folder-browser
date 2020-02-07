import './styles.css';

import React, {useEffect, useState} from 'react';

export const defaultProps = {
  title: 'Files',
  loading: 'Loading...',
  empty: 'No files.',
  columnName: 'Name',
  columnSize: 'Size',
  columnPreview: '',
  columnActions: '',
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

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
}

const FolderBrowser = (props) => {
  const [files, setFiles] = useState();

  useEffect(() => setFiles(props.files), [props.files]);

  const buttonRefresh = {...defaultProps.buttonRefresh, ...props.buttonRefresh};
  const buttonUpload = {...defaultProps.buttonUpload, ...props.buttonUpload};
  const buttonDownload = {...defaultProps.buttonDownload, ...props.buttonDownload};
  const buttonDelete = {...defaultProps.buttonDelete, ...props.buttonDelete};

  function _handleFocus(e, file) {
    const $el = e.currentTarget;

    const $current = document.querySelector('.folder-browser-item-focused');
    $current && $current.classList.remove('folder-browser-item-focused');

    $el.classList.add('folder-browser-item-focused');
  }

  return (
    <div id="folder-browser">
      <div id="folder-browser-header">
        <div id="folder-browser-title">
          {props.title}
        </div>
        <div id="folder-browser-buttons">
          <button
            className="folder-browser-button"
            type="button"
            children={buttonRefresh.title}
            {...buttonRefresh}
          />
          <label className="folder-browser-button" {...buttonUpload} onChange={null}>
            {buttonUpload.children || buttonUpload.title}
            <input
              type="file"
              name="file"
              hidden
              onChange={(e) => {
                buttonUpload.onChange(e, e.target.files);
                e.target.value = null;
              }}
            />
          </label>
        </div>
      </div>
      <div id="folder-browser-body">

        {!files ? (
          <div style={{padding: '0 15px 15px'}}>{props.loading}</div>
        ) : !files.length ? (
          <div style={{padding: '0 15px 15px'}}>{props.empty}</div>
        ) : (
          <table>
            <thead>
            <tr>
              <th>{props.columnPreview}</th>
              <th>{props.columnName}</th>
              <th/>
              <th>{props.columnSize}</th>
              <th>{props.columnActions}</th>
            </tr>
            </thead>
            <tbody>

            {files.map((file, i) => (
              <tr key={i} onClick={(e) => _handleFocus(e, file)}>
                <td>
                  {[
                    'gif', 'ico', 'jpeg', 'jpg', 'png', 'svg', 'tif', 'tiff', 'webp'
                  ].some((ext) => {
                    return file.name.toLowerCase().endsWith(ext.toLowerCase());
                  }) && (
                    <div style={{
                      position: 'relative',
                      backgroundColor: '#eee',
                      overflow: 'hidden',
                      height: 38,
                      width: 38,
                    }}>
                      <img
                        src={file.path}
                        alt={file.name}
                        style={{
                          objectFit: 'cover',
                          height: '100%',
                          width: '100%',
                        }}
                      />
                    </div>
                  )}
                </td>
                <td style={{width: '100%'}}>
                  <a href={file.path} target={'_blank'}>
                    {file.name}
                  </a>
                </td>
                <td>
                  {file.loading && (
                    <b>Enviando...</b>
                  )}
                  {file.error && (
                    <div>
                      <b>Falha no envio</b>
                    </div>
                  )}
                </td>
                <td className="folder-browser-nowrap">
                  {formatBytes(file.size)}
                </td>
                <td className="folder-browser-nowrap">
                  <a
                    className="folder-browser-button"
                    children={buttonDownload.title}
                    {...buttonDownload}
                    href={file.path}
                  />
                  <button
                    className="folder-browser-button"
                    type="button"
                    children={buttonDelete.title}
                    {...buttonDelete}
                    onClick={(e) => buttonDelete.onClick(e, file)}
                  />
                </td>
              </tr>
            ))}

            </tbody>
          </table>
        )}

      </div>
    </div>
  );

};

FolderBrowser.defaultProps = defaultProps;

export default FolderBrowser;
