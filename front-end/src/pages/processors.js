import React from 'react';
import styled from 'styled-components';
import { useLocation, } from 'react-router-dom'
import SideNav from "./sidenav";
import Bar from './topbar';
import jsPDF from 'jspdf';
import 'jspdf-autotable';



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
`;

const Header = styled.div`
    margin-top:50px;
    margin-bottom:30px;
    align-self:center;
    width:70%;
    display: flex;
    justify-content: space-between;
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
`;
const PrintText = styled.p`
    font-size:20px;
    letter-spacing: 2px;
`;



function Processors() {
    const location = useLocation();
    function handlePrint() {
        const doc = new jsPDF();
        doc.autoTable({ html: '#processors-table', theme: "grid" })
        doc.save('table.pdf');
    }
    return (
        <Container>
            <SideNav location={location.pathname} />
            <Content>
                <Bar />
                <Header>
                    <TableTitle>Processors Table</TableTitle>
                    <PrintBtn onClick={() => handlePrint()}>
                        <PrintText>PRINT TABLE</PrintText>
                    </PrintBtn>
                </Header>
                <Table id="processors-table" >
                    <TableHead>
                        <TableRow>
                            <Data>TYPE</Data>
                            <Data>SERIAL_NUMBER</Data>
                            <Data>RECEIPT_FROM</Data>
                            <Data>RECEIPT_DATE</Data>
                            <Data>DELIVERED</Data>
                        </TableRow>
                    </TableHead>
                    <tbody>
                        <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>
                        <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>
                        <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>
                        <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>                       <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>                       <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>             <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>                       <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>                       <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>                       <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>                       <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>                       <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>                       <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>                       <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>                     <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>                       <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>
                        <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>
                        <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>
                        <TableRow>
                            <Data>KANZO-2</Data>
                            <Data>23456788</Data>
                            <Data>DUBAI</Data>
                            <Data>23/07/2021</Data>
                            <Data>FALSE</Data>
                        </TableRow>
                    </tbody>
                </Table>
            </Content>
        </Container>
    )
}


export default Processors;