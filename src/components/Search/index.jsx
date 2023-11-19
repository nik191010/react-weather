import React from 'react';
import debounce from 'lodash.debounce';

import { fetchPlace } from './fetchPlace';
import './Search.scss';

const Search = ({ location, getCityName, getCityCoords, searchLocation, submitLocation }) => {
  const [autocompleteCities, setAutocompleteCities] = React.useState([]);
  const [requestData, setRequestData] = React.useState([]);
  const [autocompleteErr, setAutocompleteErr] = React.useState('');

  // Gets the name of a city from a user and then suggests a list of cities with the similar name
  const handleCityChange = async (searchValue) => {
    if (!searchValue) return;

    const res = await fetchPlace(searchValue);
    !autocompleteCities.includes(searchValue) &&
      res.data.features &&
      setAutocompleteCities(res.data.features.map((place) => place.place_name));
    res.error ? setAutocompleteErr(res.error) : setAutocompleteErr('');

    setRequestData(res.data.features);
  };

  // Delays the request to a server
  const updateSearchValue = React.useCallback(
    debounce((str) => {
      handleCityChange(str);
    }, 1000),
    [],
  );

  // Loops through an object with the list of cities to get the coordinates
  const searchCityObject = (nameKey, myArray) => {
    for (let i = 0; i < myArray?.length; i++) {
      if (myArray[i].place_name === nameKey) {
        return myArray[i];
      }
    }
  };

  // Gets the value for "handleCityChange", "getCityName"(to pass the name of a city)
  // And the input value is used to get an object from the cities list to get coordinates("resultObject")
  const onChangeInput = (e) => {
    updateSearchValue(e.target.value);
    getCityName(e.target.value);

    const resultObject = searchCityObject(e.target.value, requestData);
    return resultObject !== undefined ? getCityCoords(resultObject.center) : '';
  };

  return (
    <form>
      <div className="search">
        <label htmlFor="city" className="label">
          {autocompleteErr && <span className="inputError">{autocompleteErr}</span>}{' '}
        </label>

        <input
          type="text"
          placeholder="Search Location"
          className="search__input"
          list="places"
          id="city"
          name="city"
          onChange={onChangeInput}
          onKeyDown={searchLocation}
          value={location}
          pattern={autocompleteCities.join('|')}
          autoComplete="off"
        />

        <datalist id="places">
          {autocompleteCities.map((city, i) => (
            <option key={i} value={city}>
              {city}
            </option>
          ))}
        </datalist>

        <button onClick={submitLocation} type="submit" className="search__button">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11.71 11H12.5L17.49 16L16 17.49L11 12.5V11.71L10.73 11.43C9.59 12.41 8.11 13 6.5 13C2.91 13 0 10.09 0 6.5C0 2.91 2.91 0 6.5 0C10.09 0 13 2.91 13 6.5C13 8.11 12.41 9.59 11.43 10.73L11.71 11ZM2 6.5C2 8.99 4.01 11 6.5 11C8.99 11 11 8.99 11 6.5C11 4.01 8.99 2 6.5 2C4.01 2 2 4.01 2 6.5Z"
              fill="#C4C4C4"
            />
          </svg>
        </button>
      </div>
    </form>
  );
};

export default Search;
