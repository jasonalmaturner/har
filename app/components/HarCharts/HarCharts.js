import React, { PropTypes } from 'react';
import styles from './HarCharts.css';
import { BarChart, PieChart } from 'react-d3';

const HarCharts = ({ aData, bData }) => {
  const barData = [
    {
      name: 'blocked',
      values: [
        { x: 'a', y: aData.timings.blockedAvg },
        { x: 'b', y: bData.timings.blockedAvg },
      ],
    },
    {
      name: 'dns',
      values: [
        { x: 'a', y: aData.timings.dnsAvg },
        { x: 'b', y: bData.timings.dnsAvg },
      ],
    },
    {
      name: 'connect',
      values: [
        { x: 'a', y: aData.timings.connectAvg },
        { x: 'b', y: bData.timings.connectAvg },
      ],
    },
    {
      name: 'send',
      values: [
        { x: 'a', y: aData.timings.sendAvg },
        { x: 'b', y: bData.timings.sendAvg },
      ],
    },
    {
      name: 'wait',
      values: [
        { x: 'a', y: aData.timings.waitAvg },
        { x: 'b', y: bData.timings.waitAvg },
      ],
    },
    {
      name: 'receive',
      values: [
        { x: 'a', y: aData.timings.receiveAvg },
        { x: 'b', y: bData.timings.receiveAvg },
      ],
    },
    {
      name: 'ssl',
      values: [
        { x: 'a', y: aData.timings.sslAvg },
        { x: 'b', y: bData.timings.sslAvg },
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
    <div className={styles.chartsContainer}>
      <BarChart
        data={barData}
        width={700}
        height={600}
        fill={'#3182bd'}
        title={'Average Load Times'}
        yAxisLabel={'milliseconds'}
        legend={true}
        xAxisLabel={'onContentLoad vs onLoad'} />
      <div>
        <h1>aData made an average of {aData.requestAvg} requests</h1>
        <h1>bData made an average of {bData.requestAvg} requests</h1>
      </div>
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
