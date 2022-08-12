import React, { useEffect, useState } from 'react';
import { IoMoonOutline, IoMoonSharp } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import Container from './Container';

const HeaderEl = styled.header`
  height: 50px;
  display: flex;
  align-items: center;
  background-color: var(--colors-el);
  box-shadow: var(--shadow);
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Title = styled.a`
  font-size: var(--fs-md);
  font-weight: var(--fw-bg);
`;

const ModeSwitcher = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--colors-ft);
  font-weight: var(--fw-md);
  text-transform: capitalize;
`;

const DEFAULT_THEME = 'light';

const getSavedTheme = () => {
  const savedTheme = localStorage.getItem('theme');
  return !!savedTheme ? savedTheme : DEFAULT_THEME;
};

const setSavedTheme = (theme) => {
  if (theme === 'light' || theme === 'dark') {
    localStorage.setItem('theme', theme);
  } else {
    localStorage.setItem('theme', DEFAULT_THEME);
  }
};

function Header() {
  const [theme, setTheme] = useState(getSavedTheme());

  const onToggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    setSavedTheme(theme);
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  return (
    <HeaderEl>
      <Container>
        <Wrapper>
          <Link to="/">
            <Title>Were in the world?</Title>
          </Link>

          <ModeSwitcher onClick={onToggleTheme}>
            {theme !== 'light' ? <IoMoonSharp /> : <IoMoonOutline />}
            {theme}
            mode
          </ModeSwitcher>
        </Wrapper>
      </Container>
    </HeaderEl>
  );
}

export default Header;
