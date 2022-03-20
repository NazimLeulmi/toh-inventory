import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Label, Input, InputContainer, MySelect, } from './dashboard';
import LogoSvg from '../assets/logo.svg';
import Select from 'react-select';
import { useLocation } from 'react-router-dom';


const TopBar = styled.div`
    width:100%;
    height:60px;
    min-height:60px;
    display:flex;
    align-items: center;
    margin-bottom:30px;
`;

const Logo = styled.img`
    height:40px;
    margin-left:auto;
`;

const Container = styled.div`
  display:flex;
  flex-direction: column;
  padding:30px;
`;

const HeaderText = styled.h1`
  font-size:30px;
  font-weight: 500;
  border:1px solid black;
  padding:10px;
  border-radius: 5px;
`;

const GridContainer = styled.div`
  width:50%;
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

const insuranceTypes = [
  { value: 'C1/C2', label: 'C1/C2' },
  { value: 'C3/C4', label: 'C3/C4' },
]
const audiologists = [
  { value: 'ANAS SULTAN OBEIDAT', label: 'ANAS SULTAN OBEIDAT' },
  { value: 'ABDULLAH MOHAMMED HAYAJNEH', label: 'ABDULLAH MOHAMMED HAYAJNEH' },
]


export const selectStyles = {
  control: base => ({
    ...base,
    height: 50,
    minHeight: 50,
    width: 400
  })
}

const Processor = styled.div`
  width:400px;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: white;
  border:1px solid rgba(0,0,0,.1);
  border-radius: 5px;
  display:flex;
  flex-direction: column;
  align-items: center;
  padding:20px;
  text-align: center;
`;

const ProcessorName = styled.h2`
  font-size:20px;
  margin-bottom:14px;
`;
const ProcessorSerial = styled.h3`
  font-size:20px;
  font-weight: bold;
  margin-bottom:14px;
`;
const Description = styled.p`
  font-size:18px;
  margin-bottom:14px;
`;

const Blank = styled.div`
  width:400px;
`;


function DeliveryForm() {
  const [insurance, setInsurance] = React.useState("");
  const [dnumber, setDnumber] = React.useState("");
  const [fileNumber, setFileNumber] = React.useState("")
  const [mrn, setMrn] = React.useState("");
  const [received, setReceived] = React.useState("");
  const [receivedDate, setReceivedDate] = React.useState("");
  const [institution, setInstitution] = React.useState("");
  const [lpo, setLpo] = React.useState("");
  const [lpoDate, setLpoDate] = React.useState("");
  const [audiologist, setAudiologist] = React.useState("");
  const location = useLocation();
  const { processors } = location.state;



  return (
    <Container>
      <TopBar>
        <HeaderText>Delivery Form</HeaderText>
        <Logo src={LogoSvg} />
      </TopBar>
      <GridContainer>
        <InputContainer>
          <Label>INSURANCE TYPE</Label>
          <Select
            defaultValue={insurance}
            onChange={setInsurance}
            options={insuranceTypes}
            styles={selectStyles}
          />
        </InputContainer>
        {insurance.value == "C1/C2" ?
          <InputContainer>
            <Label>D-NUMBER</Label>
            <Input type="text"
              name="dnumber"
              value={dnumber}
              onChange={e => setDnumber(e.target.value)}
              placeholder="D-YYYY-NNNN"
            />
          </InputContainer> :
          <InputContainer>
            <Label>LPO NUMBER</Label>
            <Input type="text"
              name="lpo"
              value={lpo}
              onChange={e => setLpo(e.target.value)}
              placeholder="ENTER THE LPO NUMBER"
            />
          </InputContainer>
        }
        {insurance.value === "C1/C2" ?
          <InputContainer>
            <Label>FILE NUMBER</Label>
            <Input type="number"
              name="file-number"
              value={fileNumber}
              onChange={e => setFileNumber(e.target.value)}
              placeholder="0NNNN"
            />
          </InputContainer> :
          <InputContainer>
            <Label>LPO DATE</Label>
            <Input type="text"
              name="lpo-date"
              value={lpoDate}
              onChange={e => setLpoDate(e.target.value)}
              placeholder="DD/MM/YYYY"
            />
          </InputContainer>
        }
        {insurance.value === "C3/C4" ?
          <InputContainer>
            <Label>MEDICAL RECORD NUMBER</Label>
            <Input type="text"
              name="mrn"
              value={mrn}
              onChange={e => setMrn(e.target.value)}
              placeholder="NNNNNNNNNNNN"
            />
          </InputContainer> : null
        }
        <InputContainer>
          <Label>RECEIVED BY</Label>
          <Input type="text"
            name="received-by"
            value={received}
            onChange={e => setReceived(e.target.value)}
            placeholder="EMPLOYEE NAME"
          />
        </InputContainer>
        <InputContainer>
          <Label>RECEIVED DATE</Label>
          <Input type="text"
            name="received-date"
            value={receivedDate}
            onChange={e => setReceivedDate(e.target.value)}
            placeholder="DD/MM/YYYY"
          />
        </InputContainer>
        <InputContainer>
          <Label>INSTITUTION</Label>
          <Input type="text"
            name="institution"
            value={institution}
            onChange={e => setInstitution(e.target.value)}
            placeholder="INSTITUTION NAME"
          />
        </InputContainer>
        <InputContainer>
          <Label>AUDIOLOGIST</Label>
          <Select
            defaultValue={audiologist}
            onChange={setAudiologist}
            options={audiologists}
            styles={selectStyles}
          />
        </InputContainer>
        <InputContainer>
          <Label>SIGNATURE</Label>
          <Input type="text"
            name="signature"
          />
        </InputContainer>
        {insurance.value === "C3/C4" ? <Blank /> : null}
        {processors && processors.map(processor => (
          <Processor key={processor._id}>
            <ProcessorSerial>SN:{processor.serial_number}</ProcessorSerial>
            <ProcessorName>{processor.processor_type}</ProcessorName>
            <Description>{processor.description}</Description>
          </Processor>
        ))}
      </GridContainer>

    </Container>
  )
}


export default DeliveryForm;