import React from 'react';
import styled from 'styled-components';


const Navbar= styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: #00fff3;
    color: #ff3b00;
`;

const Nav = () => {
  return (
    <Navbar>
      <h1>React Album</h1>
    </Navbar>
  )
}

export default Nav
