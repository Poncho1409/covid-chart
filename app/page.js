'use client'
//import Image from 'next/image'
//import styles from './page.module.css'
import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const colors = {
  'red':    '#EF233C',
  'blue':   '#2EC0F9',
  'gray':   '#6A706E',
  'green':  '#DBF4A7',
  'white':  '#F9F9ED'
};

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

let dataCountryAPI = {
  "updated": 1687370298548,
  "country": "Mexico",
  "countryInfo": {
      "_id": 484,
      "iso2": "MX",
      "iso3": "MEX",
      "lat": 23,
      "long": -102,
      "flag": "https://disease.sh/assets/img/flags/mx.png"
  },
  "cases": 7630448,
  "todayCases": 0,
  "deaths": 334276,
  "todayDeaths": 0,
  "recovered": 6882799,
  "todayRecovered": 0,
  "active": 413373,
  "critical": 0,
  "casesPerOneMillion": 57999,
  "deathsPerOneMillion": 2541,
  "tests": 20013810,
  "testsPerOneMillion": 152124,
  "population": 131562772,
  "continent": "North America",
  "oneCasePerPeople": 17,
  "oneDeathPerPeople": 394,
  "oneTestPerPeople": 7,
  "activePerOneMillion": 3142.02,
  "recoveredPerOneMillion": 52315.7,
  "criticalPerOneMillion": 0
};

let dataContry2Chart = {
  labels: ['Casos', 'Muertes', 'Recuperaciones'],
  datasets: [
    {
      data: [dataCountryAPI.cases, dataCountryAPI.deaths, dataCountryAPI.recovered],
      backgroundColor: [colors.red, colors.gray, colors.blue]
    }
  ]
};

export default function Home() {
  return (
    <>
      <h2>Doughnut Example</h2>
      <Doughnut
        data={dataContry2Chart}
        width={400}
        height={400}
      />
  </>
  )
}
