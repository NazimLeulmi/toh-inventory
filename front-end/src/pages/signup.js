import React from "react";
import DocSvg from '../assets/doctors.svg';
import LogoSvg from '../assets/logo.svg';
import {
    Container, Introduction, Doctors, Header, Paragraph,
    Form, Logo, InputContainer, Label, Input, InputIcon,
    FormHeader, FormBtn, FormBtnText, Text, FormLink
} from './signin';
import axios from 'axios';


function SignUp() {
    const [firstName, setFirstName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [passwordc, setPasswordc] = React.useState('')
    function postUserData() {
        console.log("Posting User Data");
        axios.post('http://localhost:8888/signup', {
            firstName: firstName, lastName: lastName,
            email: email, password: password, passwordc: passwordc
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
                <FormBtn onClick={() => postUserData()}><FormBtnText>SIGN UP</FormBtnText></FormBtn>
                <FormLink to="/">Already have an account ? <span>SIGN IN</span></FormLink>
            </Form>
        </Container>
    )
}

export default SignUp;



