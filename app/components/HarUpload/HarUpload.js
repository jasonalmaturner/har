import React, { PropTypes } from 'react';
import styles from './HarUpload.css';
import Dropzone from 'react-dropzone';

const HarUpload = ({ handleDrop, harsA, harsB, isUploading, uploadError }) => {
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
      <Dropzone onDrop={handleDrop.bind(null, 'harsB')}>
        <div>
          Drop a second har file, or set of files, here to compare to.
        </div>
      </Dropzone>
    </div>
  );
};

HarUpload.propTypes = {
  handleDrop: PropTypes.func.isRequired,
  harsA: PropTypes.array.isRequired,
  harsB: PropTypes.array.isRequired,
  isUploading: PropTypes.bool.isRequired,
  uploadError: PropTypes.object,
};

export default HarUpload;
