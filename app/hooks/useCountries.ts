import countries from 'world-countries';

const formattedCountries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
}));

/**
 * The function returns an object with two methods to get a list of countries or a specific country by
 * its value.
 * @returns A custom hook named `useCountries` is being returned, which has two functions `getAll` and
 * `getByValue`. The `getAll` function returns an array of formatted countries, and the `getByValue`
 * function takes a string value as input and returns the first country object from the
 * `formattedCountries` array that has a `value` property matching the input value.
 */
const useCountries = () => {
    const getAll = () => formattedCountries;

    const getByValue = (value: string) => {
        return formattedCountries.find((item) => item.value === value);
    }

    return {
        getAll,
        getByValue
    }
}

export default useCountries;