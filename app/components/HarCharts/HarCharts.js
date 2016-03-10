import React, { PropTypes } from 'react';
import styles from './HarCharts.css';
import { BarChart, PieChart } from 'react-d3';

const HarCharts = ({ aData, bData }) => {
  const barData = [
    {
      name: 'blocked',
      values: [
        { x: 'Set A', y: aData.timings.blockedAvg },
        { x: 'Set B', y: bData.timings.blockedAvg },
      ],
    },
    {
      name: 'dns',
      values: [
        { x: 'Set A', y: aData.timings.dnsAvg },
        { x: 'Set B', y: bData.timings.dnsAvg },
      ],
    },
    {
      name: 'connect',
      values: [
        { x: 'Set A', y: aData.timings.connectAvg },
        { x: 'Set B', y: bData.timings.connectAvg },
      ],
    },
    {
      name: 'send',
      values: [
        { x: 'Set A', y: aData.timings.sendAvg },
        { x: 'Set B', y: bData.timings.sendAvg },
      ],
    },
    {
      name: 'wait',
      values: [
        { x: 'Set A', y: aData.timings.waitAvg },
        { x: 'Set B', y: bData.timings.waitAvg },
      ],
    },
    {
      name: 'receive',
      values: [
        { x: 'Set A', y: aData.timings.receiveAvg },
        { x: 'Set B', y: bData.timings.receiveAvg },
      ],
    },
    {
      name: 'ssl',
      values: [
        { x: 'Set A', y: aData.timings.sslAvg },
        { x: 'Set B', y: bData.timings.sslAvg },
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
      <hr className={styles.hr} />
      <div className={styles.barChart}>
        <BarChart
          data={barData}
          width={800}
          height={500}
          fill={'#3182bd'}
          title={'Average Time Request Spent in Network Phases'}
          yAxisLabel={'milliseconds'}
          legend={true}
          legendOffset={400} />
      </div>
      <hr className={styles.hr} />
      <div className={styles.requests}>
        <h2 className={styles.title}>Set A made an average of {Math.round(aData.requestAvg)} requests</h2>
        <h2 className={styles.title}>Set B made an average of {Math.round(bData.requestAvg)} requests</h2>
      </div>
      <hr className={styles.hr} />
      <h2 className={styles.title}>
        Average Percentage of Time Spent Loading Resource Type
      </h2>
      <div className={styles.piesContainer}>
        <div className={styles.pieContainer}>
          <PieChart
            data={pieA}
            width={400}
            height={400}
            radius={100}
            innerRadius={20}
            sectorBorderColor='white'
            title='Set A' />
        </div>
        <div className={styles.pieContainer}>
          <PieChart
            data={pieB}
            width={400}
            height={400}
            radius={100}
            innerRadius={20}
            sectorBorderColor='white'
            title='Set B' />
        </div>
      </div>
    </div>
  );
};

HarCharts.propTypes = {
  aData: PropTypes.object,
  bData: PropTypes.object,
};

export default HarCharts;
