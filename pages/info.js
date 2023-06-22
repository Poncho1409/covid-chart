'use client'
import { useState } from 'react';
import Table from '../app/components/table'
import Card from '../app/components/card';
import Image from 'next/image'
import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Chart, ArcElement} from 'chart.js'
Chart.register(ArcElement);

const colors = {
    'red':    '#EF233C',
    'blue':   '#2EC0F9',
    'gray':   '#6A706E',
    'green':  '#198754',
    'white':  '#F9F9ED'
};

let dataContry2Chart = {
    labels: ['Muertes', 'Recuperaciones'],
    datasets: [
      {
        data: [1, 10],
        backgroundColor: [colors.gray, colors.green]
      }
    ]
};

export async function getServerSideProps(context) {

    const countriesData = require('../app/src/countries.json');
    const chunkSize = 10;
    const splitCountriesData = [];
    for (let i = 0; i < countriesData.length; i += chunkSize) {
        const chunk = countriesData.slice(i, i + chunkSize);
        splitCountriesData.push(chunk);
    }
    
    return {
      props: {
        splitCountriesData,
      },
    };
}

export default function Home({splitCountriesData}) {
    
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
                labels: ['Muertes', 'Recuperaciones'],
                datasets: [
                  {
                    data: [result.deaths, result.recovered],
                    backgroundColor: [colors.gray, colors.green]
                  }
                ]
            };

        }catch{
            setError(true);
            setLoading(false);
        }finally{
            setSucces(true);
            setLoading(false);
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
        <div>
            <nav className="navbar bar bg-primary text-bg-primary text-center">
                <div className="container-fluid justify-content-center">
                    <h2>COVID-19 Status</h2>
                </div>
            </nav>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <Table splitCountriesData={splitCountriesData} onClickFunction={callAPI}></Table>
                    </div>
                    <div className='col'>
                        <div className="container-md mx-auto p-3 align-items-center">
                            {empty ? 
                                // <div className='card text-bg-light mb-3'>
                                //     <div className="card-body">
                                //         <h5 className="card-title text-center">Select a country</h5>
                                //     </div>
                                // </div>:
                                <Card style="light" text="Select a Country"></Card>:
                                <div>
                                    {loading ? 
                                        // <div className='card text-bg-secundary mb-3'>
                                        //     <div className="card-body">
                                        //         <h5 className="card-title text-center">Loading data</h5>
                                        //     </div>
                                        // </div> 
                                        <Card style="secundary" text="Loading data"></Card>:
                                        <div> 
                                        {success ? 
                                            <div>
                                                {/* <MyChart empty={empty} loading={loading} success={success} countryData={countryData}></MyChart> */}
                                                {/* {typeof countryData} */}
                                                {/* <Image
                                                    src={countryData.countryInfo.flag}
                                                    width={200}
                                                    height={100}
                                                    alt="picture of the country flag"
                                                /> */}
                                                <h3 className='text-center'>{countryData.country}</h3>
                                                <div className='p-3'>
                                                    <Doughnut
                                                        data={dataContry2Chart}
                                                        width={400}
                                                        height={400}
                                                    />
                                                </div>
                                                <div className='text-center'>
                                                    <div className='row'>
                                                    <div class="col">Total cases</div>
                                                        <div class="col bg-danger text-bg-danger">{countryData.cases}</div>
                                                    </div>
                                                    <div class="row">
                                                        <div class="col">Recovered</div>
                                                        <div class="col bg-success text-bg-primary">{countryData.recovered}</div>
                                                        <div class="col">Deaths</div>
                                                        <div class="col bg-secondary text-bg-secondary">{countryData.deaths}</div>
                                                    </div>
                                                </div>
                                            </div> :
                                            // <div className='card text-bg-primary mb-3'>
                                            //     <div className="card-body">
                                            //         <h5 className="card-title text-center">Error loading data</h5>
                                            //     </div>
                                            // </div>
                                            <Card style="danger" text="Error loading data"></Card>
                                        } </div>
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
