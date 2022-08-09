import React, {  useEffect, useState } from "react";
import { IoMoonOutline, IoMoonSharp } from "react-icons/io5";
import styled from "styled-components";

import Container from "components/Container";

const HeaderEl = styled.header`
  background-color: var(--colors-el);
  height: 50px;
  display: flex;
  align-items: center;
  box-shadow: var(--shadow);
`;

const Wrapper = styled.div`
display: flex;
justify-content: space-between;
align-items: center;
`;

const Title = styled.a.attrs({ href: "/" })`
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


const Header = () => {
    const [theme, setTheme] = useState("light");

    const onToggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };

    
    useEffect(() => {
      document.body.setAttribute("data-theme", theme)
    }, [theme])

    return (
        <HeaderEl>
            <Container>
                <Wrapper>
                  <Title>Were in the world?</Title>
                  <ModeSwitcher onClick={onToggleTheme}> {theme !== 'light' ? <IoMoonSharp/> : <IoMoonOutline/>} {theme} mode</ModeSwitcher>
                </Wrapper>
            </Container>
         </HeaderEl>
    );
};

export default Header;
