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
  background-color: ${props => props.selected === props._id ? "rgba(0,0,0,.1)" : null};
  font-weight: ${props => props.selected === props._id ? "bold" : 400};
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
const DeliverBtn = styled.button`
    height:50px;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #0079f6;
    color:white;
    padding:15px;
    cursor: pointer;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin-left:16px;
    border:0;
`;

const UpdateBtn = styled(DeliverBtn)`
  background-color: papayawhip;
  color:black;
  margin-left:16px;
`;
const DeleteBtn = styled(DeliverBtn)`
  background-color: red;
  color:white;
  margin-left:auto;
`;

const PrintText = styled.p`
    font-size:20px;
    letter-spacing: 2px;

`;


function Processors() {
  const { processors, setProcessors } = React.useContext(ProcessorsContext);
  const [selected, setSelected] = React.useState(null);
  const { auth, setAuth } = React.useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();



  function handlePrint() {
    const doc = new jsPDF('landscape');
    doc.autoTable({ html: '#processors-table', theme: "grid", margin: 2 })
    doc.save('table.pdf');
  }



  async function selectRow(processor) {
    if (selected && processor._id === selected._id) setSelected(null);
    else setSelected(processor);
  }



  function deliver() {
    navigate("/delivery", { state: { processor: selected } })
  }
  function edit() {
    navigate("/update", { state: { processor: selected } })
  }
  async function deleteProcessor() {
    try {
      const response = await axios.post("http://192.168.1.131:8888/delete", { id: selected._id });
      const { data } = response;
      if (data.success === true) {
        const filtered = await processors.filter(p => p._id !== selected._id);
        setProcessors(filtered);
      } else alert("Failed to delete the processor")

    } catch (err) { console.log(err) }
  }



  React.useEffect(() => {
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

  React.useEffect(() => {
    async function getProcessors() {
      try {
        if (processors === null) {
          const response = await axios.get("http://192.168.1.131:8888/processors");
          const { data } = response;
          if (data.processors) setProcessors(data.processors);
        } else {
          setProcessors(processors);
        }
      } catch (error) { console.log(error) }
    }
    getProcessors();
  }, []) // eslint-disable-line react-hooks/exhaustive-deps


  return (
    <Container>
      <SideNav location={location.pathname} />
      <Content>
        <Bar />
        <Header>
          <TableTitle>Processors Table</TableTitle>
          <DeleteBtn onClick={() => deleteProcessor()} disabled={selected === null ? true : false}>
            <PrintText>DELETE</PrintText>
          </DeleteBtn>
          <UpdateBtn onClick={() => edit()} disabled={selected === null ? true : false}>
            <PrintText>EDIT</PrintText>
          </UpdateBtn>
          <DeliverBtn onClick={() => deliver()} disabled={selected === null ? true : false}>
            <PrintText>DELIVER</PrintText>
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
                onClick={() => selectRow(processor)}
                selected={selected ? selected._id : null}
                _id={processor._id}
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