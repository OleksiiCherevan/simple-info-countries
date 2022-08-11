import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Container from '../components/Container';

import { IoArrowBack } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';
import {
  CardCountryEl,
  CardHeader,
  CardImage,
  CardInfo,
  CardInfoItem
} from '../components/CardCountry';
import axios from 'axios';
import { getCurrencies, getLanguages, getNativeName } from '../assets/util';

const CountryEl = styled.div`
  padding: 30px 0;
`;

const CountryWrapper = styled.div``;

const CountryButtonBack = styled.span`
  display: flex;
  justify-content: center;
  gap: 5px;
`;

function Country() {
  const params = useParams();
  const { countryName } = params;

  const [status, setStatus] = useState('');
  const [country, setCountry] = useState({});


  useEffect(() => {
    setStatus('pending');
    axios(`https://restcountries.com/v3.1/name/${countryName}`).then(
      (response) => {
        const [countyInfo] = response.data;
        setCountry(countyInfo);
        setStatus('fulfilled');
      }
    );
  }, []);

  return (
    <CountryEl>
      <Container>
        <CountryWrapper>
          <Link to={'/'}>
            <Button>
              <CountryButtonBack>
                <IoArrowBack /> Back
              </CountryButtonBack>
            </Button>
          </Link>
        
          <CardCountryEl>
            <CardImage src={country.flags?.svg} />
            <CardInfo>
              <CardHeader>{country.name?.common}</CardHeader>
              <CardInfoItem left="Native name" right={getNativeName(country)} />
              <CardInfoItem
                left="Population"
                right={country?.population?.toLocaleString('en-US')}
              />
              <CardInfoItem left="Region" right={country?.region} />
              <CardInfoItem left="Sub Region" right={country?.subregion} />
              <CardInfoItem left="Capital" right={country?.capital} />
              <CardInfoItem left="Top Level Domain" right={country.tld} />
              <CardInfoItem left="Currencies" right={getCurrencies(country)} />
              <CardInfoItem left="Languages" right={getLanguages(country)} />
            </CardInfo>
          </CardCountryEl>
        </CountryWrapper>
      </Container>
    </CountryEl>
  );
}

export default Country;
