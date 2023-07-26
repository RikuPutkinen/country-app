'use client'
import CountryDataObj from '@/types/country-data-obj';
import { useState } from 'react';
import useSWR from 'swr';
import CountryCard from './country-card';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function CountryGrid() {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('all');
  const { data, error, isLoading } = useSWR(
    'https://restcountries.com/v3.1/all?fields=flags,name,region,capital,population',
    fetcher);
    
  if (error) return <div>Failed to load data</div>
  if (isLoading) return <div>Loading data...</div>
    
  const filteredCountries = data
    .filter((country : CountryDataObj) => country.name.official.toLowerCase().includes(query.toLowerCase()))
    .filter((country : CountryDataObj) => {
      console.log(region)
      return region === 'all' || country.region.toLowerCase() === region})
  
  return (
    <>
      <div>
        <input
        name='query'
        type='text'
        placeholder='Search'
        value={query}
        onChange={e => setQuery(e.target.value)}
        />
      <select name='region' onChange={e => setRegion(e.target.value)}>
        <option value='all'>All Regions</option>
        <option value='africa'>Africa</option>
        <option value='americas'>Americas</option>
        <option value='asia'>Asia</option>
        <option value='europe'>Europe</option>
        <option value='oceania'>Oceania</option>
      </select>
      </div>
      <ul className='grid grid-flow-row grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]'>
        {filteredCountries.map((countryData : CountryDataObj) => {
          return <CountryCard
            key={countryData.name.official}
            countryData={countryData}
            />
        })}
      </ul>
    </>
  )
}
