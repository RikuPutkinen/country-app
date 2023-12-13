import CountryDataObj from "@/types/country-data-obj";
import Link from "next/link";
import Image from "next/image";
import NotFound from "@/app/not-found";

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

async function getCountryData(countryName: string) {
  const res = await fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true&fields=flags,area,borders,currencies,independent,languages,name,population,region,timezones,capital`);
  return res.json();
}

export default async function Page({ params }: { params: { country: string}}) {
  const countryData: DataOjb[] = await getCountryData(params.country);

  if (!countryData[0]) return <NotFound />

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
      return <Link key={name} href={`/countries/${name}`}>{name}</Link>
    }))

  const formatting = new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
  });

  return (
  <div className="max-w-screen-lg bg-gray-50 shadow-md dark:bg-gray-800 mx-auto my-10 py-10 px-4 sm:px-16">
    <h1 className="text-2xl mb-4">{name.official}</h1>
    <div className="flex flex-col sm:flex-row-reverse justify-between gap-6">
      <div>
        <Image
          src={flags.png}
          alt={flags.alt}
          height={500}
          width={500}
        />
      </div>
      <div>
        <p><span className="font-bold">Capital: </span>{capital[0] || "No capital"}</p>
        <p><span className="font-bold">Population: </span>{formatting.format(population)}</p>
        <p><span className="font-bold">Languages: </span>{Object.values(languages).join(', ') || "None"}</p>
        <p><span className="font-bold">Currencies: </span>{Object.values(currencies).map(c => c.name).join(', ') || "None"}</p>
        <p><span className="font-bold">Independent: </span>{independent ? "Yes" : "No"}</p>
        <p><span className="font-bold">Area: </span>{formatting.format(area)} km<sup>2</sup></p>
        <p><span className="font-bold">Region: </span>{region}</p>
        <div className="flex gap-1">
          <p className="font-bold">Timezones: </p>
          <p>{timezones.join(', ')}</p>
        </div>
        <p className="borders"><span className="font-bold">Border Countries: </span>{(await borderLinks).length === 0 ? "None" : borderLinks}</p>
      </div>
    </div>
  </div>
  )
}