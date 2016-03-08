import React, { PropTypes } from 'react';
import styles from './HarUpload.css';
import Dropzone from 'react-dropzone';

const HarUpload = ({
  handleDrop, harsA, harsB, isUploading, uploadError, handleSend, handleRefreshClick,
}) => {
  let dropzoneA;
  let dropzoneB;
  return (
    <div>
      <Dropzone onDrop={handleDrop.bind(null, 'harsA')}>
        <div>
          Drop har file here, or multiple files to compile an average of
          multiple har files.
        </div>
      </Dropzone>
      <div>
        {harsA.length ? <div>
          <h3>Uploading {harsA.length} file{harsA.length > 1 ? 's' : null}... </h3>
          <ul>{harsA.map(file => <li key={file.preview}>{file.name}</li>)}</ul>
        </div> : null}
      </div>
      <Dropzone onDrop={handleDrop.bind(null, 'harsB')}>
        <div>
          Drop a second har file, or set of files, here to compare to.
        </div>
      </Dropzone>
      <div>
        {harsB.length ? <div>
          <h3>Uploading {harsB.length} file{harsB.length > 1 ? 's' : null}... </h3>
          <ul>{harsB.map(file => <li key={file.preview}>{file.name}</li>)}</ul>
        </div> : null}
      </div>
      <button onClick={e => {
        handleRefreshClick(e);
        handleSend();
      }}>Send Files</button>
    </div>
  );
};

HarUpload.propTypes = {
  handleDrop: PropTypes.func.isRequired,
  harsA: PropTypes.array.isRequired,
  harsB: PropTypes.array.isRequired,
  isUploading: PropTypes.bool.isRequired,
  uploadError: PropTypes.object,
  handleSend: PropTypes.func.isRequired,
  handleRefreshClick: PropTypes.func.isRequired,
};

export default HarUpload;
