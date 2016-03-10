import React, { PropTypes } from 'react';
import styles from './HarUpload.css';
import Dropzone from 'react-dropzone';

const HarUpload = ({
  handleDrop, harsA, harsB, isUploading, uploadError, handleSend, handleRefreshClick,
}) => {
  let dropzoneA;
  let dropzoneB;
  return (
    <div className={styles.uploadContainer}>
      <div className={styles.info}>
        Use this app to compare two different sets of har data. You can compare two
        different files, or two different sets of files. If you upload multiple
        files into one set, then an average of all the files will be calculated.
        Uploading multiple files will result in more reliable results, as it will
        help reduce the chance of skewed results from potential outliers.
        <br />
        <br />
        For example, you may want to generate multiple har files from the same page
        on the same network. Then, you might generate multiple har files from the same page,
        but loaded on a different network. You can then compare how the same page
        loads on different networks.
      </div>
      <div className={styles.dropzonesContainer}>
        <div className={styles.dropzoneContainer}>
          <Dropzone className={styles.dropzone} onDrop={handleDrop.bind(null, 'harsA')}>
            <h5 className={styles.set}>Set A</h5>
            <div className={styles.dropzoneContent}>
              Drop har file(s) here. Upload multiple files to compile an average.
            </div>
          </Dropzone>
          <div>
            {harsA.length ? <div>
              <h4 className={styles.uploadingHeader}>
                Uploading {harsA.length} file{harsA.length > 1 ? 's' : null}...
              </h4>
              <div>
                {harsA.map(file => (
                  <div
                    className={styles.file}
                    key={file.preview}>
                      {file.name}
                  </div>
                )
                )}
              </div>
            </div> : null}
          </div>
        </div>
        <div className={styles.dropzoneContainer}>
          <Dropzone className={styles.dropzone} onDrop={handleDrop.bind(null, 'harsB')}>
            <h5 className={styles.set}>Set B</h5>
            <div className={styles.dropzoneContent}>
              Drop another har file, or set of har files here.
            </div>
          </Dropzone>
          <div>
            {harsB.length ? <div>
              <h4 className={styles.uploadingHeader}>
                  Uploading {harsB.length} file{harsB.length > 1 ? 's' : null}...
              </h4>
              <div>
                {harsB.map(file => (
                  <div
                    className={styles.file}
                    key={file.preview}>
                      {file.name}
                  </div>
                )
                )}
              </div>
            </div> : null}
          </div>
        </div>
      </div>
      <button className={styles.button} onClick={e => {
        handleRefreshClick(e);
        handleSend();
      }}>Send Files</button>
      {uploadError && <div className={styles.error}>
        {uploadError.error}
      </div>}
      {isUploading && <img src='images/ripple.gif'/>}
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
