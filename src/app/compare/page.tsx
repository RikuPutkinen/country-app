'use client'

import useSWR from 'swr';
import ComparisonContainer from '../components/comparison-container';
import fetcher from '../lib/fetcher';

interface CountryDataObj {
  flags: {
    png: string,
    svg: string,
    alt: string
  },
  name: {
    common: string,
    official: string,
    nativeName: object
  },
  region: string,
  population: number,
  area: number,
  independent: boolean,
  languages: {
    [propname: string] : string
  },
  timezones: string[],
  currencies: {
    [propname: string]: {
      name: string,
      symbol: string
    }
  }
}

export default function Page() {
  const { data, error, isLoading} = useSWR('https://restcountries.com/v3.1/all?fields=flags,area,currencies,independent,languages,name,population,region,timezones', fetcher);

  if (error) return <div>An error occured.</div>
  if (isLoading) return <div>Loading...</div>

  data.sort((a: CountryDataObj, b: CountryDataObj) => {
    const nameA = a.name.official.toUpperCase();
    const nameB = b.name.official.toUpperCase();
    if (nameA < nameB) return -1;
    else if (nameA > nameB) return 1;
    else return 0;
  });

  return (
    <>
      <h1 className='text-2xl m-2'>Compare countries</h1>
      <div className='grid grid-cols-2'>
        <ComparisonContainer countryDataArr={data} />
        <ComparisonContainer countryDataArr={data} />
      </div>
    </>
  )
}