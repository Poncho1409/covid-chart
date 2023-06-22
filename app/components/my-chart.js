'use client'
import Image from 'next/image'
import { useState } from 'react';
import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

export default function MyChart({empty, loading, success, countryData}){

    const colors = {
        'red':    '#EF233C',
        'blue':   '#2EC0F9',
        'gray':   '#6A706E',
        'green':  '#DBF4A7',
        'white':  '#F9F9ED'
    };

    const dataContry2Chart = {
        labels: ['Casos', 'Muertes', 'Recuperaciones'],
        datasets: [
            {
                data: [countryData.cases, countryData.deaths, countryData.recovered],
                backgroundColor: [colors.red, colors.gray, colors.blue]
            }
        ]
    };

    const country = countryData.country;

    const urlFlag = countryData.countryInfo.flag

    return(
        <div className="container-md mx-auto p-5">
            <div>
                {/* <p>Casos: {countryData.cases}</p>
                <p>Muertes: {countryData.deaths}</p>
                <p>Recuperados: {countryData.recovered}</p> */}
                <Image
                    src={urlFlag}
                    width={200}
                    height={100}
                    alt="picture of the country flag"
                />
                <Doughnut
                    data={dataContry2Chart}
                    width={200}
                    height={200}
                />
            </div>
        </div>
    );
}