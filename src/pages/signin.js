import React from "react";
import s from 'styled-components';
import DocSvg from '../assets/doctors.svg';
import LogoSvg from '../assets/logo.svg';
import Paper from '@mui/material/Paper';
import { borderRadius, styled } from '@mui/system'

const Container = s.div`
  display:flex;
  flex-direction: row;
  background-color:white;
`;

const Introduction = s.div`
    position: relative;
    height:100vh;
    flex:.9;
    display:flex;
    flex-direction: column;
    padding:48px !important;
    background-color: rgba(0,0,0,.1);
`;

const Form = s.div`
    flex:1;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding:48px !important;
`;

const Doctors = s.img`
    width:50%;
    margin-bottom:32px !important;
`;
const Header = s.h1`
    font-size: 48px;
    margin-bottom:16px !important;
`;
const Paragraph = s.p`
    font-weight: 300;
    font-size: 28px;
    margin:0 !important;
    width:80%;
    line-height: 32px;
`;

const Logo = s.img`
    margin-bottom:68px !important;
    width:50%;
`;

const StyledPaper = styled(Paper, {})({
    backgroundColor: "papayawhip",
    borderRadius: "5px",
    width: "300px",
    height: "300px",
});



const Text = "Inventory management is vital to a company's" +
    " health because it helps make sure there is rarely too much" +
    " or too little stock on hand, limiting the risk of stockouts" +
    " and inaccurate records";


function SignIn() {
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')
    return (
        <Container>
            <Introduction>
                <Doctors src={DocSvg} />
                <Header>Inventory Management</Header>
                <Paragraph>{Text}</Paragraph>
            </Introduction>
            <Form>
                <Logo src={LogoSvg} />
                <StyledPaper />
            </Form>
        </Container>
    )
}

export default SignIn;


