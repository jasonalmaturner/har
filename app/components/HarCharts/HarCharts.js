import React, { PropTypes } from 'react';
import styles from './HarCharts.css';
import { BarChart, PieChart } from 'react-d3';

const HarCharts = ({ aData, bData }) => {
  const barData = [
    {
      name: 'aData onContentAvg',
      values: [
        { x: 'onContentAvg', y: aData.onContentAvg },
      ],
    },
    {
      name: 'bData onContentAvg',
      values: [
        { x: 'onContentAvg', y: bData.onContentAvg },
      ],
    },
    {
      name: 'aData onLoadAvg',
      values: [
        { x: 'onLoadAvg', y: aData.onLoadAvg },
      ],
    },
    {
      name: 'bData onLoadAvg',
      values: [
        { x: 'onLoadAvg', y: bData.onLoadAvg },
      ],
    },
  ];
  return (
    <div>
      <BarChart
        data={barData}
        width={500}
        height={200}
        fill={'#3182bd'}
        title={'Average Load Times'}
        yAxisLabel={'milliseconds'}
        xAxisLabel={'onContentLoad vs onLoad'} />
    </div>
  );
};

HarCharts.propTypes = {
  aData: propTypes.object,
  bData: propTypes.object,
};

export default HarCharts;
