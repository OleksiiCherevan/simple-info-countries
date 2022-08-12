import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux/es/exports';
import styled from 'styled-components';

import { fetchCountries } from '../store/countriesSlice';

import Container from '../components/Container';
import Search from '../components/Search';
import RegionFilter from '../components/Filter';
import CardCountry from '../components/CardCountry';
import Preloader from '../components/Preloader';
import { Link } from 'react-router-dom';

const HomeEl = styled.div`
  background-color: var(--colors-bg);
  min-height: 100vh;
  padding: 30px 0;
`;

const SubHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 30px;

  @media screen and (min-width: 768px) {
    flex-direction: row;

    align-items: center;
    justify-content: space-between;
  }
`;

const SearchWrapper = styled.span`
  display: inline-block;
  font-size: 1.2rem;
`;

const CountriesList = styled.div`
  display: grid;

  grid-template-columns: repeat(1, 1fr);
  justify-content: space-between;
  align-items: stretch;
  gap: 3rem;
  margin-top: 40px;
  padding: 0 20px;

  @media screen and (min-width: 540px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media screen and (min-width: 1024px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const Home = () => {
  const dispatcher = useDispatch();
  const { availableCountries: data, status } = useSelector(
    (state) => state.countries
  );

  useEffect(() => {
    dispatcher(fetchCountries());
  }, []);

  return (
    <HomeEl>
      <Container>
        <SubHeader>
          <SearchWrapper>
            <Search></Search>
          </SearchWrapper>
          <RegionFilter></RegionFilter>
        </SubHeader>

        {status === 'fulfilled' ? (
          <CountriesList>
            {data.map((country) => (
              <Link key={country.name.common} to={`/country/${country.cioc}`}>
                <CardCountry {...country}>{country.name.common}</CardCountry>
              </Link>
            ))}
          </CountriesList>
        ) : (
          <Preloader />
        )}
        
      </Container>
    </HomeEl>
  );
};

export default Home;
