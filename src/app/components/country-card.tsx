import Image from "next/image";
import Link from "next/link";
import CountryDataObj from "@/types/country-data-obj";


export default function CountryCard({ countryData } : { countryData : CountryDataObj }) {
  const {
    name,
    region,
    capital,
    population,
    flags,
    area
  } = countryData;

  const formatting = new Intl.NumberFormat("en-US", {
    style: "decimal",
    useGrouping: true,
  });

  return (
    <li className="w-fit p-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800">
      <Link href={`/${name.official}`}>
        <Image src={flags.png} alt={flags.alt} height={200} width={200}/>
        <h2 className="font-bold mt-1 w-fit">{name.official}</h2>
        <p className="w-fit"><span className="font-bold">Capital: </span>{capital}</p>
        <p className="w-fit"><span className="font-bold">Region: </span>{region}</p>
        <p className="w-fit"><span className="font-bold">Area: </span>{formatting.format(area)} km<sup>2</sup></p>
        <p className="w-fit"><span className="font-bold">Population: </span>{formatting.format(population)}</p>
      </Link>
    </li>
  )
}