import Image from 'next/image'

export async function getServerSideProps(context) {
    const res = await fetch('https://corona.lmao.ninja/v2/countries', 
        {
            method:"GET", 
            headers: {"Content-Type": "application/json"}
        }
    );

    const countriesData = await res.json();

    return {
      props: {
        countriesData,
      },
    };
}

export default function Home({countriesData}) {
    return (
        <>
            <h1>Lista de paises</h1>
            <ul>
            {countriesData.map(({ country, countryInfo }) => (
                <li key={countryInfo.iso2}>
                    {country}
                    <br />
                    {countryInfo.iso2}
                    <br />
                    <Image
                        src={countryInfo.flag}
                        width={100}
                        height={50}
                        alt="picture of the country flag"
                    />
                </li>
            ))}
            </ul>
        </>
    );
}
  