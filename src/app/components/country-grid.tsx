'use client'
import CountryDataObj from '@/types/country-data-obj';
import { useState } from 'react';
import useSWR from 'swr';
import CountryCard from './country-card';

const fetcher = (...args) => fetch(...args).then(res => res.json())

export default function CountryGrid() {
  const [query, setQuery] = useState('');
  const [region, setRegion] = useState('all');
  const [sort, setSort] = useState('a-z');

  const { data, error, isLoading } = useSWR(
    'https://restcountries.com/v3.1/all?fields=flags,name,region,capital,population,area',
    fetcher);
    
  if (error) return <div>Failed to load data</div>
  if (isLoading) return <div>Loading data...</div>
    
  const filteredCountries = data
    .filter((country : CountryDataObj) => country.name.official.toLowerCase().includes(query.toLowerCase()))
    .filter((country : CountryDataObj) => region === 'all' || country.region.toLowerCase() === region)
    .sort((a : CountryDataObj, b : CountryDataObj) => {
      const nameA = a.name.official.toUpperCase();
      const nameB = b.name.official.toUpperCase();
      if (sort === 'a-z') {
        if (nameA < nameB) return -1;
        else if (nameA > nameB) return 1;
        else return 0;
      }
      else if (sort === 'z-a') {
        if (nameA < nameB) return 1;
        else if (nameA > nameB) return -1;
        else return 0;
      }
      else if (sort === 'lowest-population') return a.population - b.population;
      else if (sort === 'highest-population') return b.population - a.population;
      else if (sort === 'lowest-area') return a.area - b.area;
      else if (sort === 'highest-area') return b.area - a.area;
      else return 0;
    })
  
  return (
    <div className='m-2'>
      <div className='flex gap-2 mb-6 items-center'>
       
        <input
          className='border-b-2 border-gray-400 text-lg p-1'
          name='query'
          type='text'
          placeholder='Filter countries'
          value={query}
          onChange={e => setQuery(e.target.value)}
        />

        <select name='region' onChange={e => setRegion(e.target.value)} className='text-lg p-2 rounded-md'>
          <option value='all'>All Regions</option>
          <option value='africa'>Africa</option>
          <option value='americas'>Americas</option>
          <option value='asia'>Asia</option>
          <option value='europe'>Europe</option>
          <option value='oceania'>Oceania</option>
        </select>

        <label htmlFor="sort" className='text-lg'>Sort by</label>
        <select name='sort' onChange={e => setSort(e.target.value)} className='text-lg p-2 rounded-md'>
          <option value='a-z'>Name (A-Z)</option>
          <option value='z-a'>Name (Z-A)</option>
          <option value='lowest-population'>Lowest population</option>
          <option value='highest-population'>Highest population</option>
          <option value='lowest-area'>Lowest area</option>
          <option value='highest-area'>Highest area</option>
        </select>

      </div>
      <ul className='grid grid-flow-row gap-4 grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]'>
        {filteredCountries.map((countryData : CountryDataObj) => {
          return <CountryCard
            key={countryData.name.official}
            countryData={countryData}
            />
        })}
      </ul>
    </div>
  )
}
