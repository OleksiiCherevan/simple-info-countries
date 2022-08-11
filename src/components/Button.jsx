import React from 'react'
import styled from 'styled-components'
import propTypes from 'prop-types';

const ButtonEl = styled.button`
    cursor: pointer;
    
    height: 30px;
    min-width: 70px;
    box-shadow: var(--shadow);
    background-color: var(--colors-el);

    border: none;
    border-radius: 3px;

    padding: 0 20px;


    color: var(--colors-ft);
    text-align: center;
`
function Button({children}) {
  return (
    <ButtonEl>
        {children}
    </ButtonEl>
  )
}

Button.propTypes = {
    children: propTypes.any
}

export default Button