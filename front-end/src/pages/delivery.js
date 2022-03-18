import React from 'react';
import styled from 'styled-components';
import { Label, Input, InputContainer, MySelect, } from './dashboard';
import LogoSvg from '../assets/logo.svg';
import Select from 'react-select';


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





export const selectStyles = {
  control: base => ({
    ...base,
    height: 50,
    minHeight: 50,
    width: 400
  })
}


function DeliveryForm() {
  const [insurance, setInsurance] = React.useState(null);
  const [dnumber, setDnumber] = React.useState("");
  const [fileNumber, setFileNumber] = React.useState(null);
  const [mrn, setMrn] = React.useState("");
  const [received, setReceived] = React.useState("");
  const [receivedDate, setReceivedDate] = React.useState("");
  const [institution, setInstitution] = React.useState("");


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
        <InputContainer>
          <Label>D-NUMBER</Label>
          <Input type="text"
            name="dnumber"
            value={dnumber}
            onChange={e => setDnumber(e.target.value)}
            placeholder="D-YYYY-NNNN"
          />
        </InputContainer>
        <InputContainer>
          <Label>FILE NUMBER</Label>
          <Input type="number"
            name="file-number"
            value={fileNumber}
            onChange={e => setFileNumber(e.target.value)}
            placeholder="0NNNN"
          />
        </InputContainer>
        <InputContainer>
          <Label>MEDICAL RECORD NUMBER</Label>
          <Input type="text"
            name="mrn"
            value={mrn}
            onChange={e => setMrn(e.target.value)}
            placeholder="NNNNNNNNNNNN"
          />
        </InputContainer>
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
          <Label>SIGNATURE</Label>
          <Input type="text"
            name="signature"
          />
        </InputContainer>
      </GridContainer>

    </Container>
  )
}


export default DeliveryForm;