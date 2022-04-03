import React from "react";
import DocSvg from '../assets/doctors.svg';
import LogoSvg from '../assets/logo.svg';
import {
  Introduction, Doctors, Header, Paragraph,
  Form, Logo, InputContainer, Label, Input, InputIcon,
  FormHeader, FormBtn, FormBtnText, Text, FormLink
} from './signin';
import axios from 'axios';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

export const Error = styled.p`
    color:red;
    font-size: 16px;
    width:50%;
    margin-bottom:16px;
    font-weight: 500;
`;


function SignUp() {
  const [firstName, setFirstName] = React.useState('');
  const [lastName, setLastName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordc, setPasswordc] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();

  async function postUserData() {
    console.log("Posting User Data");
    try {
      const response = await axios.post("http://192.168.1.131:8888/signup", {
        first_name: firstName, last_name: lastName, email: email,
        password: password, passwordc: passwordc
      })
      const { data } = response;
      if (data.isValid === false) setErrors(data.errors);
      else if (data.success === true) navigate('/');

    } catch (error) { console.log(error) }
  }

  return (
    <>
      <Introduction>
        <Doctors src={DocSvg} />
        <Header>Inventory Management</Header>
        <Paragraph>{Text}</Paragraph>
      </Introduction>
      <Form>
        <Logo src={LogoSvg} />
        <FormHeader>Create a new account</FormHeader>
        {/* First Name Input */}
        <InputContainer>
          <Label>First Name</Label>
          <Input type="text"
            name="firstName" value={firstName} required
            onChange={e => setFirstName(e.target.value)}
            placeholder="Enter your first name"
          />
          <InputIcon className="material-icons">&#xe7fd;</InputIcon>
        </InputContainer>
        {errors.first_name && <Error>{"- " + errors.first_name}</Error>}
        {/* Last Name Input */}
        <InputContainer>
          <Label>Last Name</Label>
          <Input type="text"
            name="lastName" value={lastName} required
            onChange={e => setLastName(e.target.value)}
            placeholder="Enter your last name"
          />
          <InputIcon className="material-icons">&#xe7fd;</InputIcon>
        </InputContainer>
        {errors.last_name && <Error>{"- " + errors.last_name}</Error>}
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
        {errors.email && <Error>{"- " + errors.email}</Error>}
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
        {errors.password && <Error>{"- " + errors.password}</Error>}
        <InputContainer>
          <Label>Password Confirmation</Label>
          <Input type="password"
            name="passwordc"
            value={passwordc}
            onChange={e => setPasswordc(e.target.value)}
            placeholder="Confirm your password"
          />
          <InputIcon className="material-icons">&#xe897;</InputIcon>
        </InputContainer>
        {errors.passwordc && <Error>{"- " + errors.passwordc}</Error>}
        <FormBtn onClick={() => postUserData()}><FormBtnText>SIGN UP</FormBtnText></FormBtn>
        <FormLink to="/">Already have an account ? <span>SIGN IN</span></FormLink>
      </Form>
    </>
  )
}

export default SignUp;



