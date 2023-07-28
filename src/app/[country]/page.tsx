import CountryDataObj from "@/types/country-data-obj";
import Link from "next/link";
import Image from "next/image";

interface DataOjb extends CountryDataObj {
  borders: string[],
  currencies: {
    [propname: string]: {
      name: string,
      symbol: string
    }
  },
  independent: true,
  languages: {
    [propname: string] : string
  },
  timezones: string[]
}

interface CountryNameObj {
  name: {
    common: string,
    official: string,
    nativeName: object
  }
}

async function getCountryName(cca3: string) {
  const res = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}?fields=name`)
  const data: CountryNameObj = await res.json()
  return data.name.official;
}

async function createCountryLinks(cca3s: string[]) {
  const names = cca3s.map(async cca3 => {
    const res = await fetch(`https://restcountries.com/v3.1/alpha/${cca3}?fields=name`);
    const data: CountryNameObj = await res.json();
    const name = await data.name.official;
    //const name = await getCountryName(cca3);
    return (
      <Link key={name} href={`/${name}`}>{name}</Link>
    )
  })
  return names.join(', ');
}

async function getCountryData(countryName: string) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=flags,area,borders,currencies,independent,languages,name,population,region,timezones,capital`);
  return res.json();
}

export default async function Page({ params }: { params: { country: string}}) {
  const countryData: DataOjb[] = await getCountryData(params.country);

  const {
    flags,
    name,
    capital,
    region,
    population,
    area,
    borders,
    currencies,
    independent,
    languages,
    timezones
  } = countryData[0];

  const borderCountries = borders.map(async cca3 => await getCountryName(cca3));
  const borderLinks = Promise.all(borderCountries)
    .then(arr => arr.map(name => {
      return <Link key={name} href={`/${name}`}>{name}</Link>
    }))

  const formatting = new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
  });

  return (
  <div className="max-w-screen-lg mx-auto bg-gray-900 py-20 px-16">
    <h1>{name.official}</h1>
    <div className="flex flex-row-reverse justify-between gap-6">
      <div>
        <Image
          src={flags.png}
          alt={flags.alt}
          height={500}
          width={500}
        />
      </div>
      <div>
        <p><span>Capital: </span>{capital[0]}</p>
        <p><span>Population: </span>{formatting.format(population)}</p>
        <p><span>Languages: </span>{Object.values(languages).join(', ')}</p>
        <p><span>Currencies: </span>{Object.values(currencies).map(c => c.name).join(', ')}</p>
        <p><span>Independent: </span>{independent ? "Yes" : "No"}</p>
        <p><span>Area: </span>{formatting.format(area)} km<sup>2</sup></p>
        <p><span>Region: </span>{region}</p>
        <p><span>Timezones: </span>{timezones.join(', ')}</p>
        <p className="borders"><span>Border Countries: </span>{(await borderLinks).length === 0 ? "None" : borderLinks}</p>
      </div>
    </div>
  </div>
  )
}