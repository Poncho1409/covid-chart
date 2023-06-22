import Image from 'next/image'
import { useState } from 'react';

export async function getServerSideProps(context) {
    // const res = await fetch('https://corona.lmao.ninja/v2/countries', 
    //     {
    //         method:"GET", 
    //         headers: {"Content-Type": "application/json"}
    //     }
    // );

    // const countriesData = await res.json();

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

    const decremetPage = () => {
        if (page > 0) {
            setPage(page - 1)
        }
    }
    
    const incrementPage = () => {
        if (page < splitCountriesData.length - 1) {
            setPage(page + 1)
        }
    }

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
        }catch{
            setLoading(false);
            setError(true);
        }finally{
            setLoading(false);
            setSucces(true);
        }
        
    };

    return (
        <>
            <h1>Lista de paises</h1>
            <div>{page}</div>
            <button onClick={decremetPage} >&lt;</button>
            <button onClick={incrementPage} >&gt;</button>
            
            <ul>
            {splitCountriesData[page].map(({ country, iso3 }) => (
                <li key={iso3}>
                    {country}
                    <br />
                    <button onClick={() => callAPI(iso3)} >Ver datos</button>
                </li>
            ))}
            </ul>

            {empty ? 
                <div>Selecciona un pais</div> :
                <div>
                    {loading ? 
                        <div>Cargando datos ...</div> :
                        <div> 
                        {success ? 
                            <div>
                                <p>Casos: {countryData.cases}</p>
                                <p>Muertes: {countryData.deaths}</p>
                                <p>Recuperados: {countryData.recovered}</p>
                            </div> :
                            <div>
                                Error al cargar los datos
                            </div>
                        } </div>
                    }
                </div>
            }
            
        </>
    );
}
  