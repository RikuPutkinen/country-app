'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

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

export default function ComparisonContainer({ countryDataArr }: { countryDataArr: CountryDataObj[] }) {
  const [countryName, setCountryName] = useState('');
  const countryNames = countryDataArr.map(country => country.name.official);
  const currentCountry = countryDataArr.find(country => country.name.official === countryName);
  console.log(currentCountry);

  const formatting = new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
  });

  return (
    <div className="border-gray-600 first-of-type:border-r last-of-type:border-l border-collapse mt-6">
      <div className="px-10">
        <select name='country-name' value={countryName} onChange={e => setCountryName(e.target.value)} className="max-w-full text-lg p-2 rounded-md">
          <option value=''>Select a country</option>
          {countryNames.map(name => {
            return <option key={name} value={name}>{name}</option>
          })}
        </select>
      </div>
      {currentCountry && 
        <div className="px-10 py-4">
          <Image 
            src={currentCountry.flags.png}
            alt={currentCountry.flags.alt}
            width={300}
            height={300}
            className="mb-4"
          />
          <p><span className="font-bold">Country name: </span>{currentCountry.name.official}</p>
          <p><span className="font-bold">Region: </span>{currentCountry.region}</p>
          <p><span className="font-bold">Languages: </span>{Object.values(currentCountry.languages).join(', ') || "None"}</p>
          <p><span className="font-bold">Currencies: </span>{Object.values(currentCountry.currencies).map(c => c.name).join(', ') || "None"}</p>
          <p><span className="font-bold">Independent: </span>{currentCountry.independent ? "Yes" : "No"}</p>
          <p><span className="font-bold">Population: </span>{formatting.format(currentCountry.population)}</p>
          <p><span className="font-bold">Area: </span>{formatting.format(currentCountry.area)} km<sup>2</sup></p>
        </div>}
    </div>
  )
}