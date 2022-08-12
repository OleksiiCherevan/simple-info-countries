import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';
import axios from 'axios';

const BorderCountriesEl = styled.div`
  /* margin: auto; */
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

const BorderCountriesItem = styled.span`
  padding: 5px 15px;
  display: inline-block;

  color: var(--colors-ft);
  background-color: var(--colors-el);
  box-shadow: var(--shadow);
`;

function BorderCountries({ borders }) {
  const [borderCountries, setBorderCountries] = useState([]);

  useEffect(() => {
    if (!borders?.length) return;

    axios(
      `https://restcountries.com/v3.1/alpha?codes=${borders.join(',')}`
    ).then((response) => setBorderCountries(response.data));
  }, []);

  return (
    <BorderCountriesEl>
      {borderCountries.map((country) => (
        <a href={`/country/${country.cioc}`} key={country.name.common}>
          <BorderCountriesItem>{country.name.common}</BorderCountriesItem>
        </a>
      ))}
    </BorderCountriesEl>
  );
}

BorderCountries.propTypes = {
  borders: propTypes.array
};
export default BorderCountries;
