import React from 'react';
import styled from 'styled-components';
import propTypes from 'prop-types';

const CardCountryEl = styled.div`
  background-color: var(--colors-el);
  border-radius: 3px;
  overflow: hidden;
  padding-bottom: 20px;
  box-shadow: var(--shadow);
`;

const CardImage = styled.img`
  width: 100%;
  box-shadow: var(--shadow);
`;

const CardInfo = styled.div`
  color: var(--colors-ft);
  padding: 0 20px 20px 30px;
`;

const CardHeader = styled.h2``;

const CardInfoKey = styled.span``;

const CardInfoValue = styled.span`
  color: var(--colors-input);
`;

function CardCountry(
  {
    flags,
    population,
    region,
    capital,
    name,
  },
) {
  return (
    <CardCountryEl>
      <CardImage src={flags.svg} />
      <CardInfo>
        <CardHeader>{name.common}</CardHeader>
        <div>
          <CardInfoKey>Population:</CardInfoKey>
          <CardInfoValue>{population}</CardInfoValue>
        </div>
        <div>
          <CardInfoKey>Region:</CardInfoKey>
          <CardInfoValue>{region}</CardInfoValue>
        </div>
        <div>
          <CardInfoKey>Capital:</CardInfoKey>
          <CardInfoValue>{capital.join(', ')}</CardInfoValue>
        </div>
      </CardInfo>
    </CardCountryEl>
  );
}

CardCountry.propTypes = {
  flags: propTypes.shape({ svg: propTypes.string }).isRequired,
  population: propTypes.number.isRequired,
  region: propTypes.string.isRequired,
  name: propTypes.shape({ common: propTypes.string }).isRequired,
  capital: propTypes.shape([propTypes.string]).isRequired,
};

export default CardCountry;
