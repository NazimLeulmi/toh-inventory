import React from "react";
import styled from 'styled-components';
import DocSvg from '../assets/doctors.svg';
import LogoSvg from '../assets/logo.svg';

const Container = styled.div`
  display:flex;
  flex-direction: row;
  background-color:white;
`;

const Introduction = styled.div`
    position: relative;
    height:100vh;
    flex:.9;
    display:flex;
    flex-direction: column;
    padding:48px !important;
    background-color: rgba(0,0,0,.1);
`;

const Form = styled.div`
    flex:1;
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding:48px !important;
`;

const Doctors = styled.img`
    width:50%;
    margin-bottom:32px !important;
`;
const Header = styled.h1`
    font-size: 48px;
    margin-bottom:16px !important;
`;
const Paragraph = styled.p`
    font-weight: 300;
    font-size: 28px;
    margin:0 !important;
    width:80%;
    line-height: 32px;
`;

const Logo = styled.img`
    margin-bottom:68px !important;
    width:50%;
`;

const InputContainer = styled.div`
    position: relative;
    width:50%;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom:10px;
`;

const Input = styled.input`
    padding:10px;
    width:100%;
    height:55px;
    border:1px solid rgba(0,0,0,.4);
    border-radius: 5px;
    font-size:16px;
    &:focus {
        outline:none;
        border:1px solid #0079F6 !important;
    }
`;
const InputIcon = styled.span`
    position:absolute;
    font-size:30px;
    font-weight:300;
    bottom:0;
    right:0;
    margin-bottom:13.75px;
    margin-right:5px;
`;
const Label = styled.label`
    margin-bottom:10px;
`;


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
                <InputContainer>
                    <Label>Username</Label>
                    <Input type="text"
                        name="username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </InputContainer>
                <InputContainer>
                    <Label>Password</Label>
                    <Input type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                    <InputIcon className="material-icons">&#xE87C;</InputIcon>
                </InputContainer>
            </Form>
        </Container>
    )
}

export default SignIn;


