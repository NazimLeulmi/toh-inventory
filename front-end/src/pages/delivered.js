import React from 'react';
import styled from 'styled-components';
import Select from 'react-select';
import { useLocation, useNavigate, } from 'react-router-dom'
import SideNav from "./sidenav";
import Bar from './topbar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import axios from 'axios';
import { AuthContext, ProcessorsContext } from '../App';



const Container = styled.div`
    width:100vw;
    height:100vh;
`;

const Content = styled.div`
    height:100%;
    margin-left:450px;
    display:flex;
    flex-direction: column;
    overflow-x: hidden;
    padding-bottom:50px;
`;

const Table = styled.table`
    border-collapse: collapse;
    align-self: center;
    border:1px solid rgba(0,0,0,.1);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    width:95%;
    #row{
      background: red;
    }
    #row:before {
      content: "*";
      font-size: 30px;
    }
`;

const TableHead = styled.thead`
    background-color: #0079f6;
    color:white;
    font-weight: 500;
    text-align: center;
`;

const TableRow = styled.tr`
`;


const Data = styled.td`
    padding:15px;
    border:1px solid rgba(0,0,0,.3);
    text-align: center;
    line-height: 20px;
    cursor: pointer;
`;

const Header = styled.div`
    margin-top:50px;
    margin-bottom:30px;
    align-self:center;
    width:95%;
    display: flex;
    align-items: center;
`;
const TableTitle = styled.h1`
    font-size:28px;
`;

const PrintBtn = styled.div`
    height:50px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0,0,0,.1);
    padding:15px;
    cursor: pointer;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin-left:auto;
    margin-right:16px;
`;
const PrintText = styled.p`
    font-size:20px;
    letter-spacing: 2px;
`;

export const selectStyles = {
  control: base => ({
    ...base,
    height: 50,
    minHeight: 50,
    width: 125,
  })
}


function Delivered() {
  const { processors, setProcessors } = React.useContext(ProcessorsContext);
  const [delivered, setDelivered] = React.useState(null);
  const [insurance, setInsurance] = React.useState({ value: "C1/C2", label: "C1/C2" });
  const [filtered, setFiltered] = React.useState([]);
  const { auth, setAuth } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const insuranceTypes = [
    { value: 'C1/C2', label: 'C1/C2' },
    { value: 'C3/C4', label: 'C3/C4' },
  ]


  async function getProcessors() {
    try {
      if (processors === null) {
        const response = await axios.get("http://localhost:8888/processors");
        const { data } = response;
        if (data.processors) {
          setProcessors(data.processors);
          const filtered = await data.processors.filter(e => e.delivery.delivered === true);
          const doubleFiltered = await filtered.filter(x => x.delivery.insurance === "C1/C2");
          setDelivered(filtered);
          setFiltered(doubleFiltered);
        }
        else alert("Couldn't fetch the processors from the database");
      } else {
        console.log(processors, "processors");
        const filtered = await processors.filter(e => e.delivery.delivered === true);
        console.log(filtered, "first filter");
        const doubleFiltered = await filtered.filter(x => x.delivery.insurance === "C1/C2");
        console.log(doubleFiltered, "second filter");
        setDelivered(filtered);
        setFiltered(doubleFiltered);
      }
    } catch (error) { console.log(error) }
  }

  function handlePrint() {
    const doc = new jsPDF();
    doc.autoTable({ html: '#processors-table', theme: "grid", tableWidth: 'auto', margin: { right: 2, left: 2 } })
    doc.save('delivered.pdf');
  }

  async function checkAuth() {
    try {
      const response = await axios.get("http://localhost:8888/check-auth");
      const { data } = response;
      if (data.success === false) {
        setAuth(false); navigate("/");
      }
    } catch (error) { console.log(error) }
  }

  async function handleInsuranceChange() {
    if (insurance.value === "C1/C2") {
      const filtered = await processors.filter(x => x.delivery.insurance === "C3/C4");
      setInsurance({ value: "C3/C4", label: "C3/C4" });
      setFiltered(filtered);
    } else {
      const filtered = await processors.filter(x => x.delivery.insurance === "C1/C2");
      setInsurance({ value: "C1/C2", label: "C1/C2" });
      setFiltered(filtered);
    }
  }



  React.useEffect(() => {
    checkAuth();
  }, [])

  React.useEffect(() => {
    getProcessors();
  }, [])

  return (
    <Container>
      <SideNav location={location.pathname} />
      <Content>
        <Bar />
        <Header>
          <TableTitle>Delivered Sound Processors</TableTitle>
          <PrintBtn onClick={() => handlePrint()}>
            <PrintText>PRINT TABLE</PrintText>
          </PrintBtn>
          <Select
            defaultValue={insurance}
            onChange={handleInsuranceChange}
            options={insuranceTypes}
            styles={selectStyles}
          />
        </Header>
        <Table id="processors-table" >
          <TableHead>
            {insurance.value === "C1/C2" ?
              <TableRow>
                <Data>TYPE</Data>
                <Data>SERIAL #</Data>
                <Data>FROM</Data>
                <Data>DATE</Data>
                <Data>EMPLOYEE</Data>
                <Data>PATIENT</Data>
                <Data>INST</Data>
                <Data>FILE #</Data>
                <Data>Delivery #</Data>
              </TableRow> :
              <TableRow>
                <Data>TYPE</Data>
                <Data>SERIAL #</Data>
                <Data>FROM</Data>
                <Data>DATE</Data>
                <Data>EMPLOYEE</Data>
                <Data>PATIENT</Data>
                <Data>INST</Data>
                <Data>LPO</Data>
                <Data>LPO DATE</Data>
                <Data>MRN</Data>
              </TableRow>
            }
          </TableHead>
          <tbody>
            {filtered && filtered.map(processor => (
              <TableRow key={processor._id} name="data">
                <Data>{processor.processor_type}</Data>
                <Data>{processor.serial_number}</Data>
                <Data>{processor.received_from}</Data>
                <Data>{processor.delivery.delivery_date}</Data>
                <Data>{processor.delivery.received_by}</Data>
                <Data>{processor.delivery.patient}</Data>
                <Data>{processor.delivery.institution}</Data>
                {insurance.value === "C1/C2" ?
                  <>
                    <Data>{processor.delivery.file_number}</Data>
                    <Data>{processor.delivery.d_number}</Data>
                  </> :
                  <>
                    <Data>{processor.delivery.lpo}</Data>
                    <Data>{processor.delivery.lpo_date}</Data>
                    <Data>{processor.delivery.mrn}</Data>
                  </>
                }
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  )
}


export default Delivered;