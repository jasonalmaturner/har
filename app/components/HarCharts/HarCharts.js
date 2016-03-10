import React, { PropTypes } from 'react';
import styles from './HarCharts.css';
import { BarChart, PieChart } from 'react-d3';

const HarCharts = ({ aData, bData }) => {
  const barData = [
    {
      name: 'onLoadAvg',
      values: [
        { x: 'a', y: aData.onLoadAvg },
        { x: 'b', y: bData.onLoadAvg },
      ],
    },
    {
      name: 'onContentLoadAvg',
      values: [
        { x: 'a', y: aData.onContentAvg },
        { x: 'b', y: bData.onContentAvg },
      ],
    },
  ];
  const pieA = [
    { label: 'CSS', value: Math.round(aData.cssAvg * 100) },
    { label: 'HTML', value: Math.round(aData.htmlAvg * 100) },
    { label: 'JavaScript', value: Math.round(aData.jsAvg * 100) },
    { label: 'Images', value: Math.round(aData.imagesAvg * 100) },
    { label: 'Other', value: Math.round(aData.otherAvg * 100) },
  ];
  const pieB = [
    { label: 'CSS', value: Math.round(bData.cssAvg * 100) },
    { label: 'HTML', value: Math.round(bData.htmlAvg * 100) },
    { label: 'JavaScript', value: Math.round(bData.jsAvg * 100) },
    { label: 'Images', value: Math.round(bData.imagesAvg * 100) },
    { label: 'Other', value: Math.round(bData.otherAvg * 100) },
  ];
  return (
    <div>
      <BarChart
        data={barData}
        width={700}
        height={600}
        fill={'#3182bd'}
        title={'Average Load Times'}
        yAxisLabel={'milliseconds'}
        xAxisLabel={'onContentLoad vs onLoad'} />
      <PieChart
        data={pieA}
        width={400}
        height={400}
        radius={100}
        innerRadius={20}
        sectorBorderColor='white'
        title='Average Load Time Percantages' />
      <PieChart
        data={pieB}
        width={400}
        height={400}
        radius={100}
        innerRadius={20}
        sectorBorderColor='white'
        title='Average Load Time Percantages' />
    </div>
  );
};

HarCharts.propTypes = {
  aData: PropTypes.object,
  bData: PropTypes.object,
};

export default HarCharts;
