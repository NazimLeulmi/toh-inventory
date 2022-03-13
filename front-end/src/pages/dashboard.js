import React from 'react';
import styled from 'styled-components';
import LogoSvg from '../assets/logo.svg';
import { NavLink } from 'react-router-dom';
import DocSvg from '../assets/doctors.svg';

const Container = styled.div`
    width:100vw;
    height:100vh;
    display: flex;
    flex-direction: row;
`;

const SideBar = styled.div`
    width:450px;
    height:100vh;
    background-color: rgba(0,0,0,.05);
    display: flex;
    flex-direction: column;
`;

const Logo = styled.img`
    width:300px;
    margin-top:45px;
    margin-bottom:120px;
    align-self: center;
`;

const BarLink = styled(NavLink)`
    text-decoration: none;
    height: 55px;
    width:100%;
    padding:20px;
    display:flex;
    align-items: center;
    font-size: 20px;
    color:black;
    letter-spacing: 2px;
    background-color:${props => props.isActive ? "rgba(0,0,0,.1)" : null};
    :hover{
        background-color: rgba(0,0,0,.1);
    }
    span {
        color:${props => props.isActive ? "#0079F6" : null}
    }

`;
export const LinkIcon = styled.span`
    font-size:30px;
    font-style: normal;
    font-weight: 100;
    color:rgba(0,0,0,.5);
    margin-right:16px;

`;
const Dash = styled.div`
    display:flex;
    flex:1;
    padding:30px;
`;
const Avatar = styled.div`
    width:200px;
    height:200px;
    border-radius: 50%;
    background-color: rgba(0,0,0,.1);
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
`;

const Doctors = styled.img`
    width:150px;
    height:150px;
`;

const Username = styled.p`
    font-size:24px;
`;



function Dashboard() {
    return (
        <Container>
            <SideBar>
                <Logo src={LogoSvg} />
                <BarLink to="/dashboard" isActive={true}>
                    <LinkIcon className="material-icons">&#xe871;</LinkIcon>
                    DASHBOARD
                </BarLink>
                <BarLink to="/inventory">
                    <LinkIcon className="material-icons">&#xe1a1;</LinkIcon>
                    INVENTORY
                </BarLink>
                <BarLink to="/delivered">
                    <LinkIcon className="material-icons">&#xe871;</LinkIcon>
                    DELIVERED
                </BarLink>
                <BarLink to="/stock">
                    <LinkIcon className="material-icons">&#xeaf6;</LinkIcon>
                    BALANCE
                </BarLink>
                <BarLink to="/stock" style={{ marginTop: "auto", marginBottom: 24 }}>
                    <LinkIcon className="material-icons">&#xe9ba;</LinkIcon>
                    SIGN OUT
                </BarLink>
            </SideBar>
            <Dash>
                <Avatar><Doctors src={DocSvg} /></Avatar>
            </Dash>
        </Container>
    )
}

export default Dashboard;