import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import axios from 'axios';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import SideNav from './sidenav';
import { FormBtn, FormBtnText } from './signin';
import TopBar from './topbar';
import { AuthContext, ProcessorsContext } from '../App';

const Container = styled.div`
    width:100vw;
    height:100vh;
    display: flex;
    flex-direction: row;
`;


const Dash = styled.div`
    display:flex;
    flex:1;
    flex-direction: column;
    margin-left:450px;
    overflow-x: hidden;
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

export const FormHeader = styled.h1`
    font-size:32px;
    margin-bottom:20px;
    text-align: center;
    margin-bottom:60px;
    margin-top:50px;
    align-self: center;
`;

const Box = styled(Link)`
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
    text-decoration: none;
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
    flex:.5;
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


export const Label = styled.label`
    font-size:16px;
    width:400px;
    margin-bottom:10px;
`;

export const MySelect = styled(Select)`
    width:400px;
`;

export const selectStyles = {
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

export const TextArea = styled.textarea`
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

export const Btn = styled(FormBtn)`
    width:400px;
    height:50px;
`;
export const Error = styled.p`
    color:red;
    font-size: 16px;
    width:400px;
    margin-top:16px;
    font-weight: 500;
`;



function Dashboard() {
  const [type, setType] = React.useState(null);
  const [from, setFrom] = React.useState(null);
  const [serial, setSerial] = React.useState('');
  const [received, setReceived] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const [stock, setStock] = React.useState(0);
  const [delivered, setDelivered] = React.useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  const { auth, setAuth } = useContext(AuthContext);
  const { processors, setProcessors } = useContext(ProcessorsContext);
  const processorOptions = [
    { value: 'Cocklear N7', label: 'Cocklear N7' },
    { value: 'Cochlear Kanso-2', label: 'Cochlear Kanso-2' },
    { value: 'Baha-6 Max Sound', label: 'Baha-6 Max Sound' },
    { value: 'Osia Implant', label: 'Osia Implant' },
    { value: 'AB Naida C1 Q90', label: 'AB Naida C1 Q90' },
  ];

  const delivery = [
    { value: 'Dubai', label: 'Dubai' },
    { value: 'Abu Dhabi', label: 'Abu Dhabi' },
  ]

  async function postProcessor() {
    try {
      const response = await axios.post("http://localhost:8888/processors", {
        processor_type: type ? type.value : "",
        received_from: from ? from.value : "",
        description: description,
        serial_number: serial,
        received_date: received
      })
      const { data } = response;
      if (data.isValid === false) setErrors(data.errors);
      else {
        await processors.push(data.processor);
        setProcessors(processors);
        navigate("/processors");
      }
    }
    catch (err) { console.log(err) }
  }


  useEffect(() => {
    async function checkAuth() {
      try {
        if (auth === null) {
          const response = await axios.get("http://localhost:8888/check-auth");
          const { data } = response;
          if (data.success === true) setAuth(data.user);
          else navigate("/");
        }
      } catch (error) { console.log(error) }
    }
    checkAuth();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  useEffect(() => {
    async function getProcessors() {
      try {
        if (processors === null) {
          console.log("Fetching Processors");
          const response = await axios.get("http://localhost:8888/processors");
          const { data } = response;
          if (data.processors) setProcessors(data.processors);
          else alert("Couldn't fetch the processors from the database");
          const filtered = await data.processors.filter(p => p.delivery.delivered === true);
          setDelivered(filtered.length);
          setStock(data.processors.length - filtered.length);
        } else {
          console.log("Processors are available");
          const filtered = await processors.filter(p => p.delivery.delivered === true);
          setDelivered(filtered.length);
          setStock(processors.length - filtered.length);
        }
      } catch (err) { console.log(err) }
    }


    getProcessors();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps



  return (
    <Container>
      <SideNav location={location.pathname} />
      <Dash>
        <TopBar />
        <FlexContainer>
          <Form>
            <FormHeader>Sound Processors</FormHeader>
            <InputContainer>
              <Label>Processor Type</Label>
              <MySelect
                defaultValue={type}
                onChange={setType}
                options={processorOptions}
                styles={selectStyles}
              />
              {errors.processor_type && <Error>{errors.processor_type}</Error>}
            </InputContainer>
            <InputContainer>
              <Label>Processor description</Label>
              <TextArea type="text"
                name="description"
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Brief description"
              />
              {errors.description && <Error>{errors.description}</Error>}
            </InputContainer>
            <InputContainer>
              <Label>Serial Number</Label>
              <Input type="number"
                name="serial"
                value={serial}
                onChange={e => setSerial(e.target.value)}
                placeholder="Enter the serial number"
              />
              {errors.serial_number && <Error>{errors.serial_number}</Error>}
            </InputContainer>
            <InputContainer>
              <Label>Received From</Label>
              <MySelect
                defaultValue={from}
                onChange={setFrom}
                options={delivery}
                styles={selectStyles}
              />
              {errors.received_from && <Error>{errors.received_from}</Error>}
            </InputContainer>
            <InputContainer>
              <Label>Received Date</Label>
              <Input type="text"
                name="recieptDate"
                value={received}
                onChange={e => setReceived(e.target.value)}
                placeholder="DD/MM/YYYY"
              />
              {errors.received_date && <Error>{errors.received_date}</Error>}
            </InputContainer>
            <Btn onClick={() => postProcessor()}>
              <FormBtnText>SAVE PROCESSOR</FormBtnText>
            </Btn>
          </Form>
          <BoxesContainer>
            <Box to="/delivered">
              <BoxIcon className="material-icons">&#xe558;</BoxIcon>
              <BoxHeader>DELIVERED</BoxHeader>
              <BoxNumber>{delivered}</BoxNumber>
            </Box>
            <Box to="/stock">
              <BoxIcon className="material-icons">&#xe179;</BoxIcon>
              <BoxHeader>STOCK</BoxHeader>
              <BoxNumber>{stock}</BoxNumber>
            </Box>
            <Box to="/processors">
              <BoxIcon className="material-icons">&#xe023;</BoxIcon>
              <BoxHeader>TOTAL</BoxHeader>
              <BoxNumber>{processors && processors.length}</BoxNumber>
            </Box>
          </BoxesContainer>
        </FlexContainer>
      </Dash>
    </Container>
  )
}

export default Dashboard;