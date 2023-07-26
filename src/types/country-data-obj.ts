export default interface CountryDataObj {
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
    capital: string[],
    region: string,
    population: number 
}