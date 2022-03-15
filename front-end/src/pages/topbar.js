import React from 'react';
import styled from 'styled-components';
import LogoSvg from '../assets/logo.svg';




const TopBar = styled.div`
    width:100%;
    height:100px;
    min-height:100px;
    background-color: rgba(0,0,0,.05);
    display:flex;
    align-items: center;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Logo = styled.img`
    height:50px;
    margin-left:16px;
`;
const UserIcon = styled.span`
    font-size:30px;
    font-style: normal;
    font-weight: 100;
    color:rgba(0,0,0,.5);
`;

const User = styled.div`
    width:65px;
    height:65px;
    border-radius: 50%;
    background-color: rgba(0,0,0,.1);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right:16px;
`;
const UserName = styled.p`
    font-size:20px;
    margin-left:auto;
    margin-right:16px;
`;


function Bar() {
    return (
        <TopBar>
            <Logo src={LogoSvg} />
            <UserName>Rayan Leulmi</UserName>
            <User><UserIcon className="material-icons">&#xe7fd;</UserIcon></User>
        </TopBar>
    )
}

export default Bar;