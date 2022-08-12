import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Button from '../components/Button';
import Container from '../components/Container';

import { IoArrowBack } from 'react-icons/io5';
import { Link, useParams } from 'react-router-dom';

import { CardHeader, CardInfoItem } from '../components/CardCountry';

import axios from 'axios';

import {
  getTld,
  getLanguages,
  getNativeName,
  getCurrencies
} from '../assets/util';

import BorderCountries from '../components/BorderCountries';
import Preloader from '../components/Preloader';

const CountryDetailEl = styled.div`
  padding: 30px 0;
  color: var(--colors-ft);
  padding-bottom: 30px;
`;

const CountryDetailWrapper = styled.div`
  margin: 0 auto;
  margin-top: 30px;

  display: flex;
  flex-direction: column;

  justify-content: space-around;

  @media screen and (min-width: 480px) {
    align-items: center;
    gap: 12%;
  }

  @media screen and (min-width: 768px) {
    flex-direction: row;
    gap: 6%;
  }
`;

const CountryInfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 30px;
  margin-bottom: 30px;

  @media screen and (min-width: 480px) {
    flex-direction: row;
  }
`;

const CountryInfoWrapperInner = styled.div`
  display: flex;
  flex-direction: column;
  
  align-items: flex-start;
`;

const CountrySubHeader = styled.h3`
  margin: 0;
`;

const CountryButtonBack = styled.span`
  display: flex;
  justify-content: center;
  gap: 5px;
`;

const CountryDetailImageWrapper = styled.div`
  max-width: 400px;

  @media screen and (min-width: 960px) {
    max-width: 500px;
  }
`;

const CountryDetailImage = styled.img`
  height: 100%;
  width: 100%;

  object-fit: cover;
`;

function CountryDetail() {
  const params = useParams();
  const { code } = params;

  const [status, setStatus] = useState('');
  const [country, setCountry] = useState({});

  useEffect(() => {
    setStatus('pending');

    axios(
      `https://restcountries.com/v3.1/alpha/${code}?fields=name,capital,flags,population,region,subregion,tld,currencies,languages,borders`
    ).then((response) => {
      const countyInfo = response.data;

      setCountry(countyInfo);
      setStatus('fulfilled');
    });
  }, []);

  if (status === 'pending') {
    return <Preloader></Preloader>;
  }

  return (
    <CountryDetailEl>
      <Container>
        <Link to={'/'}>
          <Button>
            <CountryButtonBack>
              <IoArrowBack /> Back
            </CountryButtonBack>
          </Button>
        </Link>

        <CountryDetailWrapper>
          <CountryDetailImageWrapper>
            <CountryDetailImage src={country.flags?.svg}></CountryDetailImage>
          </CountryDetailImageWrapper>

          <div>
            <CardHeader>{country.name?.common}</CardHeader>
            <CountryInfoWrapper>
              <CountryInfoWrapperInner>
                <CardInfoItem
                  left="Native name"
                  right={getNativeName(country)}
                />
                <CardInfoItem
                  left="Population"
                  right={country?.population?.toLocaleString('en-US')}
                />
                <CardInfoItem left="Region" right={country?.region} />
                <CardInfoItem left="Sub Region" right={country?.subregion} />
                <CardInfoItem left="Capital" right={country?.capital} />
              </CountryInfoWrapperInner>

              <CountryInfoWrapperInner>
                <CardInfoItem left="Top Level Domain" right={getTld(country)} />
                <CardInfoItem
                  left="Currencies"
                  right={getCurrencies(country)}
                />
                <CardInfoItem left="Languages" right={getLanguages(country)} />
              </CountryInfoWrapperInner>
            </CountryInfoWrapper>

            <CountryInfoWrapper>
              <CountryInfoWrapperInner>
                <CountrySubHeader>Border Countries:</CountrySubHeader>
              </CountryInfoWrapperInner>

              <CountryInfoWrapperInner>
                {country.borders?.length ? (
                  <BorderCountries borders={country.borders}></BorderCountries>
                ) : (
                  <p>This country has no border country.</p>
                )}
              </CountryInfoWrapperInner>
            </CountryInfoWrapper>
          </div>
        </CountryDetailWrapper>
      </Container>
    </CountryDetailEl>
  );
}

export default CountryDetail;
