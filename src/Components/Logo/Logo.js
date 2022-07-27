import React from 'react';
import logo from '../../images/logo.svg'
import styled from "styled-components";

const LogoWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const CompanyName = styled.div`
  color: #ffffff;
  font-weight: 700;
  font-size: 18px;
  line-height: 32px;
  white-space: nowrap;
`;

const TypeSystem = styled.div`
  font-weight: 300;
  font-size: 18px;
  line-height: 32px;
  color: rgba(255, 255, 255, 0.7);
  white-space: nowrap;
`;



export const Logo = () => {
    return (
        <LogoWrap>
            <img src={logo} alt="logo"/>
            <CompanyName level={4}>Top Sistem</CompanyName>
            <TypeSystem>Административная панель арендатора  ТЦ</TypeSystem>
        </LogoWrap>
    );
};

