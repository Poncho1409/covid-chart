'use client'
import Image from 'next/image'
//import styles from './page.module.css'
import { useState } from 'react';
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

// const data = {
//     labels: [
//       'Red',
//       'Green',
//       'Yellow'
//   ],
//   datasets: [{
//     data: [300, 50, 100],
//     backgroundColor: [
//     '#FF6384',
//     '#36A2EB',
//     '#FFCE56'
//     ],
//     hoverBackgroundColor: [
//     '#FF6384',
//     '#36A2EB',
//     '#FFCE56'
//     ]
//   }]
// };

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

let dataUSAAPI = {
  "updated": 1687374498537,
  "country": "USA",
  "countryInfo": {
      "_id": 840,
      "iso2": "US",
      "iso3": "USA",
      "lat": 38,
      "long": -97,
      "flag": "https://disease.sh/assets/img/flags/us.png"
  },
  "cases": 107248397,
  "todayCases": 1879,
  "deaths": 1167387,
  "todayDeaths": 2,
  "recovered": 105382233,
  "todayRecovered": 1904,
  "active": 698777,
  "critical": 799,
  "casesPerOneMillion": 320331,
  "deathsPerOneMillion": 3487,
  "tests": 1180622285,
  "testsPerOneMillion": 3526295,
  "population": 334805269,
  "continent": "North America",
  "oneCasePerPeople": 3,
  "oneDeathPerPeople": 287,
  "oneTestPerPeople": 0,
  "activePerOneMillion": 2087.11,
  "recoveredPerOneMillion": 314756.79,
  "criticalPerOneMillion": 2.39
}

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

  const [data, setData] = useState(dataContry2Chart);
  const [country, setCountry] = useState('Mexico');
  const [urlFlag, setUrlFlag] = useState('https://disease.sh/assets/img/flags/mx.png');

  function handleClick(dataCountry) {

    dataContry2Chart = {
      labels: ['Casos', 'Muertes', 'Recuperaciones'],
      datasets: [
        {
          data: [dataCountry.cases, dataCountry.deaths, dataCountry.recovered],
          backgroundColor: [colors.red, colors.gray, colors.blue]
        }
      ]
    };

    setData(dataContry2Chart);
    setCountry(dataCountry.country);
    setUrlFlag(dataCountry.countryInfo.flag)
  }

  return (
    <>
      
      <button onClick={() => handleClick(dataCountryAPI)} >Mexico</button>
      <button onClick={() => handleClick(dataUSAAPI)} >USA</button>
      <h2>COVID DATA OF {country}</h2>
      <Image
        src={urlFlag}
        width={200}
        height={100}
        alt="picture of the country flag"
      />
      <div>
        <Doughnut
          data={dataContry2Chart}
          width={200}
          height={200}
        />
      </div>
  </>
  );
}
