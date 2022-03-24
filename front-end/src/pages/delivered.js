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
    margin-left:auto;
`;
const PrintText = styled.p`
    font-size:20px;
    letter-spacing: 2px;

`;


function Delivered() {
  const { processors, setProcessors } = React.useContext(ProcessorsContext);
  const [delivered, setDelivered] = React.useState(null);
  const { auth, setAuth } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();


  async function getProcessors() {
    try {
      if (processors === null) {
        const response = await axios.get("http://localhost:8888/processors");
        const { data } = response;
        if (data.processors) {
          setProcessors(data.processors);
          const filtered = await data.processors.filter(e => e.delivery.delivered === true);
          setDelivered(filtered);
        }
        else alert("Couldn't fetch the processors from the database");
      } else {
        const filtered = await processors.filter(e => e.delivery.delivered === true);
        setDelivered(filtered);
      }
    } catch (error) { console.log(error) }
  }

  function handlePrint() {
    const doc = new jsPDF();
    doc.autoTable({ html: '#processors-table', theme: "grid" })
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
        </Header>
        <Table id="processors-table" >
          <TableHead>
            <TableRow>
              <Data>TYPE</Data>
              <Data>SERIAL_NUMBER</Data>
              <Data>DESCRIPTION</Data>
              <Data>RECEIVED_FROM</Data>
              <Data>DELIVERY_DATE</Data>
              <Data>RECEIVED_BY</Data>
            </TableRow>
          </TableHead>
          <tbody>
            {delivered && delivered.map(processor => (
              <TableRow key={processor._id} name="data">
                <Data>{processor.processor_type}</Data>
                <Data>{processor.serial_number}</Data>
                <Data>{processor.description}</Data>
                <Data>{processor.received_from}</Data>
                <Data>{processor.delivery.delivery_date}</Data>
                <Data>{processor.delivery.received_by}</Data>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Content>
    </Container>
  )
}


export default Delivered;