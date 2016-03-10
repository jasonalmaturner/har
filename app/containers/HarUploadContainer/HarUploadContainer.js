import React, { Component, PropTypes } from 'react';
import { connect} from 'react-redux';
import styles from './HarUploadContainer.css';
import { addFile, sendFile } from '../../actions/harUploadActions';
import UploadFiles from '../../components/HarUpload/HarUpload';

class HarUploadContainer extends Component {
  constructor(props) {
    super(props);
    this.handleDrop = this.handleDrop.bind(this);
    this.handleSend = this.handleSend.bind(this);
    this.handleRefreshClick = this.handleRefreshClick.bind(this);
  }

  handleDrop(aOrB, files) {
    this.props.dispatch(addFile(files, aOrB));
  }

  handleSend() {
    this.props.dispatch(sendFile());
  }

  handleRefreshClick(e) {
    e.preventDefault();
  }

  render() {
    const { harsA, harsB, isUploading, uploadError } = this.props;
    return (
      <div className={styles.mainUploadContainer}>
        <UploadFiles
          handleDrop={this.handleDrop}
          harsA={harsA}
          harsB={harsB}
          isUploading={isUploading}
          uploadError={uploadError}
          handleSend={this.handleSend}
          handleRefreshClick={this.handleRefreshClick} />
      </div>
    );
  }
}

HarUploadContainer.propTypes = {
  harsA: PropTypes.array,
  harsB: PropTypes.array,
  isUploading: PropTypes.bool.isRequired,
  uploadError: PropTypes.object,
};

function mapStateToProps(state) {
  const { uploadFiles } = state;
  const {
    harsA,
    harsB,
    isUploading,
    uploadError,
  } = uploadFiles || {
    harsA: [],
    harsB: [],
    isUploading: false,
    uploadError: null,
  };

  return {
    harsA,
    harsB,
    isUploading,
    uploadError,
  };
};

export default connect(mapStateToProps)(HarUploadContainer);
