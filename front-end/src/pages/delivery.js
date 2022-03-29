import React, { useEffect } from 'react';
import styled from 'styled-components';
import { Label, Input, InputContainer } from './dashboard';
import LogoSvg from '../assets/logo.svg';
import Select from 'react-select';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ProcessorsContext } from '../App';


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
  cursor: pointer;
`;

const GridContainer = styled.div`
  width:815px;
  display:grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 15px;
`;

const Processor = styled.div`
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  background-color: white;
  border:1px solid rgba(0,0,0,.1);
  border-radius: 5px;
  display:flex;
  flex-direction: column;
  padding:20px 40px;
  grid-column: 1/-1;
  border-left: 3px solid #0079f6;
`;


const Field = styled.div`
  display:flex;
  align-items: center;
`;

const FieldHeader = styled.h2`
  font-size:18px;
  padding:10px;
  width:200px;
  margin-bottom:10px;
  text-transform: uppercase;
  font-weight: bold;
`;
const FieldText = styled.p`
  font-size:18px;
  padding:10px;
  margin-bottom:10px;
  margin-left:5px;
  font-weight: 400;
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





function DeliveryForm() {
  const { processors, setProcessors } = React.useContext(ProcessorsContext);
  const [insurance, setInsurance] = React.useState("");
  const [patient, setPatient] = React.useState("");
  const [dnumber, setDnumber] = React.useState("");
  const [fileNumber, setFileNumber] = React.useState("")
  const [mrn, setMrn] = React.useState("");
  const [received, setReceived] = React.useState("");
  const [institution, setInstitution] = React.useState("");
  const [lpo, setLpo] = React.useState("");
  const [lpoDate, setLpoDate] = React.useState("");
  const [audiologist, setAudiologist] = React.useState("");
  const [date, setDate] = React.useState(getDate());
  const location = useLocation();
  const { processor } = location.state;
  const navigate = useNavigate();

  function getDate() {
    let today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1; // Months start at 0!
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;
    today = dd + '/' + mm + '/' + yyyy;
    return today;
  }


  async function deliver() {
    const delivery = {
      delivered: true, insurance: insurance ? insurance.value : "",
      patient: patient, delivery_date: date, audiologist: audiologist.value,
      received_by: received, lpo: lpo, lpo_date: lpoDate, mrn: mrn, id: processor._id,
      file_number: fileNumber, d_number: dnumber, institution: institution
    }
    const response = await axios.post("http://localhost:8888/deliver", delivery)
    const { data } = response;
    if (data.success === true && data.processor) {
      const newArray = await processors.map(e => {
        if (e._id === processor._id) e.delivery = delivery;
        return e;
      });
      setProcessors(newArray);
      window.print();
      navigate("/delivered");
    } else alert("Failed to deliver the processor , please try again");
  }


  return (
    <Container>
      <TopBar>
        <HeaderText onClick={() => deliver()}>Delivery Form</HeaderText>
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
          <Label>PATIENT NAME</Label>
          <Input type="text"
            name="patient-name"
            value={patient}
            onChange={e => setPatient(e.target.value)}
            placeholder="ENTER THE PATIENT'S NAME"
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
        <Processor key={processor._id}>
          <Field>
            <FieldHeader>Serial Number</FieldHeader>
            <FieldText>{processor.serial_number}</FieldText>
          </Field>
          <Field>
            <FieldHeader>Processor Type</FieldHeader>
            <FieldText>{processor.processor_type}</FieldText>
          </Field>
          <Field>
            <FieldHeader>Description</FieldHeader>
            <FieldText>{processor.description}</FieldText>
          </Field>
          <Field>
            <FieldHeader>Received Date</FieldHeader>
            <FieldText>{processor.received_date}</FieldText>
          </Field>
          <Field>
            <FieldHeader>Delivery Date</FieldHeader>
            <FieldText>{date}</FieldText>
          </Field>
        </Processor>
      </GridContainer>


    </Container>
  )
}


export default DeliveryForm;