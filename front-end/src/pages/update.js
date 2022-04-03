import React, { useEffect } from 'react';
import styled from 'styled-components';
import {
  FormHeader, InputContainer, Label,
  MySelect, selectStyles, TextArea,
  Input, Error, Btn
} from './dashboard';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { AuthContext, ProcessorsContext } from '../App';
import { FormBtnText } from './signin';
import TopBar from "./topbar";


const Form = styled.div`
    display:flex;
    flex:1;
    height:100%;
    padding:40px;
    flex-direction: column;
    align-self: center;
    align-items: center;
`;

function Update() {
  const [type, setType] = React.useState('');
  const [from, setFrom] = React.useState(null);
  const [serial, setSerial] = React.useState('');
  const [received, setReceived] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [status, setStatus] = React.useState('');
  const [errors, setErrors] = React.useState({});
  const navigate = useNavigate();
  const location = useLocation();
  const { processor } = location.state;
  const { auth, setAuth } = React.useContext(AuthContext);
  const { processors, setProcessors } = React.useContext(ProcessorsContext);

  const processorOptions = [
    { value: 'Cocklear N7', label: 'Cocklear N7' },
    { value: 'Cocklear Kanso-2', label: 'Cocklear Kanso-2' },
    { value: 'Baha-6 Max Sound', label: 'Baha-6 Max Sound' },
    { value: 'Osia Implant', label: 'Osia Implant' },
    { value: 'AB Naida C1 Q90', label: 'AB Naida C1 Q90' },
  ];

  const delivery = [
    { value: 'Dubai', label: 'Dubai' },
    { value: 'Abu Dhabi', label: 'Abu Dhabi' },
  ]

  const deliveryStatus = [
    { value: 'YES', label: 'YES' },
    { value: 'NO', label: 'NO' },
  ]


  async function updateProcessor() {
    try {
      const response = await axios.post("http://192.168.1.131:8888/update", {
        processor_type: type ? type.value : "",
        received_from: from ? from.value : "",
        description: description,
        serial_number: serial,
        received_date: received,
        delivery: status ? status.value : "",
        _id: processor._id
      })
      const { data } = response;
      if (data.isValid === false) setErrors(data.errors);
      else {
        const newProcessors = await processors.map(p => {
          if (p._id === processor._id) return data.processor
          else return p;
        })
        setProcessors(newProcessors);
        navigate("/processors");
      }
    }
    catch (err) { console.log(err) }
  }


  useEffect(() => {
    async function checkAuth() {
      try {
        if (auth === null) {
          const response = await axios.get("http://192.168.1.131:8888/check-auth");
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
          const response = await axios.get("http://192.168.1.131:8888/processors");
          const { data } = response;
          if (data.processors) setProcessors(data.processors);
          else alert("Couldn't fetch the processors from the database");
        }
      } catch (err) { console.log(err) }
    }
    getProcessors();
  }, [])// eslint-disable-line react-hooks/exhaustive-deps

  React.useEffect(() => {
    if (location.state.processor) {
      setType({ value: processor.processor_type, label: processor.processor_type })
      setDescription(processor.description);
      setSerial(processor.serial_number);
      setFrom({ value: processor.received_from, label: processor.received_from });
      setReceived(processor.received_date);
      setStatus({
        value: processor.delivery.delivered ? "YES" : "NO",
        label: processor.delivery.delivered ? "YES" : "NO"
      })
    }
    else navigate("/processors");
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <>
      <TopBar />
      <Form>
        <FormHeader>Sound Processor</FormHeader>
        <InputContainer>
          <Label>Processor Type</Label>
          <MySelect
            defaultValue={type}
            value={type}
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
            value={from}
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
        <InputContainer>
          <Label>Delivery Status</Label>
          <MySelect
            value={status}
            onChange={setStatus}
            options={deliveryStatus}
            styles={selectStyles}
          />
        </InputContainer>
        <Btn onClick={() => updateProcessor()}>
          <FormBtnText>UPDATE PROCESSOR</FormBtnText>
        </Btn>
      </Form>
    </>
  )

}

export default Update;