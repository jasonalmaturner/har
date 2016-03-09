import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import styles from './HarChartsContainer.css';
import HarCharts from '../../components/HarCharts/HarCharts';

class HarChartsContainer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { aData, bData } = this.props;
    return (
      <div>
        <HarCharts
          aData={aData}
          bData={bData} />
      </div>
    );
  }
}

HarChartsContainer.propTypes = {
  aData: PropTypes.object,
  bData: PropTypes.object,
};

function mapStateToProps(state) {
  const { displayData } = state;
  const {
    aData,
    bData,
  } = displayData || {
    aData: {},
    bData: {},
  };

  return {
    aData,
    bData,
  };
}

export default connect(mapStateToProps)(HarChartsContainer);
