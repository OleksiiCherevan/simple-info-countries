import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { IoSearchSharp } from 'react-icons/io5';
import { useDispatch } from 'react-redux/es/hooks/useDispatch';
import { setName } from '../store/countriesSlice';

const SearchEl = styled.span`
  height: 40px;
  display: flex;
  align-items: center;
  color: var(--colors-input);

  border-radius: 3px;
  background: var(--colors-el);
  box-shadow: var(--shadow);

  padding-left: 30px;
`;

const Input = styled.input.attrs({ type: 'input' })`
  flex: 1;
  height: 100%;
  border: none;
  background: var(--colors-el);
  margin-left: 25px;
  color: var(--colors-input);

  &::placeholder {
    color: var(--colors-input);
  }`;

function Search() {
  const dispatcher = useDispatch();
  const [text, setText] = useState('');

  const handleTextChange = (e) => {
    const { value } = e.target;

    setText(value);
  };

  useEffect(() => {
    dispatcher(setName({ name: text }));
  }, [text]);

  return (
    <SearchEl>
      <IoSearchSharp />

      <Input
        placeholder="Search for a country..."
        onChange={handleTextChange}
      />
    </SearchEl>
  );
}

export default Search;
