import React from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import DocSvg from '../assets/doctors.svg';


const SideBar = styled.div`
    width:450px;
    height:100vh;
    background-color: rgba(0,0,0,.05);
    display: flex;
    flex-direction: column;
    position: fixed;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
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
    border-radius: 2px;
    border-left:${props => props.location === props.link ? "8px solid #0079f6" : "0px"};
    :hover{
        background-color: rgba(0,0,0,.1);
    }
    span {
        color:${props => props.location === props.link ? "#0079f6" : null};
    }

`;
export const LinkIcon = styled.span`
    font-size:30px;
    font-style: normal;
    font-weight: 100;
    color:rgba(0,0,0,.5);
    margin-right:16px;
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
    align-self: center;
    margin-bottom:100px;
    margin-top:50px;
`;

const Doctors = styled.img`
    width:150px;
    height:150px;
`;



function SideNav({ location }) {
    return (
        <SideBar>
            <Avatar><Doctors src={DocSvg} /></Avatar>
            <BarLink to="/dashboard" location={location} link="/dashboard" >
                <LinkIcon className="material-icons">&#xe241;</LinkIcon>
                PROCESSORS FORM
            </BarLink>
            <BarLink to="/processors" location={location} link="/processors">
                <LinkIcon className="material-icons">&#xe322;</LinkIcon>
                PROCESSORS
            </BarLink>
            <BarLink to="/delivered" location={location} link="/hearing">
                <LinkIcon className="material-icons">&#xe023;</LinkIcon>
                HEARING AIDS
            </BarLink>
            <BarLink to="/users" location={location} link="/users">
                <LinkIcon className="material-icons">&#xe7ef;</LinkIcon>
                USERS
            </BarLink>
            <BarLink to="#" style={{ marginTop: "auto", marginBottom: 24 }}
                location={location} link=""
            >
                <LinkIcon className="material-icons">&#xe9ba;</LinkIcon>
                SIGN OUT
            </BarLink>
        </SideBar >
    )
}
export default SideNav;