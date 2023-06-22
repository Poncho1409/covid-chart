import { useState } from 'react';

export default function Table({splitCountriesData, onClickFunction = () => {}}){

    const [page, setPage] = useState(0);
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
    return(
        <div className="container-md mx-auto p-5">            
            <ul className='list-group'>
            {splitCountriesData[page].map(({ country, iso3 }) => (
                <li className='list-group-item d-flex justify-content-between align-items-start' key={iso3}>
                    <div className=''>
                        {country}
                    </div>
                    <div className=''>
                        <button className='btn btn-primary' onClick={() => onClickFunction(iso3)} >Ver datos</button>
                    </div>
                </li>
            ))}
            </ul>
            <div className='p-2 text-center'>
                <button className="btn btn btn-light" onClick={decremetPage} >&lt;</button>
                <button className="btn btn btn-light">{page}</button>
                <button className="btn btn btn-light" onClick={incrementPage} >&gt;</button>
            </div>
        </div>
    );
}