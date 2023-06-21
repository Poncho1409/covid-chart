'use client'
//import Image from 'next/image'
//import styles from './page.module.css'
import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const data = {
    labels: [
      'Red',
      'Green',
      'Yellow'
  ],
  datasets: [{
    data: [300, 50, 100],
    backgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ],
    hoverBackgroundColor: [
    '#FF6384',
    '#36A2EB',
    '#FFCE56'
    ]
  }]
};

export default function Home() {
  return (
    <>
      <h2>Doughnut Example</h2>
      <Doughnut
        data={data}
        width={400}
        height={400}
      />
  </>
  )
}
