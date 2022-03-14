import React from 'react';
import styled from 'styled-components';
import LogoSvg from '../assets/logo.svg';
import { NavLink } from 'react-router-dom';
import DocSvg from '../assets/doctors.svg';
import Select from 'react-select';
import { FormBtn, FormBtnText } from './signin';

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
    flex-direction: column;
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

const TopBar = styled.div`
    width:100%;
    height:100px;
    background-color: rgba(0,0,0,.05);
    display:flex;
    align-items: center;
`;
const Logo = styled.img`
    width:200px;
    margin-left:16px;
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
const UserIcon = styled.span`
    font-size:30px;
    font-style: normal;
    font-weight: 100;
    color:rgba(0,0,0,.5);
`;

const UserName = styled.p`
    font-size:20px;
    margin-left:auto;
    margin-right:16px;
`;

const Form = styled.div`
    display:flex;
    flex:1;
    height:100%;
    padding:40px;
    flex-direction: column;
    align-self: center;
    align-items: center;
`;

const FormHeader = styled.h1`
    font-size:32px;
    margin-bottom:20px;
    text-align: center;
    margin-bottom:60px;
    margin-top:50px;
    align-self: center;
`;

const Box = styled.div`
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    width:225px;
    height:225px;
    color:rgba(0,0,0,1);
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    margin-bottom:25px;
    cursor: pointer;
    :hover{
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
        transform: scale(1.05);
    }
`;

const BoxesContainer = styled.div`
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex:1;
`

const BoxHeader = styled.h2`
    font-size:16px;
    margin-top:10px;
    margin-bottom:10px;
`;
const BoxIcon = styled.span`
    font-size:30px;
    font-style: normal;
    font-weight: 100;
    color: #0079f6;
`;
const BoxNumber = styled.h3`
    font-size:20px;
    margin-top:10px;
    margin-bottom:10px;
`;


const Label = styled.label`
    font-size:16px;
    width:400px;
    margin-bottom:10px;
`;

const MySelect = styled(Select)`
    width:400px;
`;

const selectStyles = {
    control: base => ({
        ...base,
        height: 50,
        minHeight: 50
    })
}
export const InputContainer = styled.div`
    position: relative;
    display:flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom:16px;
`;

export const Input = styled.input`
    padding:10px;
    width:400px;
    height:50px;
    border:1px solid rgba(0,0,0,.2);
    border-radius: 5px;
    font-size:18px;
     ::placeholder,
    ::-webkit-input-placeholder {
        color:rgba(0,0,0,.4)
    }
    ::-ms-input-placeholder {
        color:rgba(0,0,0,.4)
    }
    &:focus {
        outline:none;
        border:2px solid #0079F6 !important;
    }
`;

const FlexContainer = styled.div`
    display:flex;
    flex:1;
`;

const TextArea = styled.textarea`
    padding:10px;
    width:400px;
    height:80px;
    border:1px solid rgba(0,0,0,.2);
    border-radius: 5px;
    font-size:18px;
     ::placeholder,
    ::-webkit-input-placeholder {
        color:rgba(0,0,0,.4)
    }
    ::-ms-input-placeholder {
        color:rgba(0,0,0,.4)
    }
    &:focus {
        outline:none;
        border:2px solid #0079F6 !important;
    }
`;

const Btn = styled(FormBtn)`
    width:400px;
    height:50px;
`;







function Dashboard() {
    const [type, setType] = React.useState(null);
    const [from, setFrom] = React.useState(null);
    const [serial, setSerial] = React.useState('');
    const [receipt, setReceipt] = React.useState('');
    const [description, setDescription] = React.useState('');
    const processors = [
        { value: 'Cocklear N7', label: 'Cocklear N7' },
        { value: 'Cocklear Kanso-2', label: 'Cocklear Kanso-2' },
        { value: 'Baha-6 Max', label: 'Baha-6 Max' },
        { value: 'Osia Implant', label: 'Osia Implant' },
        { value: 'AB Naida C1 Q90', label: 'AB Naida C1 Q90' },
    ];

    const delivery = [
        { value: 'Dubai', label: 'Dubai' },
        { value: 'Abu Dhabi', label: 'Abu Dhabi' },
    ]
    return (
        <Container>
            <SideBar>
                <Avatar><Doctors src={DocSvg} /></Avatar>
                <BarLink to="/processors" isActive={true}>
                    <LinkIcon className="material-icons">&#xe322;</LinkIcon>
                    SOUND PROCESSORS
                </BarLink>
                <BarLink to="/inventory">
                    <LinkIcon className="material-icons">&#xe1a1;</LinkIcon>
                    PROCESSORS STOCK
                </BarLink>
                <BarLink to="/delivered">
                    <LinkIcon className="material-icons">&#xe023;</LinkIcon>
                    HEARING AIDS
                </BarLink>
                <BarLink to="/stock">
                    <LinkIcon className="material-icons">&#xe1a1;</LinkIcon>
                    HEARING AIDS STOCK
                </BarLink>
                <BarLink to="/users">
                    <LinkIcon className="material-icons">&#xe7ef;</LinkIcon>
                    USERS
                </BarLink>
                <BarLink to="#" style={{ marginTop: "auto", marginBottom: 24 }}>
                    <LinkIcon className="material-icons">&#xe9ba;</LinkIcon>
                    SIGN OUT
                </BarLink>
            </SideBar>
            <Dash>
                <TopBar>
                    <Logo src={LogoSvg} />
                    <UserName>Rayan Leulmi</UserName>
                    <User><UserIcon className="material-icons">&#xe7fd;</UserIcon></User>
                </TopBar>
                <FlexContainer>
                    <Form>
                        <FormHeader>Sound Processors</FormHeader>
                        <InputContainer>
                            <Label>Processor Type</Label>
                            <MySelect
                                defaultValue={type}
                                onChange={setType}
                                options={processors}
                                styles={selectStyles}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label>Processor description</Label>
                            <TextArea type="text"
                                name="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                                placeholder="Brief description"
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label>Serial Number</Label>
                            <Input type="number"
                                name="serial"
                                value={serial}
                                onChange={e => setSerial(e.target.value)}
                                placeholder="Enter the serial number"
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label>Received From</Label>
                            <MySelect
                                defaultValue={from}
                                onChange={setFrom}
                                options={delivery}
                                styles={selectStyles}
                            />
                        </InputContainer>
                        <InputContainer>
                            <Label>Receipt Date</Label>
                            <Input type="text"
                                name="recieptDate"
                                value={receipt}
                                onChange={e => setReceipt(e.target.value)}
                                placeholder="DD/MM/YYYY"
                            />

                        </InputContainer>
                        <Btn>
                            <FormBtnText>SAVE PROCESSOR</FormBtnText>
                        </Btn>
                    </Form>
                    <BoxesContainer>
                        <Box>
                            <BoxIcon className="material-icons">&#xe558;</BoxIcon>
                            <BoxHeader>DELIVERED</BoxHeader>
                            <BoxNumber>16</BoxNumber>
                        </Box>
                        <Box>
                            <BoxIcon className="material-icons">&#xe179;</BoxIcon>
                            <BoxHeader>STOCK</BoxHeader>
                            <BoxNumber>4</BoxNumber>
                        </Box>
                        <Box>
                            <BoxIcon className="material-icons">&#xe023;</BoxIcon>
                            <BoxHeader>TOTAL</BoxHeader>
                            <BoxNumber>20</BoxNumber>
                        </Box>
                    </BoxesContainer>
                </FlexContainer>
            </Dash>
        </Container>
    )
}

export default Dashboard;