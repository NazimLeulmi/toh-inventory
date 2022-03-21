import React from 'react';
import styled from 'styled-components';
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
    width:70%;
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
  background-color: ${props => props.selected === true ? "rgba(0,0,0,.1)" : null};
  font-weight: ${props => props.selected === true ? "bold" : 400};
  :hover {
    background:${props => props.name === "data" ? "rgba(0,0,0,.1)" : null};
  }
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
    width:70%;
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
    margin-left:16px;

`;
const DeliverBtn = styled.div`
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
    label {
      font-size: 16px;
      background-color: #0079f6;
      color:white;
      padding:10px;
      width:30px;
      height:30px;
      margin-left:15px;
      border-radius: 5px;
      text-align: center;
      display: flex;
      align-items: center;
      justify-content: center;
    }
`;
const PrintText = styled.p`
    font-size:20px;
    letter-spacing: 2px;

`;


function Processors() {
  const { processors, setProcessors } = React.useContext(ProcessorsContext);
  const { auth, setAuth } = React.useContext(AuthContext);
  const [counter, setCounter] = React.useState(0)
  const navigate = useNavigate();
  const location = useLocation();

  async function getProcessors() {
    try {
      if (processors === null) {
        const response = await axios.get("http://localhost:8888/processors");
        const { data } = response;
        if (data.processors) setProcessors(data.processors.map(processor => ({ ...processor, selected: false })));
        else alert("Couldn't fetch the processors from the database");
      }
    } catch (error) { console.log(error) }
  }

  function handlePrint() {
    const doc = new jsPDF();
    doc.autoTable({ html: '#processors-table', theme: "grid" })
    doc.save('table.pdf');
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

  async function selectRow(processor, isSelected) {
    const newProcessors = await processors.map(element => {
      if (element._id === processor._id) {
        element.selected = isSelected === false ? true : false;
        if (isSelected) {
          element.selected = false;
          setCounter(counter - 1);
        } else {
          element.selected = true;
          setCounter(counter + 1);
        }
      }
      return element;
    })
    setProcessors(newProcessors);
  }

  async function deliver() {
    const selected = await processors.filter(processor => processor.selected === true);
    const ids = await selected.map(s => s._id);
    const response = await axios.post("http://localhost:8888/deliver", { ids });
    const { data } = response;
    if (data.success) navigate("/delivery", { state: { processors: selected } })
    else alert("Failed to deliver the sound processors");
  }

  React.useEffect(() => {
    checkAuth();
  }, [])

  React.useEffect(() => {
    getProcessors();
  }, [])

  React.useEffect(async () => {
    if (processors) {
      const newProcessors = await processors.map(element => {
        if (element.selected === true) {
          element.selected = false;
        }
        return element;
      })
      setProcessors(newProcessors);
    }
  }, [])

  return (
    <Container>
      <SideNav location={location.pathname} />
      <Content>
        <Bar />
        <Header>
          <TableTitle>Processors Table</TableTitle>
          <DeliverBtn onClick={() => deliver()}>
            <PrintText>DELIVER</PrintText>
            <label>{counter}</label>
          </DeliverBtn>
          <PrintBtn onClick={() => handlePrint()}>
            <PrintText>PRINT TABLE</PrintText>
          </PrintBtn>
        </Header>
        <Table id="processors-table" >
          <TableHead>
            <TableRow>
              <Data>TYPE</Data>
              <Data>SERIAL_NUMBER</Data>
              <Data>DESCRIPTION</Data>
              <Data>RECEIVED_FROM</Data>
              <Data>RECEIVED_DATE</Data>
              <Data>DELIVERED</Data>
            </TableRow>
          </TableHead>
          <tbody>
            {processors && processors.map(processor => (
              <TableRow key={processor._id} name="data"
                selected={processor.selected} onClick={() => selectRow(processor, processor.selected)}
              >
                <Data>{processor.processor_type}</Data>
                <Data>{processor.serial_number}</Data>
                <Data>{processor.description}</Data>
                <Data>{processor.received_from}</Data>
                <Data>{processor.received_date}</Data>
                <Data>{processor.delivery.delivered ? "YES" : "NO"}</Data>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  )
}


export default Processors;