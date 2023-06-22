'use client'
import { useState } from 'react';
import Table from '../app/components/table'
import Image from 'next/image'
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

let dataContry2Chart = {
    labels: ['Casos', 'Muertes', 'Recuperaciones'],
    datasets: [
      {
        data: [5, 10, 1],
        backgroundColor: [colors.red, colors.gray, colors.blue]
      }
    ]
};

export async function getServerSideProps(context) {

    const countriesData = require('../app/src/countries.json');

    const splitCountriesData = [];
    for (let i = 0; i < countriesData.length; i += 10) {
        const chunk = countriesData.slice(i, i + 10);
        splitCountriesData.push(chunk);
    }
    
    return {
      props: {
        splitCountriesData,
      },
    };
}

export default function Home({splitCountriesData}) {
    const [page, setPage] = useState(0);
    const [countryData, setCountryData] = useState(null);

    const [empty, setEmpty] = useState(true);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [success, setSucces] = useState(false);

    const callAPI = async (iso) => {
        setEmpty(false);
        try{
            setLoading(true);
            const response = await fetch('https://corona.lmao.ninja/v2/countries/' + iso, {
                method: 'GET',
                headers: {"Content-Type": "application/json"}
                });
            
            const result = await response.json();
            setCountryData(result);
            dataContry2Chart = {
                labels: ['Casos', 'Muertes', 'Recuperaciones'],
                datasets: [
                  {
                    data: [result.cases, result.deaths, result.recovered],
                    backgroundColor: [colors.red, colors.gray, colors.blue]
                  }
                ]
            };

        }catch{
            setLoading(false);
            setError(true);
        }finally{
            setLoading(false);
            setSucces(true);

            // dataContry2Chart = {
            //     labels: ['Casos', 'Muertes', 'Recuperaciones'],
            //     datasets: [
            //       {
            //         data: [countryData.cases, countryData.deaths, countryData.recovered],
            //         backgroundColor: [colors.red, colors.gray, colors.blue]
            //       }
            //     ]
            // };
        }
        
    };

    return (
        <div className='container'>
            <div className='row'>
                <div className='col'>
                    <Table splitCountriesData={splitCountriesData} onClickFunction={callAPI}></Table>
                </div>
                <div className='col'>
                    {/* <MyChart empty={empty} loading={loading} success={success} countryData={countryData}></MyChart> */}

                    <div className="container-md mx-auto p-5">
                        {/* <Doughnut
                            data={dataContry2Chart}
                            width={200}
                            height={200}
                        /> */}
                        {empty ? 
                            <div>Selecciona un pais</div> :
                            <div>
                                {loading ? 
                                    <div>Cargando datos ...</div> :
                                    <div> 
                                    {success ? 
                                        <div>
                                            {/* <MyChart empty={empty} loading={loading} success={success} countryData={countryData}></MyChart> */}
                                            {/* {typeof countryData} */}
                                            <Doughnut
                                                data={dataContry2Chart}
                                                width={200}
                                                height={200}
                                            />
                                        </div> :
                                        <div>
                                            Error al cargar los datos
                                        </div>
                                    } </div>
                                }
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}
