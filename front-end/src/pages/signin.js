import React from "react";
import styled from 'styled-components';
import DocSvg from '../assets/doctors.svg';
import LogoSvg from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const Container = styled.div`
  display:flex;
  flex-direction: row;
  background-color:white;
  position: relative;
`;

export const Introduction = styled.div`
    position: fixed;
    height:100vh;
    width:50vw;
    flex:.9;
    display:flex;
    flex-direction: column;
    background-color: rgba(0,0,0,.1);
    align-items: center;
    justify-content: center;
    overflow: hidden;
`;


export const Doctors = styled.img`
    width:50%;
    margin-bottom:32px !important;
`;
export const Header = styled.h1`
    font-size: 48px;
    margin-bottom:16px !important;
    width:80%;
`;
export const Paragraph = styled.p`
    font-weight: 300;
    font-size: 28px;
    margin:0 !important;
    width:80%;
    line-height: 32px;
`;
export const Form = styled.div`
    display:flex;
    width:50%;
    position: absolute;
    right:0;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding:48px !important;
    overflow:auto;
`;

export const Logo = styled.img`
    margin-bottom:68px !important;
    width:50%;
`;

export const InputContainer = styled.div`
    position: relative;
    width:50%;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom:16px;
`;

export const Label = styled.label`
    margin-bottom:10px;
`;
export const Input = styled.input`
    padding:10px;
    width:100%;
    height:55px;
    border:1px solid rgba(0,0,0,.4);
    border-radius: 5px;
    font-size:18px;
    &:focus {
        outline:none;
        border:1px solid #0079F6 !important;
    }
`;
export const InputIcon = styled.span`
    position:absolute;
    font-size:30px;
    font-style: normal;
    font-weight: 100;
    color:rgba(0,0,0,.5);
    bottom:0;
    right:10px;
    margin-bottom:13.75px;
    margin-right:5px;
`;

export const FormHeader = styled.h2`
    font-size:28px;
    font-weight: 500;
    width:50%;
    margin-bottom:30px;
    align-self: center;
`;

export const FormBtn = styled.div`
    width:50%;
    height:55px;
    background-color: #0079F6;
    margin-top:10px;
    border-radius: 5px;
    display:flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    &:hover{
        background-color: white;
        border:2px solid #0079F6;
        h3{
            color:#0079F6;
        }
    }
`;

export const FormBtnText = styled.h3`
    font-size:24px;
    font-weight:regular;
    text-transform: uppercase;
    color:white;
    letter-spacing: 3px;
`;

export const FormLink = styled(Link)`
    font-size:18px;
    width:50%;
    text-align:center;
    margin-top:28px;
    text-decoration: none;
    span {
        font-weight: bold;
        color:#0079F6;
        letter-spacing: 2px;
        cursor: pointer;
        &:hover {
            font-size:20px;
        }
    }
`;

export const Text = "Inventory management is vital to a company's" +
    " health because it helps make sure there is rarely too much" +
    " or too little stock on hand, limiting the risk of stockouts" +
    " and inaccurate records";




function SignIn() {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    function postUserData() {
        console.log("Posting User Data");
        axios.post('http://localhost:8888/signin', {
            email: email,
            password: password
        })
            .then(function (response) {
                console.log(response);
            })
            .catch(function (error) {
                console.log(error);
            });
    }
    return (
        <Container>
            <Introduction>
                <Doctors src={DocSvg} />
                <Header>Inventory Management</Header>
                <Paragraph>{Text}</Paragraph>
            </Introduction>
            <Form>
                <Logo src={LogoSvg} />
                <FormHeader>Enter your email and password</FormHeader>
                {/* Email Input */}
                <InputContainer>
                    <Label>Email Address</Label>
                    <Input type="email"
                        name="email" value={email} required
                        onChange={e => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                    />
                    <InputIcon className="material-icons">&#xe158;</InputIcon>
                </InputContainer>
                <InputContainer>
                    <Label>Password</Label>
                    <Input type="password"
                        name="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="Enter your password"
                    />
                    <InputIcon className="material-icons">&#xe897;</InputIcon>
                </InputContainer>
                <FormBtn onClick={() => postUserData()}><FormBtnText>SIGN IN</FormBtnText></FormBtn>
                <FormLink to="/signup">Don't have an account ? <span>SIGN UP</span></FormLink>
            </Form>
        </Container>
    )
}

export default SignIn;


