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
  padding: 30px 0 ;
`;
const SearchWrapper = styled.div`
  font-size: 1.2rem;
  margin-bottom: 40px;
`;

const RegionsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 40px;
  padding: 0 20px;
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
        <SearchWrapper>
          <Search></Search>
        </SearchWrapper>

        <RegionFilter></RegionFilter>

        {status === 'fulfilled' ? (
          <RegionsList>
            {data.map((country) => (
              <Link key={country.name.common} to={`/country/${country.name.common.toLowerCase()}`}>
                <CardCountry {...country}>
                  {country.name.common}
                </CardCountry>
              </Link>
            ))}
          </RegionsList>
        ) : (
          <Preloader />
        )}
      </Container>
    </HomeEl>
  );
};

export default Home;
