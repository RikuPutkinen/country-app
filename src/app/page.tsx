import CountryGrid from "./components/country-grid";

export default function Home() {
  return (
    <div className="w-screen">
      <h1 className="text-2xl m-2">Countries</h1>
      <CountryGrid />
    </div>
  )
}
